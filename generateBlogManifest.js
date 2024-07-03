const fs = require('fs');
const path = require('path');

const blogsDirectory = path.join(__dirname, 'public', 'blogs');
const manifestPath = path.join(__dirname, 'public', 'blogManifest.json');

const generateManifest = () => {
    const files = fs.readdirSync(blogsDirectory);
    const blogPosts = files
        .filter(file => file.endsWith('.md'))
        .map(file => {
            const filePath = path.join(blogsDirectory, file);
            const stats = fs.statSync(filePath);
            return {
                title: file.replace(/-/g, ' ').replace(/\.md$/, ''),
                filename: file,
                createdDate: stats.birthtime
            };
        })
        .sort((a, b) => b.createdDate - a.createdDate);

    fs.writeFileSync(manifestPath, JSON.stringify(blogPosts, null, 2));
    console.log('Blog manifest generated successfully.');
    console.log(JSON.stringify(blogPosts, null, 2));
};

generateManifest();