import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { fetchBlogContent } from '../../helpers/fetchBlogContent';
import './Notepad.css';

const Blog = ({ blogKey }) => {
    const [blogContent, setBlogContent] = useState('');

    useEffect(() => {
        const loadBlogContent = async () => {
            const content = await fetchBlogContent(blogKey);
            setBlogContent(content);
            console.log(blogKey);
        };

        loadBlogContent();
    }, [blogKey]);

    return (
        <div className="blog-body">
            <ReactMarkdown>{blogContent}</ReactMarkdown>
        </div>
    );
};

export default Blog;