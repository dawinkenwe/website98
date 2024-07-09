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
                setBlogContent(content)
            } else {
                const content = await fetchBlogContent(blogKey);
                setBlogContent(content);
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