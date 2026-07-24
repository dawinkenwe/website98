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
        }
    }

    const getTabContents = (title) => {
        console.log(title)
        if (title === "Contents") {
            return(
                <menu className="help-questions">
                    <li className={`${false ? 'selected-question' : 'unselected-question'}`} onClick={() => {setSelectedHelp("Welcome")}}><img src={getProgramIcon('help')} alt="help" className="help-img" />Welcome</li>
                    <li><img src={getProgramIcon('help')} alt="help" className="help-img" />Resume</li>
                    <li><img src={getProgramIcon('help')} alt="help" className="help-img" />What is this for?</li>
                    <li><img src={getProgramIcon('help')} alt="help" className="help-img" />What can I do here?</li>
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