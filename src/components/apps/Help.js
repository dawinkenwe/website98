import React, { useState } from 'react'
import { getProgramIcon } from '../../helpers/programMap';
import helpData from '../../data/HelpData';
import './Help.css';
import DOMPurify from 'dompurify';

const Help = () => {
    const [selectedTab, setSelectedTab] = useState("Contents");
    const img = getProgramIcon('help');

    const handleQuestionClick = (question) => {
        setSelectedTab(question);
    };

    const createMarkup = (text) => {
        const textBR = text.replace(/\n/g, '<br>');
        return { __html: DOMPurify.sanitize(textBR) };
    }

    const getTabContents = (title) => {
        if (title === "Help") {
            return(
                <>
                    <h2>About Me</h2>
                    <p>My name is David Winkenwerder. I am a software engineer and nerd based in Sunnyvale, California. I have over 8 years of experience in professional software development. I enjoy learning new languages and have worked in C, Python, Ruby, and Javascript. I have dabbled in Golang, Java, Lua, and even a little Scala in college.</p><p>When I am not working, I am usually playing games, reading, or spending time with my cats. I especially enjoy social games that can bring friends together, such as Hues and Clues, Codenams, and Crokinole. Or any of the wonderful new friend slop games of the week such as Meccha Chameleon or Super Battle Golf.</p>
                </>
            )
        }
    }

    return (
        <>
        <div>
            <menu role="tablist">
                <li role="tab" aria-selected={selectedTab === "Contents"} onClick={() => setSelectedTab("Contents")}><a href="#tabs">Contents</a></li>
                <li role="tab" aria-selected={selectedTab === "Index"} onClick={() => setSelectedTab("Index")}><a href="#tabs">Index</a></li>
                <li role="tab" aria-selected={selectedTab === "Search"} onClick={() => setSelectedTab("Search")}><a href="#tabs">Search</a></li>
            </menu>
            <div class="window" role="tabpanel" style={{resize: 'none'}}>
                <div class="window-body">
                    <p>the tab content</p>
                </div>
            </div>
        </div>
        <div>
            <p>hello</p>
            <p>world</p>
        </div>
    </>
    );
};

export default Help;