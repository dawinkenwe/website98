import React, { useState } from 'react'
import { getProgramIcon } from '../../helpers/programMap';
import './Help.css';
import DOMPurify from 'dompurify';
import Back from "../../img/back.png";
import Hide from "../../img/hide.png";
import Forward from "../../img/forward.png";
import Options from "../../img/options.png";
import WebHelp from "../../img/web help.png";


const Help = () => {
    const [selectedTab, setSelectedTab] = useState("Contents");
    const [selectedHelp, setSelectedHelp] = useState("Welcome")
    const img = getProgramIcon('help');
    const contentsMenu = {"Welcome to Help": "Welcome", "": {}}

    const handleQuestionClick = (question) => {
        setSelectedTab(question);
    };

    const createMarkup = (text) => {
        const textBR = text.replace(/\n/g, '<br>');
        return { __html: DOMPurify.sanitize(textBR) };
    }

    const getWindowContents = (title) => {
        if (title === "Welcome") {
            return(
                <>
                    <h2>About Me</h2>
                    <p>My name is David Winkenwerder. I am a software engineer and nerd based in Sunnyvale, California. I have over 8 years of experience in professional software development. I enjoy learning new languages and have worked in C, Python, Ruby, and Javascript. I have dabbled in Golang, Java, Lua, and even a little Scala in college.</p><p>When I am not working, I am usually playing games, reading, or spending time with my cats. I especially enjoy social games that can bring friends together, such as Hues and Clues, Codenams, and Crokinole. Or any of the wonderful new friend slop games of the week such as Meccha Chameleon or Super Battle Golf.</p>
                </>
            )
        } else if (title === "Resume") {
            return(
                <>
                    <h2>Resume</h2>
                    <h3>Skills and Technologies</h3>
                    <p>Python, React, Typescript, Javascript, C, Linux, Bash, Ruby on Rails, GraphQL, SQL, MySQL, PostgreSQL, Flask, MongoDB, HTML, CSS, Git, distributed systems, microservices, RESTful APIs</p>
                    <h3>Experience</h3>
                    <h4>Software Engineer L4</h4>
                    <h5>HackerOne</h5>
                    <h5>Aug 2024 - Feb 2026</h5>
                    <ul>
                        <li>Optimized GraphQL resolvers to reduce query time by 50% and fix request timeouts</li>
                        <li>Developed an agent using Claude Code and bash to automate common developer tasks like flaky test detection, pipeline failure debugging, and gitlab issue updating</li>
                        <li>Served as project lead and organized and coordinated efforts on a project involving a team of 7 engineers</li>
                        <li>Led incident response as the on call engineer. Debugged system performance, communicated across teams, and restored functionality during critical outages</li>
                        <li>Won the peer nominated Engineering Product and Design award for project leadership</li>
                        <li>Worked directly with customers and the sales team to discover gaps in system reporting and proposed solutions for those use cases</li>
                        <li>Developed dashboards in Ruby on Rails and GraphQL to address user feedback and visualize the value our services provided for both customers and the sales team</li>
                        <li>Updated API documentation with clear examples for common customer issues, allowing enterprise customers to build their own integrations</li>
                        <li>Verified and resolved security vulnerabilities reported against the platform</li>
                    </ul>
                    <h4>Software Engineer L4</h4>
                    <h5>Affirm</h5>
                    <h5>Feb 2022 - July 2023</h5>
                    <ul>
                        <li>Wrote and maintained API endpoints built with python and flask that saw 50,000 + requests per day</li>
                        <li>Led live debug sessions for our team during incidents as part of an on-call rotation</li>
                        <li>Created alerting for critical endpoints to enable early detection of issues in production and improve system uptime</li>
                        <li>Ran end to end tests prior to product launch in order to ensure product readiness</li>
                        <li>Reviewed other developers code, offering quality suggestions where applicable</li>
                        <li>Wrote unit tests for all code submitted so that test coverage remained above 95% and breaking changes were identified before they hit production</li>
                    </ul>
                    <h4>Senior Staff Software Engineer</h4>
                    <h5>Palo Alto Networks</h5>
                    <h5>Jan 2016 - April 2021</h5>
                    <ul>
                        <li>Owned, designed, implemented, maintained, and extended a feature which monitored firewall performance metrics from a centralized device manager</li>
                        <li>Extended and maintained a bootstrapping feature that allowed for rapid device deployment</li>
                        <li>Optimized code to reduce runtime, memory usage, and database storage in order to scale up deployments by 500%</li>
                        <li>Optimized database storage to reduce disk usage by 40%</li>
                        <li>Onboarded and mentored new hires and interns</li>
                        <li>Tested solutions at scale by writing custom scripts to simulate data and traffic for 5000 firewalls</li>
                        <li>Resolved over 500 Jira tickets for bugs that were internally and externally reported</li>
                        <li>Worked closely with QA teams in order to proactively identify and resolve issues in my product features during feature development</li>
                    </ul>
                    <h4>Education</h4>
                    <p>UC Santa Barbara - BS in Computer Science</p>
                </>
            )
        } else if (title === "WhatFor") {
            return (
                <>
                    <h2>What is this for?</h2>
                    <p>Fun!</p>
                    <p>And learning of course. And a fun way to display relevant information for recruiters and potential companies.</p>
                    <p>But mostly fun.</p>
                </>
            )
        } else if (title === "WhatDo") {
            return (
                <>
                    <h2>What can I do here?</h2>
                    <p>On this website you can find my contact information. You can play Minesweeper. You can read through my personal blogs using the Documents application. The Notepad application will take you to the most recent blog I have written. You can rickroll yourself with the video player application. You can resize, maximize, minimize, open and close applications to your hearts content!</p>
                    <p>To be a little selfish though, this website isn't really for you. It's for me. It's my personal website and I made it. To see if I could. And to amuse myself. Which I have. I hope that you find some enjoyment in this website. A mild "huh. That's neat" is more than enough for me to feel like it was all worth it.</p>
                </>
            )
        } else if (title === "Why"){
            return(
                <>
                    <h2>Why Windows98?</h2>
                    <p>I wanted to create a website that reminded me of some of my earliest memories with computers.I have very fond memories of playing Oregon Trail and Mathblaster in the computer lab at my elementary school. And of drawing in MS paint when I was spending time with my Grandfather at his office.</p>
                    <p>I was also heavily inspired by <a href = 'https://dev.to/smpnjn/using-only-css-to-recreate-windows-98-47b1' target='_blank' >this article</a > which made a windows98 like interface with pure CSS, and wanted to use <a href = 'https://jdan.github.io/98.css/' target='_blank'> this project</a > which provides a css library for windows98 like styling.</p>
                </>
            )
        }
    }

    const getTabContents = (title) => {
        if (title === "Contents") {
            return(
                <menu className="help-questions">
                    <li onClick={() => {setSelectedHelp("Welcome")}}><img src={getProgramIcon('help')} alt="help" className="help-img" /><span className={`${selectedHelp === "Welcome" ? 'selected-help-question' : ''}`}>Welcome</span></li>
                    <li onClick={() => {setSelectedHelp("Resume")}}><img src={getProgramIcon('help')} alt="help" className="help-img" /><span className={`${selectedHelp === "Resume" ? 'selected-help-question' : ''}`}>Resume</span></li>
                    <li onClick={() => {setSelectedHelp("WhatFor")}}><img src={getProgramIcon('help')} alt="help" className="help-img" /><span className={`${selectedHelp === "WhatFor" ? 'selected-help-question' : ''}`}>What is this for?</span></li>
                    <li onClick={() => {setSelectedHelp("WhatDo")}}><img src={getProgramIcon('help')} alt="help" className="help-img" /><span className={`${selectedHelp === "WhatDo" ? 'selected-help-question' : ''}`}>What can I do here?</span></li>
                    <li onClick={() => {setSelectedHelp("Why")}}><img src={getProgramIcon('help')} alt="help" className="help-img" /><span className={`${selectedHelp === "Why" ? 'selected-help-question' : ''}`}>Why Windows98?</span></li>
                </menu>
            )
        }
    }

    return (
        <div className="help-window">
            <div className="help-menu-buttons">
                <img src={Hide} alt="Hide" className="hide-button"/>
                <img src={Back} alt="Back" />
                <img src={Forward} alt="Forward" />
                <img src={Options} alt="Options" />
                <img src={WebHelp} alt="Web Help" />
            </div>
            <div className="help-bottom-half">
                <aside className="help-navigation">
                    <div role="tablist" aria-label="Help Menu">
                        <menu role="tablist" className="tab-header" style={{fontSize: '11px'}}>
                            <li role="tab" aria-selected={selectedTab === "Contents"} onClick={() => setSelectedTab("Contents")}><a href="#tabs">Contents</a></li>
                            <li role="tab" aria-selected={selectedTab === "Index"} onClick={() => setSelectedTab("Index")}><a href="#tabs">Index</a></li>
                            <li role="tab" aria-selected={selectedTab === "Search"} onClick={() => setSelectedTab("Search")}><a href="#tabs">Search</a></li>
                        </menu>
                        {getTabContents(selectedTab)}
                    </div>
                </aside>
                <section className="help-content">
                    {getWindowContents(selectedHelp)}
                </section>
            </div>
        </div>
    );
};

export default Help;