const fs = require('fs');
const path = require('path');

const blogsDirectory = path.join(__dirname, 'public', 'blogs');
const releasesDirectory = path.join(__dirname, 'public', 'releaseNotes');
const blogManifestPath = path.join(__dirname, 'public', 'blogManifest.json');
const releaseManifestPath = path.join(__dirname, 'public', 'releaseManifest.json');

const generateBlogManifest = () => {
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

    fs.writeFileSync(blogManifestPath, JSON.stringify(blogPosts, null, 2));
};

const generateReleaseManifest = () => {
    const files = fs.readdirSync(releasesDirectory);
    const releases = files.map(file => {
        const filePath = path.join(releasesDirectory, file);
        const stats = fs.statSync(filePath);
        return {
            version: file.replace(/\.md$/, ''),
            filename: file,
            createdDate: stats.birthtime
        };
    }).sort((a, b) => b.createdDate - a.createdDate);

    fs.writeFileSync(releaseManifestPath, JSON.stringify(releases, null, 2));
}

const generateManifests = () => {
    generateBlogManifest();
    generateReleaseManifest();
}

generateManifests();