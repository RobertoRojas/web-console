var command = "";
function writeCommand() {
    let shellLines = document.getElementById("shell").getElementsByTagName("div");
    let lastLine = shellLines[shellLines.length - 1];
    let tokens = lastLine.getElementsByTagName("span");
    
}
function newLine() {

}
document.onkeyup = function (e) {
    if(!enableKeyboard) {
        console.error("KeyListener: Keyboard lock, please wait to load the document.");
        return;
    }
    c = e.key.toString();
    if(c.length == 1) {
        command = command.concat(c);
        writeCommand();
    } else {
        switch(c) {
            case "Enter":
                command = "";
                document.getElementById('shell').innerHTML = document.getElementById('shell').innerHTML + "<div></div>";
                break;
            case "Backspace":
                command = command.substr(0,command.length - 2);
                writeCommand();
                break;
            default:
                console.warn("KeyListener: No valid key[" + c + "]");
        }
    }
    console.log("Command: " + command);
}