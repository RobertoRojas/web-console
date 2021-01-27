var command = "";
var lastCommand = "";
function writeCommand() {
    let shellLines = document.getElementById("shell").getElementsByTagName("div");
    let lastLine = shellLines[shellLines.length - 1];
    let tokens = lastLine.getElementsByTagName("span");
    tokens[1].innerHTML = command.replaceAll(/\s/gm,"&nbsp;");
}
function newLine() {
    command = "";
    let cursor = document.getElementById("cursor");
    if(cursor != null) {
        cursor.remove();
    }
    document.getElementById("shell").innerHTML = document.getElementById("shell").innerHTML + "<div><span class='green_font'>[" + shellName + "@remote ~]$ </span><span></span><span id='cursor'>_</span></div>";
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
                lastCommand = command;
                executeCommand(command.trim());
                newLine();
                break;
            case "Escape":
                command = "";
            case "Backspace":
                command = command.substr(0, command.length - 1);
                writeCommand();
                break;
            case "ArrowUp":
                command = lastCommand;
                writeCommand();
                break;
            default:
                console.warn("KeyListener: No valid key[" + c + "]");
        }
    }
}