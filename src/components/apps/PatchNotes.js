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
            const data = await response.json();
            setReleases(data);
            setSelectedRelease(data[0].version);
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

    return (
        <div className="patch-notes">
            <div className="releases-window">
                <h2>Releases</h2>
                <ul title="Releases" className="releases-list">
                    {releases.map((release) => (
                        <li key={release.version} className="release-name" onClick={() => setSelectedRelease(release.version)}>
                            {release.version}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="release-info-window">
                <ReactMarkdown>{releaseContent}</ReactMarkdown>
            </div>
        </div>
    )
};

export default PatchNotes;