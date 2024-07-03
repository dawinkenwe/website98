export const fetchBlogContent = async (blogKey) => {
    const response = await fetch(`${process.env.PUBLIC_URL}/blogs/${blogKey}.md`);
    console.log(`${process.env.PUBLIC_URL}/blogs/${blogKey}.md`)
    const content = await response.text();
    console.log(response.ok);
    console.log(content);
    return content;
};