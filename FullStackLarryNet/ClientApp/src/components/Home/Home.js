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
            Adaptable Full Stack Developer with 15+ years of driving technical
            projects from front-end to back-end by leveraging expertise in .NET
            applications, SQL Server, and JavaScript. Ensure success of
            business-critical projects by designing effective website
            architecture to align final applications with key design elements
            that drive end user engagement and conversion.
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
