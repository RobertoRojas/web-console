async function getRawContent(url) {
    response = await fetch(url);
    if(response.status === 200) {
        return await response.text();
    } else {
        return "";
    }
}
async function loadBlogEntries() {
    configuration = JSON.parse(await getRawContent(site + "/blog/config.json"));
    if(configuration['default']) {
        blog_default_language = configuration['default'];
    }
    if(configuration['languages']) {
        blog_languages = configuration['languages'];
    }
    if(configuration['topics']) {
        blog_topics = configuration['topics'];
    }
}
blog_entries = [];
blog_topics = [];
blog_languages = [];
blog_default_language = "";