function Command(executable, description, process) {
    this.name = executable;
    this.description = description;
    this.process = process;
}

var commands = [
    new Command("clean","This command clean the shell.", function(arguments) {
        arguments = arguments.join("").trim();
        if(arguments.length != 0) {
            showError("This command doesn't accept arguments.");
            return;
        } 
        let lines = document.getElementById("shell").getElementsByTagName("div");
        for (let index = lines.length - 1; index >= 0; index--) {
            lines[index].remove();
        }
    }),
    new Command("version","This command show you a the version of the rrshell.", function(arguments) {
        showMessage(version);
    }),
    new Command("help","This command show you a short description of the commands.", function(arguments) {
        arguments = arguments.join("").trim();
        let found = false;
        for (let _command of commands) {
            if(arguments.length == 0 || _command.name == arguments) {
                showMessage(_command.name + " : " + _command.description);
                found = true;
            }
        }
        if(!found) showError("The command [" + arguments + "] doesn't exist."); 
    })];

function executeCommand(command) {
    if(command.length == 0)return;
    let tokens = command.trim().split(" ");
    let executed = false;
    for (let _command of commands) {
        if(tokens[0] === _command.name) {
            _command.process(tokens.slice(1, tokens.length));
            executed = true;
            break;
        }
    }
    if(!executed) showError("The command [" + tokens[0] + "] doesn't exist. You can use help to view the available commands."); 
}