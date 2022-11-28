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
            <a href="#experience">Experience</a>
          </li>
          <li>
            <a href="#education">Education</a>
          </li>
          <li>
            <a href="#skills">Skills</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </div>
      <div id="about" className="home-section">
        <h2>About</h2>
        <div className="home-section-border">
          <p>
            I am a full stack developer with over 25 years experience. I
            primarily worked on client/server .NET Windows Forms applications
            with SQL Server as the backend database at the start of my career. I
            then transitioned to ASP.NET Web Forms, MVC and Web API
            applications. I am now focusing more on Javascript frameworks (e.g.
            React, Node, etc.) and NoSQL databases (e.g. MongoDB).
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
      <div id="experience" className="home-section">
        <h2>Experience</h2>
        <div className="home-section-border">
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
    </div>
  );
}

export default Home;
