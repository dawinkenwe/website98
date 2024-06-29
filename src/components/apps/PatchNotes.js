import React, { useState } from 'react';
import patchNotesData from '../../data/PatchNotesData';
import './PatchNotes.css';

const PatchNotes = () => {
    const [selectedRelease, setSelectedRelease] = useState(Object.keys(patchNotesData)[0]);

    return (
        <div className="patch-notes">
            <div className="releases-window">
                <h2>Releases</h2>
                <ul title="Releases" className="releases-list">
                    {Object.keys(patchNotesData).map((key) => (
                        <li key={key} className="release-name" onClick={() => setSelectedRelease(key)}>
                            {key}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="release-info-window">
                <h2>{patchNotesData[selectedRelease].header}</h2>
                <p>{patchNotesData[selectedRelease].description}</p>
                <ul>
                    {patchNotesData[selectedRelease].featureList.map((element, index) => (
                        <li>{element}</li>
                    ))};
                </ul>
            </div>
        </div>
    )
};

export default PatchNotes;