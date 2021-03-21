var entries = [];
var images = [];
var links = [];
function loadObjects(json) {
    let object = JSON.parse(json);
    links = object.links;
    images = object.images;
    entries = object.entries;
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