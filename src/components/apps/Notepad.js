import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { fetchBlogContent } from '../../helpers/fetchBlogContent';
import './Notepad.css';
import { fetchLatestBlogFilename } from '../../helpers/fetchBlogContent';

const Blog = ({ blogKey='latest' }) => {
    const [blogContent, setBlogContent] = useState('');

    useEffect(() => {
        const loadBlogContent = async () => {
            if (blogKey === 'latest') {
                const latestBlogKey = await fetchLatestBlogFilename();
                const content = await fetchBlogContent(latestBlogKey);
                console.log('DAVID CONTENT LATEST' + content);
                setBlogContent(content)
            } else {
                const content = await fetchBlogContent(blogKey);
                setBlogContent(content);
                console.log('DAVID CONTENT ' + content);
            }
        }

        loadBlogContent();
    }, [blogKey]);

    return (
        <div className="blog-body">
            <ReactMarkdown>{blogContent}</ReactMarkdown>
        </div>
    );
};

export default Blog;