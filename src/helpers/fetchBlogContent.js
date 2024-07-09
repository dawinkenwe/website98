export const fetchBlogContent = async (blogKey) => {
    const response = await fetch(`${process.env.PUBLIC_URL}/blogs/${blogKey}`);
    const content = await response.text();
    return content;
};

export const fetchLatestBlogFilename = async () => {
    const response = await fetch(`${process.env.PUBLIC_URL}/blogManifest.json`);
    const data = await response.json();
    return data[0].filename;
};