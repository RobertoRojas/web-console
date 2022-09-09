var command = "";
var lastCommand = "";
function writeCommand() {
    let shellLines = document.getElementById("shell").getElementsByTagName("div");
    let lastLine = shellLines[shellLines.length - 1];
    let tokens = lastLine.getElementsByTagName("span");
    if(/^(.*\w+)(.*)$/gm.test(command)) {
        let groups = command.match(/(\s*\S+\s*)/gm);
        let executable = "<span class='magenta_font'>" + groups[0].replaceAll(/\s/gm,"&nbsp;") + "</span>";
        let arguments = groups.slice(1).join("").replaceAll(/\s/gm,"&nbsp;");
        tokens[1].innerHTML = executable + arguments;
    } else {
        tokens[1].innerHTML = "<span>" + command.replaceAll(/\s/gm,"&nbsp;") + "</span>";
    }
}
function newLine(move) {
    command = "";
    let cursor = document.getElementById("cursor");
    if(cursor != null) {
        cursor.remove();
    }
    document.getElementById('shell').innerHTML = document.getElementById('shell').innerHTML + "<div><span class='shell_precommand'>[" + shellName + "@remote ~]$ </span><span class='shell_command'><span></span></span><span id='cursor'>_</span></div>";
    if (move) document.getElementById('shell').scrollTop = document.getElementById('shell').scrollHeight;
}
document.onkeyup = function (e) {
    if(!enableKeyboard) {
        console.error("KeyListener: Keyboard lock, please wait to load the document.");
        return;
    }
    c = e.key.toString();
    if(c.length == 1) {
        document.getElementById('shell').scrollTop = document.getElementById('shell').scrollHeight;
        command = command.concat(c);
        writeCommand();
    } else {
        switch(c) {
            case "Enter":
                lastCommand = command;
                newLine(executeCommand(command.trim()));
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