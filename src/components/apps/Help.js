import React, { useState } from 'react'
import { getProgramIcon } from '../../helpers/programMap';
import helpData from '../../data/HelpData';
import './Help.css';
import DOMPurify from 'dompurify';

const Help = () => {
    const [selectedTab, setSelectedTab] = useState("Contents");
    const [selectedHelp, setSelectedHelp] = useState("Welcome")
    const img = getProgramIcon('help');

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
                    <p></p>
                    <h3>Experience</h3>
                    <p></p>
                    <h3>Education</h3>
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
        console.log(title)
        if (title === "Contents") {
            return(
                <menu className="help-questions">
                    <li className={`${selectedHelp === "Welcome" ? 'selected-question' : 'unselected-question'}`} onClick={() => {setSelectedHelp("Welcome")}}><img src={getProgramIcon('help')} alt="help" className="help-img" />Welcome</li>
                    <li className={`${selectedHelp === "Resume" ? 'selected-question' : 'unselected-question'}`} onClick={() => {setSelectedHelp("Resume")}}><img src={getProgramIcon('help')} alt="help" className="help-img" />Resume</li>
                    <li className={`${selectedHelp === "WhatFor" ? 'selected-question' : 'unselected-question'}`} onClick={() => {setSelectedHelp("WhatFor")}}><img src={getProgramIcon('help')} alt="help" className="help-img" />What is this for?</li>
                    <li className={`${selectedHelp === "WhatDo" ? 'selected-question' : 'unselected-question'}`} onClick={() => {setSelectedHelp("WhatDo")}}><img src={getProgramIcon('help')} alt="help" className="help-img" />What can I do here?</li>
                    <li className={`${selectedHelp === "Why" ? 'selected-question' : 'unselected-question'}`} onClick={() => {setSelectedHelp("Why")}}><img src={getProgramIcon('help')} alt="help" className="help-img" />Why Windows98?</li>
                </menu>
            )
        }
    }

    return (
        <>
        <div className="help-contents">
            <div className="tab-box">
                <menu role="tablist" className="tab-header">
                    <li role="tab" aria-selected={selectedTab === "Contents"} onClick={() => setSelectedTab("Contents")}><a href="#tabs">Contents</a></li>
                    <li role="tab" aria-selected={selectedTab === "Index"} onClick={() => setSelectedTab("Index")}><a href="#tabs">Index</a></li>
                    <li role="tab" aria-selected={selectedTab === "Search"} onClick={() => setSelectedTab("Search")}><a href="#tabs">Search</a></li>
                </menu>
                {getTabContents(selectedTab)}
            </div>
        </div>
        <div className="answers">
            <div className="content">
                {getWindowContents(selectedHelp)}
            </div>
        </div>
    </>
    );
};

export default Help;