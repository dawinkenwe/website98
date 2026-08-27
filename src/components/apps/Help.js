import React, { useState } from 'react'
import { getProgramIcon } from '../../helpers/programMap';
import './Help.css';
import DOMPurify from 'dompurify';
import Back from "../../img/back.png";
import Hide from "../../img/hide.png";
import Forward from "../../img/forward.png";
import Options from "../../img/options.png";
import WebHelp from "../../img/web help.png";
import HelpBookClosed from "../../img/help book closed.png";
import HelpBookOpen from "../../img/help book opened.png";
import HelpBookPage from "../../img/help book page.png";
import {Resume, AboutMe, WhatFor, WhatDo, Why} from '../../content/help/Common'


function MenuNode({ node, contentFunction }) {
    const [open, setOpen] = useState(node.defaultOpen ?? false);

    if (node.type === "file") {
        return (
            <li onClick={(e) => {contentFunction(node.contents)}}>
                <img src={HelpBookPage} alt="help" className="help-img" />
                <span className="">{node.label}</span>
            </li>
        )
    }

    return (
        <li>
            <div onClick={(e) => {
            setOpen(prev => !prev);}}>
                <img src={open ? HelpBookOpen : HelpBookClosed } alt="help book" />
                <span>{node.label}</span>
            </div>
            {open && (
                <ul className="help-questions-list">
                    {node.children.map(child => (
                        <MenuNode node={child} key={child.id} contentFunction={contentFunction}/>
                    ))}
                </ul>
            )}
        </li>
    )
}

const Help = () => {
    const [mainContent, setMainContent] = useState(AboutMe);
    const [openFolders, setOpenFolders] = useState(["Welcome to Help", "Personal Information"])
    const [selectedTab, setSelectedTab] = useState("Contents")

    const contentMenu = [
        {
            type: "folder",
            id: "welcome to help",
            label: "Welcome To Help",
            defaultOpen: true,
            children: [
                {
                    type: "folder",
                    id: "pinfo",
                    label: "Personal Information",
                    defaultOpen: true,
                    children: [
                        {
                            type: "file",
                            id: "about",
                            label: "About",
                            contents: AboutMe
                        },
                        {
                            type: "file",
                            id: "resume",
                            label: "Resume",
                            contents: Resume
                        }
                    ]
                },
                {
                    type: "folder",
                    id: "website stuff",
                    label: "Website Questions",
                    children: [
                        {
                            type: "file",
                            id: "why98",
                            label: "Why Windows98?",
                            contents: Why
                        },
                        {
                            type: "file",
                            id: "whatdo",
                            label: "What Can I Do Here?",
                            contents: WhatDo
                        },
                        {
                            type: "file",
                            id: "whatfor",
                            label: "Why Make All This?",
                            contents: WhatFor
                        },
                    ]
                }
            ]
        }
    ]

    const handleMenuClick = (type, id, content) => {
        if (type === "folder") {
            setOpenFolders([...openFolders, id]);
        } else if (type === "file") {
            setMainContent(content);
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
                        <div className="help-questions">
                        {contentMenu.map(node => <MenuNode node={node} key={node.id} contentFunction={setMainContent}/>)}
                        </div>
                    </div>
                </aside>
                <section className="help-content">
                    {mainContent}
                </section>
            </div>
        </div>
    );
};

export default Help;