function showLineBreak() {
    document.getElementById("shell").innerHTML = document.getElementById("shell").innerHTML + "<div><span style='black_font'>&nbsp;</span></div>";
}
function showImage(image) {
    document.getElementById("shell").innerHTML = document.getElementById("shell").innerHTML + "<div class='image'><div class='image_picture' style='background-image: url(\"" + image.value + "\");'></div><div class='image_filter'><span>[" + image.identifier + "]</span></div></div>";
}
function showMessage(message) {
    document.getElementById("shell").innerHTML = document.getElementById("shell").innerHTML + "<div>" + message + "</div>";
}
function showError(message) {
    document.getElementById("shell").innerHTML = document.getElementById("shell").innerHTML + "<div class='red_font'>" + message + "</div>";
}