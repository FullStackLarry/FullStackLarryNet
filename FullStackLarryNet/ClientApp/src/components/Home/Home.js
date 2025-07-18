import React from "react";

import "./Home.css";

function Home() {
  return (
    <div className="home">
      <div className="home-hovermenu">
        <ul>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
          <li>
            <a href="#experience">Experience</a>
          </li>
          <li>
            <a href="#skills">Skills</a>
          </li>
          <li>
            <a href="#certifications">Certifications</a>
          </li>
          <li>
            <a href="#education">Education</a>
          </li>
        </ul>
      </div>
      <div id="about" className="home-section">
        <h2>About Larry Byrd</h2>
        <div className="home-section-border">
          <p>
            Experienced and adaptable full stack developer adept at developing
            and maintaining .NET client/server applications with SQL Server.
            Have recently been learning more about JavaScript frameworks and
            NoSQL databases. In addition to development, interested in
            Cybersecurity and have a CompTIA Security+ certification. Excited to
            learn new technologies and expand existing knowledge.
          </p>
          <br />
          <p>
            This website is written in React. The APPS menu at the top contains
            a simple task manager application that utilizes a NodeJS Express
            REST API hosted on Heroku and a MongoDB database. The GAMES menu
            contains a few games that you may enjoy playing. The GIT repository
            for this website and the API can be found at&nbsp;
            <a
              href="https://github.com/FullStackLarry"
              rel="noreferrer"
              target="_blank"
            >
              https://github.com/FullStackLarry
            </a>
          </p>
        </div>
      </div>
      <div id="contact" className="home-section">
        <h2>Contact</h2>
        <div className="home-section-border">
          <p>
            E-Mail&nbsp;
            <a href="mailto:Larry@FullStackLarry.com">
              Larry@FullStackLarry.com
            </a>
          </p>
        </div>
      </div>
      <div id="experience" className="home-section">
        <h2>Experience</h2>
        <div className="home-section-border">
          <span className="resume-company">Henry Company Homes</span>
          <br />
          <span className="resume-title">
            Web/Software Development Consultant
          </span>
          <br />
          <span className="resume-dates">October 2023 to Present</span>
          <ul className="resume-list">
            <li>Convert VB.Net websites to C#.</li>
            <li>Convert classic ASP websites to ASP.NET.</li>
            <li>Convert VB6 Windows applications to C#.</li>
          </ul>
          <span className="resume-company">
            Santa Rosa County School District
          </span>
          <br />
          <span className="resume-title">Senior Programmer Analyst</span>
          <br />
          <span className="resume-dates">May 2006 to June 2019</span>
          <ul className="resume-list">
            <li>
              Developed and maintained WinForms client server applications using
              Visual Studio, C#, VB.NET and various 3rd party controls.
            </li>
            <li>
              Developed and maintained websites using ASP.NET, MVC, jQuery and
              Bootstrap.
            </li>
            <li>
              Developed the grade book application used by all teachers to
              perform a wide variety of school related activities (e.g., daily
              grades, absences, discipline, test scores, fees).
            </li>
            <li>
              Developed the district application used by district and school
              administrators for analyzing truancy, test scores, developing
              intervention plans, printing report cards, scheduling students,
              and many other tasks.
            </li>
            <li>
              Developed the student/parent web portal for viewing grades,
              assignments, graduation information, and registering for classes
              for the next school year.
            </li>
            <li>
              Utilized OAuth2 for 3rd party authorization from ClassLink.com.
            </li>
            <li>
              Programmed SQL Server by creating tables, stored procedures,
              functions and scheduled jobs.
            </li>
            <li>
              Administered SQL Server by creating maintenance plans, backup jobs
              and performing optimization.
            </li>
            <li>
              Developed routines to synchronize DB2 tables to SQL Server
              database for efficient querying.
            </li>
            <li>Used .NET and PowerShell for manipulating Active Directory.</li>
            <li>
              Developed and maintained IBM mainframe applications using JCL and
              COBOL.
            </li>
            <li>
              Developed and maintained stored procedures and accessed data for
              DB2 database system.
            </li>
          </ul>
          <span className="resume-company">Henry Company Homes</span>
          <br />
          <span className="resume-title">Programmer Analyst</span>
          <br />
          <span className="resume-dates">August 2004 to May 2006</span>
          <ul className="resume-list">
            <li>
              Developed and maintained Windows Applications using VB6 and SQL
              Server.
            </li>
            <li>Developed and maintained websites using ASP.NET Web Forms.</li>
            <li>Developed and maintained websites using classic ASP.</li>
            <li>Assisted in troubleshooting network and hardware issues.</li>
          </ul>
          <span className="resume-company">Best Software</span>
          <br />
          <span className="resume-title">Software Engineer</span>
          <br />
          <span className="resume-dates">October 2000 to July 2004</span>
          <ul className="resume-list">
            <li>
              Utilized VB6 and Microsoft Access to develop and maintain
              accounting software used by CPA firms.
            </li>
          </ul>
          <span className="resume-company">Med3000</span>
          <br />
          <span className="resume-title">Software Engineer</span>
          <br />
          <span className="resume-dates">June 1998 to October 2000</span>
          <ul className="resume-list">
            <li>
              Developed and maintained custom in-house applications using VB6,
              VBA for Excel, and DBase.
            </li>
            <li>
              Retrieved data from Informix database running on IBM AIX operating
              system.
            </li>
          </ul>
          <span className="resume-company">CPASoftware</span>
          <br />
          <span className="resume-title">Programmer/Analyst</span>
          <br />
          <span className="resume-dates">June 1996 to June 1998</span>
          <ul className="resume-list">
            <li>
              Developed and maintained DOS/SCO Unix state tax applications using
              custom in-house programming language.
            </li>
          </ul>
        </div>
      </div>
      <div id="skills" className="home-section">
        <h2>Skills</h2>
        <div className="home-section-border home-skills">
          <div>
            <img src={require("./images/html-logo.png")} alt="html logo" />
          </div>
          <div>
            <img src={require("./images/css-logo.png")} alt="css logo" />
          </div>
          <div>
            <img src={require("./images/js-logo.png")} alt="javascript logo" />
          </div>
          <div>
            <img src={require("./images/react-logo.png")} alt="react logo" />
          </div>
          <div>
            <img src={require("./images/node-logo.png")} alt="node logo" />
          </div>
          <div>
            <img src={require("./images/net-logo.png")} alt="dot net logo" />
          </div>
          <div>
            <img
              src={require("./images/vs-logo.png")}
              alt="visual studio logo"
            />
          </div>
          <div>
            <img src={require("./images/git-logo.png")} alt="git logo" />
          </div>
          <div>
            <img
              src={require("./images/tfs-logo.png")}
              alt="team foundation server logo"
            />
          </div>
          <div>
            <img
              src={require("./images/sqlserver-logo.png")}
              alt="sql server logo"
            />
          </div>
          <div>
            <img
              src={require("./images/mongodb-logo.png")}
              alt="mongo db logo"
            />
          </div>
          <div>
            <img src={require("./images/db2.png")} alt="ibm db2 logo" />
          </div>
          <div>
            <img src={require("./images/cobol.png")} alt="cobol logo" />
          </div>
        </div>
      </div>
      <div id="certifications" className="home-section">
        <h2>Certifications</h2>
        <div className="home-section-border home-certifications">
          <div>
            <img
              src={require("./images/comptia-security-ce-certification.png")}
              alt="CompTIA Security+ Certification logo"
            />
          </div>
          <div>
            <a
              href="http://verify.CompTIA.org"
              rel="noreferrer"
              target="_blank"
            >
              Verify CompTIA Certificate
            </a>
            <p>Code: TL91C4ETE2EEQWS7</p>
          </div>
        </div>
      </div>
      <div id="education" className="home-section">
        <h2>Education</h2>
        <div className="home-section-border">
          <span className="education-school">University of West Florida</span>
          <br />
          <span className="education-detail">Pensacola, FL</span>
          <br />
          <span className="education-detail">1993 - 1996</span>
          <br />
          <span className="education-detail">
            B.S. Degree in Computer Information Systems
          </span>
          <br />
          <span className="education-detail">Minor in Business</span>
          <br />
          <br />
          <span className="education-school">Gulf Coast Community College</span>
          <br />
          <span className="education-detail">Panama City, FL</span>
          <br />
          <span className="education-detail">1990 - 1993</span>
          <br />
          <span className="education-detail">
            A.A. Degree in Computer Science
          </span>
          <br />
        </div>
      </div>
    </div>
  );
}

export default Home;
