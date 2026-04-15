function TotalBetSection({
  totalBet,
  totalBetRef,
  onTotalBetChange,
  optimalTotalWin,
  coveredParlays,
  parlayCount,
}) {
  return (
    <div className="total-bet">
      <label htmlFor="totalBet">Total Bet</label>
      <input
        className="po-input"
        id="totalBet"
        ref={totalBetRef}
        type="text"
        name="totalBet"
        value={totalBet}
        onChange={onTotalBetChange}
      />
      <label>Optimal Total Win: {optimalTotalWin || "0.0000"}</label>
      <label>
        Covered Parlays: {coveredParlays} / {parlayCount}
      </label>
    </div>
  );
}

export default TotalBetSection;
