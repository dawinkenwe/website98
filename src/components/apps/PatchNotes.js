import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { fetchReleaseContent } from '../../helpers/manifestHelpers';
import './PatchNotes.css';


const PatchNotes = () => {
    const [releases, setReleases] = useState([]);
    const [selectedRelease, setSelectedRelease] = useState('');
    const [releaseContent, setReleaseContent] = useState('');

    useEffect(() => {
        const fetchReleases = async () => {
            const response = await fetch(`${process.env.PUBLIC_URL}/releaseManifest.json`);
            console.log('FETCH RELEASES');
            console.log(response.json);
            const data = await response.json();
            setReleases(data);
            setSelectedRelease(data[0]);
        };

        fetchReleases();
    }, []);


    useEffect(() => {
        const loadReleaseNotes = async () => {
            const content = await fetchReleaseContent(selectedRelease);
            setReleaseContent(content);
        }

        loadReleaseNotes();
    }, [selectedRelease]);

    // TODO: fix this map to use dict.
    return (
        <div className="patch-notes">
            <div className="releases-window">
                <h2>Releases</h2>
                <ul title="Releases" className="releases-list">
                    {Object.keys(releases).map((key) => (
                        <li key={key} className="release-name" onClick={() => setSelectedRelease(key)}>
                            {key}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="release-info-window">
                <ReactMarkdown>{releaseContent}</ReactMarkdown>
                <h2>{patchNotesData[selectedRelease].header}</h2>
                <p>{patchNotesData[selectedRelease].description}</p>
                <ul>
                    {patchNotesData[selectedRelease].featureList.map((element, index) => (
                        <li>{element}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
};

export default PatchNotes;