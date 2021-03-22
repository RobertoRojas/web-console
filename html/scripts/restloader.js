var entries = [];
var images = [];
var links = [];
function loadObjects(json) {
    try {
        let object = JSON.parse(json);
        links = object.links;
        images = object.images;
        entries = object.entries;
        let index = parseInt(getUrlParam("entry"));
        if(!isNaN(index)) {
            document.getElementById("shell").innerHTML = document.getElementById("shell").innerHTML + "<div><span class='shell_precommand'>[" + shellName + "@remote ~]$ </span><span class='shell_command'><span class='magenta_font'>blog-read</span>&nbsp;<span class='blue_font'>" + index + "</span></span><span id='cursor'>_</span></div>";
            executeCommand("blog-read " + index);
        }
    } catch (error) {
        console.log(error);
    } finally {
        newLine();
        enableKeyboard = true;
    }
}
var xmlhttp = new XMLHttpRequest();
xmlhttp.open("GET", "http://localhost/rest/API.php", true);
xmlhttp.setRequestHeader("Content-Type", "application/json");
xmlhttp.onreadystatechange = function() {
    if(xmlhttp.readyState === 4) {
        loadObjects(xmlhttp.responseText.toString());
    }
}
xmlhttp.send();