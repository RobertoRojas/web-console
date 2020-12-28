function Command(executable, description, process) {
    this.name = executable;
    this.description = description;
    this.process = process;
}

var commands = [
    new Command("clean","Clean the shell.", function(arguments) {
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
    new Command("exit","Close the shell.", function(arguments) {
        window.close();
    }),
    new Command("help","Show a short description of the commands.", function(arguments) {
        arguments = arguments.join("").trim();
        let found = false;
        for (let _command of commands) {
            if(arguments.length == 0 || _command.name == arguments) {
                showMessage("<span class='cyan_font'>" + _command.name + "</span> " + _command.description);
                found = true;
            }
        }
        if(!found) showError("The command <span class='yellow_font'>[" + arguments + "]</span> doesn't exist."); 
    }),
    new Command("info","Show general information about web-console.", function(arguments) {
        showMessage("<span class='cyan_font'>Version&nbsp;:</span> " + version);
        showMessage("<span class='cyan_font'>Author&nbsp;&nbsp;:</span> Roberto Rojas");
        showMessage("<span class='cyan_font'>Github&nbsp;&nbsp;:</span> <a class='blue_font' href='https://github.com/RobertoRojas/web-console' target='_blank'>repository</a>");
    }),
    new Command("new","Open a new shell.", function(arguments) {
        window.open(site,'_blank');
    }),
    new Command("version","Show the version of the web-console.", function(arguments) {
        showMessage(version);
    })
];

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
    if(!executed) showError("The command <span class='yellow_font'>[" + tokens[0] + "]</span> doesn't exist. You can use help to view the available commands."); 
}