function showMessage(message) {
    document.getElementById("shell").innerHTML = document.getElementById("shell").innerHTML + "<div>" + message + "</div>";
}
function showError(message) {
    document.getElementById("shell").innerHTML = document.getElementById("shell").innerHTML + "<div class='red_font'>" + message + "</div>";
}