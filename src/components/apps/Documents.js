import React, { useEffect, useState } from 'react';
import { getProgramIcon, getProgramInfo } from '../../helpers/programMap';
import Blog from './Notepad';
import { useAppContext } from '../../AppContext';
import './Documents.css';
import DoubleTap from '../DoubleTap';

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const { state, dispatch } = useAppContext();

    useEffect(() => {
        const fetchBlogs = async () => {
            const response = await fetch(`${process.env.PUBLIC_URL}/blogManifest.json`);
            const data = await response.json();
            setBlogs(data);
        };

        fetchBlogs();
    }, []);

    const openDocument = ({ documentId }) => {
        dispatch({ type: 'START_APP', payload: getProgramInfo('notepad') } );
    }

    return (
        <div className="documents">
            {blogs.map(blog => (
                <DoubleTap onDoubleTap={() => openDocument(blog.filename)}>
                    <div className="file">
                        <div className="icon" onDoubleClick={() => openDocument(blog.filename)}>
                            <img src={getProgramIcon('notepadDocument')} alt={blog.filename} />
                        </div>
                        <div className="text">{blog.filename}</div>
                        </div>
                </DoubleTap>
            ))}
        </div>
    )
};

export default BlogList;