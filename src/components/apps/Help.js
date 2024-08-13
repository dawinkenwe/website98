import React, { useState } from 'react'
import { getProgramIcon } from '../../helpers/programMap';
import helpData from '../../data/HelpData';
import './Help.css';
import DOMPurify from 'dompurify';

const Help = () => {
    const [selectedQuestion, setSelectedQuestion] = useState(Object.keys(helpData)[0]);
    const img = getProgramIcon('help');

    const handleQuestionClick = (question) => {
        setSelectedQuestion(question);
    };

    const createMarkup = (text) => {
        const textBR = text.replace(/\n/g, '<br>');
        return { __html: DOMPurify.sanitize(textBR) };
    }

    return (
        <div id="help">
            <div className="top-bar">
                <div>Location</div>
                <input type="text" id="long" className="inverse-windows-box-shadow" value="General Help" readOnly=''></input>
            </div>
            <div className="help-contents">
                <div className="tab-box">
                    <div className="tab-header">Help</div>
                    <ul className="help-questions">
                        {Object.keys(helpData).map((question) => (
                            <li key={question} onClick={() => handleQuestionClick(question)} className={`${question === selectedQuestion ? 'selected-question' : ''}` }>
                                <img src={img} alt="help" className="help-img"/>
                                {question}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="answers">
                    {selectedQuestion &&
                        (<div className="content" dangerouslySetInnerHTML={createMarkup(helpData[selectedQuestion])} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Help;