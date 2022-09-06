class Command {
    constructor(executable, description, process) {
        this.name = executable;
        this.description = description;
        this.process = process;
    }
}
var commands = [
    new Command("clear","Clear the <span class='yellow_font'>" + shellName + "</span>.", function(arguments) {
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
    new Command("exit","Close the <span class='yellow_font'>" + shellName + "</span>, it cannot close the main <span class='yellow_font'>" + shellName + "</span>.", function(arguments) {
        arguments = arguments.join("").trim();
        if(arguments.length != 0) {
            showError("This command doesn't accept arguments.");
            return;
        } 
        window.close();
    }),
    new Command("help","Show a short description of the commands. Arguments <span class='magenta_font'>help</span> <span class='blue_font'>command</span>.", function(arguments) {
        arguments = arguments.join("").trim();
        let found = false;
        let maximumLength = commands[commands.length - 1].name.length;
        for (let _command of commands) {
            if(arguments.length == 0 || _command.name == arguments) {
                let auxName = _command.name;
                while(auxName.length < maximumLength) {
                    auxName += " ";
                }
                auxName = auxName.replaceAll(/\s/gm,"&nbsp;");
                showMessage("<span class='cyan_font'>" + auxName + " :</span> " + _command.description);
                found = true;
            }
        }
        if(!found) showError("The command <span class='yellow_font'>[" + arguments + "]</span> doesn't exist."); 
    }),
    new Command("info","Show general information about <span class='yellow_font'>" + shellName + "</span>.", function(arguments) {
        arguments = arguments.join("").trim();
        if(arguments.length != 0) {
            showError("This command doesn't accept arguments.");
            return;
        } 
        showMessage("<span class='cyan_font'>Version&nbsp;:</span> " + version);
        showMessage("<span class='cyan_font'>Author&nbsp;&nbsp;:</span> Roberto Rojas");
        showMessage("<span class='cyan_font'>Github&nbsp;&nbsp;:</span> <a class='blue_font' href='https://github.com/RobertoRojas/web-console' target='_blank'>repository</a>");
    }),
    new Command("new","Open a new <span class='yellow_font'>" + shellName + "</span>.", function(arguments) {
        arguments = arguments.join("").trim();
        if(arguments.length != 0) {
            showError("This command doesn't accept arguments.");
            return;
        } 
        window.open(site,'_blank');
    }),
    new Command("echo","Print a message in the <span class='yellow_font'>" + shellName + "</span>.", function(arguments) {
        arguments = arguments.join(" ").trim();
        if(arguments == "") {
            arguments = "&nbsp;";
        }
        showMessage(arguments);
    }),
    new Command("version","Show the version of the <span class='yellow_font'>" + shellName + "</span>.", function(arguments) {
        arguments = arguments.join("").trim();
        if(arguments.length != 0) {
            showError("This command doesn't accept arguments.");
            return;
        }
        showMessage(version);
    }),
    new Command("colors","Show the color pallete",function(arguments) {
        arguments = arguments.join("").trim();
        if(arguments.length != 0) {
            showError("This command doesn't accept arguments.");
            return;
        }
        showMessage("<span class='black_font'>black font</span>");
        showMessage("<span class='white_font'>white font</span>");
        showMessage("<span class='red_font'>red font</span>");
        showMessage("<span class='blue_font'>blue font</span>");
        showMessage("<span class='green_font'>green font</span>");
        showMessage("<span class='magenta_font'>magenta font</span>");
        showMessage("<span class='cyan_font'>cyan font</span>");
        showMessage("<span class='yellow_font'>yellow font</span>");
        showMessage("<span class='black_back'>black back</span>");
        showMessage("<span class='white_back'>white back</span>");
        showMessage("<span class='red_back'>red back</span>");
        showMessage("<span class='blue_back'>blue back</span>");
        showMessage("<span class='green_back'>green back</span>");
        showMessage("<span class='magenta_back'>magenta back</span>");
        showMessage("<span class='cyan_back'>cyan back</span>");
        showMessage("<span class='yellow_back'>yellow back</span>");
    }),
    new Command("debug","Debug function, use this to test things",function(arguments) {
        debug(arguments);
    }),
    new Command("blog-list","Show the topis and the entries of the blog",function(arguments) {
        arguments = arguments.join("").trim();
        if (arguments.length !== 0) {
            if (arguments in blog) {
                showMessage("<span class='blue_font'>" + arguments + "</span>");
                for (let kEntry in blog[arguments]) {
                    showMessage("<span class='cyan_font'>+ " + kEntry + "</span>");
                }
            } else {
                showError("Cannot find any topic with the name [" + arguments + "]");
            }
        } else {
            if (Object.getOwnPropertyNames(blog).length != 0) {
                for (let kTopic in blog) {
                    showMessage("<span class='blue_font'>" + kTopic + "</span>");
                    if (Object.getOwnPropertyNames(blog).length == 0) {
                        showMessage("<span class='yellow_font'>This topic doesn't have any entry</span>");
                    } else {
                        for (let kEntry in blog[kTopic]) {
                            showMessage("<span class='cyan_font'>+ " + kEntry + "</span>");
                        }
                    }
                }
            } else {
                showMessage("<span class='yellow_font'>The blog doesn't have any entry</span>");
            }
        }
    }),
    new Command("blog-read","Show the topis and the entries of the blog",function(arguments) {
        let topic = null;
        if (Object.getOwnPropertyNames(blog).length != 0) {
            if (arguments.length < 1 || arguments[0].length == 0) {
                let topics = Object.getOwnPropertyNames(blog);
                topic = topics[Math.floor(Math.random()*topics.length)];
            } else {
                topic = arguments[0];
            }
            if (topic in blog) {
                let entry = null;
                if (arguments.length < 2 || arguments[1].length == 0) {
                    let entries = Object.getOwnPropertyNames(blog[topic]);
                    entry = entries[Math.floor(Math.random()*entries.length)];
                } else {
                    entry = arguments[1];
                }
                if (entry in blog[topic]) {
                    writeContent(blog[topic][entry]);
                } else {
                    showError("Cannot find the entry[" + topic + "][" + entry + "]");
                }
            } else {
                showError("Cannot find the topic[" + topic + "]");
            }
        } else {
            showMessage("<span class='yellow_font'>The blog doesn't have any entry</span>");
        }
    })
];
commands.sort((_c1, _c2) => _c1.name.length - _c2.name.length);
function executeCommand(command) {
    if(command.length == 0)return;
    let tokens = command.split(" ");
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