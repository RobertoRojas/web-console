function restRequest(url) {
    let request = new XMLHttpRequest();
    request.open('GET', url, false);
    request.send(null);
    if (request.status === 200) {
        return request.responseText;
    }
    showError("Cannot get the content from '" + url + "'; code: " 
        + request.status + " reason: " + request.statusText);
    return "";
}

function getBlogTopics() {
    response = restRequest("https://api.github.com/repos/" + blogOwner + "/" 
        + blogRepo + "/contents?ref=main");
    if (!response) {
        return [];
    }
    return JSON.parse(response).filter(item => item.type == "dir");
}

function getBlogTopicEntries(topic) {
    response = restRequest("https://api.github.com/repos/" + blogOwner + "/" 
        + blogRepo + "/contents/" + topic + "?ref=main")
    if (!response) {
        return [];
    }
    return JSON.parse(response).filter(item => item.type == "dir");
}

function getBlogEntry(topic, entry) {
    return restRequest("https://raw.githubusercontent.com/" + blogOwner + "/" 
        + blogRepo + "/main/" + topic + "/" + entry + "/" + blogLang + "/content.wc");
}

function getBlog() {
    dict = {}
    if (blogOwner.length == 0 || blogRepo.length == 0 || blogLang.length == 0) return dict;
    getBlogTopics().forEach(topic => {
        dict[topic.name] = {};
        getBlogTopicEntries(topic.name).forEach(entry => {
            dict[topic.name][entry.name] = getBlogEntry(topic.name, entry.name);
        })
    });
    return dict;
}

function writeContent(content) {
    let title = /^\s*#[^#]+/g;
    let subtitle = /^\s*##[^#]+/g;
    let note = /^\s*###[^#]+/g;
    let code = /^\s*---\s*/g;
    let codeblock = false;
    let block = "";
    content.split("\n").forEach(line => {
        if(!line){
            if (codeblock) {
                block += "<br/>";
            } else {
                showMessage("<br/>");
            }
        } else if(code.test(line)) {
            if (codeblock) {
                block += "</div>";
                showMessage(block);
                codeblock = false;
            } else {
                block = "<div style='width:100%' class='cyan_back blue_font'>";
                codeblock = true;
            }
        } else if(title.test(line) && !codeblock) {
            showMessage("<span class='blue_font'>" + line.replace(/^\s*#/g,"") + "</span>");
        } else if(subtitle.test(line) && !codeblock) {
            showMessage("<span class='cyan_font'>" + line.replace(/^\s*##/g,"") + "</span>");
        } else if(note.test(line) && !codeblock) {
            showMessage("<span class='yellow_font'>" + line.replace(/^\s*###/g,"") + "</span>");
        } else {
            if (codeblock) {
                block += line.replace(/\s/g, '&nbsp;') + "<br/>";
            } else {
                showMessage(line);
            }
        }
    });
}

var blog = null;