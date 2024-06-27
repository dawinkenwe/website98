import React, { useState } from 'react';
import { getProgramIcon } from '../../helpers/programMap';

const Help = () => {
    const currentTabe = useState('whatIs');
    const img = getProgramIcon('help');

    return (
        <>
            <div className="top-bar">
                <div id="help-line"></div>
                <div>Location</div>
                <input type="text" className="inverse-windows-box-shadow" value="General Help"></input>
            </div>
            <div className="help-contents">
                <div class="help-tab-box">
                </div>
                <div class="tab-box">
                    <div class="tab-header">Winkenwerder98</div>
                    <ul class="help-questions">
                        <li>
                            <img src={img} alt="help" />
                            " What is this website?"
                        </li>
                        <li>
                            <img src={img} alt="help" />
                            " What is it for?"
                        </li>
                        <li>
                            <img src={img} alt="help" />
                            " What is this website?"
                        </li>
                    </ul>
                </div>
                <div class="content"></div>
            </div>
        </>
    );
};

export default Help;