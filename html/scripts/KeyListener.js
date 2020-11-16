var enableKeyboard = false;
document.onkeyup = function (e) {
    if(!enableKeyboard) {
        console.error("KeyListener: Keyboard lock, please wait to load the document.");
        return;
    }
    console.log("up: " + e.key)
}
window.onload = function () {
    console.log("Enable");
    enableKeyboard = true;
}