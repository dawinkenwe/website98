export const fetchBlogContent = async (blogKey) => {
    const response = await fetch(`${process.env.PUBLIC_URL}/blogs/${blogKey}.md`);
    console.log(`${process.env.PUBLIC_URL}/blogs/${blogKey}.md`)
    const content = await response.text();
    console.log(response.ok);
    console.log(content);
    return content;
};

export const fetchLatestBlogFilename = async () => {
    const response = await fetch(`${process.env.PUBLIC_URL}/blogManifest.json`);
    const data = await response.json();
    console.log(data);
    console.log(data[0]);
    console.log(data[0].filename);
    return data[0].filename;
};