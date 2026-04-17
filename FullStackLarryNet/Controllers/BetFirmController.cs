using System.Net;
using HtmlAgilityPack;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using System.Net;

namespace FullStackLarryNet.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BetFirmController : ControllerBase
    {
        private readonly ILogger<BetFirmController> _logger;
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IMemoryCache _cache;

        private const string SiteUrl = "https://www.betfirm.com/free-sports-picks/";
        private const string BetFirmClientName = "BetFirmScraper";
        private const string CacheKey = "BetFirmData";

        public BetFirmController(ILogger<BetFirmController> logger, IHttpClientFactory httpClientFactory, IMemoryCache cache)
        {
            _logger = logger;
            _httpClientFactory = httpClientFactory;
            _cache = cache;
        }

        [HttpGet]
        public async Task<string> Get(CancellationToken cancellationToken)
        {
            if (_cache.TryGetValue(CacheKey, out string? cachedData) && cachedData != null)
            {
                _logger.LogInformation("Returning cached BetFirm data");
                return cachedData;
            }

            try
            {
                _logger.LogInformation("Starting BetFirm scrape...");
                var client = _httpClientFactory.CreateClient(BetFirmClientName);

                using var request = new HttpRequestMessage(HttpMethod.Get, SiteUrl);
                request.Headers.TryAddWithoutValidation("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8");
                request.Headers.TryAddWithoutValidation("Accept-Language", "en-US,en;q=0.5");
                request.Headers.TryAddWithoutValidation("Accept-Encoding", "gzip, deflate, br");
                request.Headers.TryAddWithoutValidation("Connection", "keep-alive");
                request.Headers.TryAddWithoutValidation("Upgrade-Insecure-Requests", "1");
                request.Headers.TryAddWithoutValidation("Referer", "https://www.google.com/");

                _logger.LogInformation("Sending request to {Url}", SiteUrl);
                using var response = await client.SendAsync(request, cancellationToken);
                response.EnsureSuccessStatusCode();

                string html = await response.Content.ReadAsStringAsync(cancellationToken);
                _logger.LogInformation("Successfully fetched BetFirm HTML");

                var document = new HtmlDocument();
                document.LoadHtml(html);

                var picks = document.DocumentNode.SelectNodes(
                    "//table[contains(concat(' ', normalize-space(@class), ' '), ' free-pick-leaderboards-table ')]");

                if (picks == null || picks.Count == 0)
                    throw new InvalidOperationException("No table with class 'free-pick-leaderboards-table' was found.");

                var body = picks[0].SelectSingleNode(".//tbody");
                if (body == null)
                    throw new InvalidOperationException("The first matching table does not contain a <tbody> element.");

                var rows = body.SelectNodes(".//tr");

                var lines = new List<string>();

                foreach (var row in rows ?? Enumerable.Empty<HtmlNode>())
                {
                    var cols = row.SelectNodes("./td");
                    if (cols != null && cols.Count > 2)
                    {
                        string league = WebUtility.HtmlDecode(cols[1].InnerText).Trim();
                        string pick = WebUtility.HtmlDecode(cols[2].InnerText).Trim();
                        lines.Add($"{league},{pick}");
                    }
                }

                lines.Sort(StringComparer.Ordinal);

                using var ms = new MemoryStream();
                using var file = new StreamWriter(ms);
                file.WriteLine("League,Pick");
                foreach (var line in lines)
                {
                    file.WriteLine(line);
                }

                file.Flush();
                ms.Position = 0;

                using var reader = new StreamReader(ms);
                var result = await reader.ReadToEndAsync(cancellationToken);
                _logger.LogInformation("Successfully generated CSV with {Length} characters", result.Length);

                _cache.Set(CacheKey, result, TimeSpan.FromMinutes(15));
                _logger.LogInformation("Cached BetFirm data for 15 minutes");

                return result;
            }
            catch (TaskCanceledException ex)
            {
                _logger.LogWarning(ex, "Timeout while fetching upstream BetFirm data.");
                return "Timeout while fetching upstream BetFirm data.";
            }
            catch (HttpRequestException ex)
            {
                _logger.LogError(ex, "HTTP error while fetching BetFirm data. InnerException: {Inner}", ex.InnerException?.Message);
                return $"Error: Unable to connect to betfirm.com. The site may be blocking automated requests or experiencing downtime.\n\nTechnical details: {ex.Message}";
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to fetch BetFirm data.");
                return ex.ToString();
            }
        }

        [HttpGet("test")]
        public async Task<IActionResult> TestConnection(CancellationToken cancellationToken)
        {
            try
            {
                var client = _httpClientFactory.CreateClient(BetFirmClientName);
                using var request = new HttpRequestMessage(HttpMethod.Head, SiteUrl);

                var sw = System.Diagnostics.Stopwatch.StartNew();
                using var response = await client.SendAsync(request, cancellationToken);
                sw.Stop();

                return Ok(new
                {
                    Success = true,
                    StatusCode = (int)response.StatusCode,
                    ResponseTime = $"{sw.ElapsedMilliseconds}ms",
                    Headers = response.Headers.Select(h => new { h.Key, Value = string.Join(", ", h.Value) })
                });
            }
            catch (Exception ex)
            {
                return Ok(new
                {
                    Success = false,
                    Error = ex.Message,
                    InnerError = ex.InnerException?.Message,
                    Type = ex.GetType().Name
                });
            }
        }
    }
}