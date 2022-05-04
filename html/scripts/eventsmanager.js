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
        showMessage("<span class='black_font'>black</span>");
        showMessage("<span class='white_font'>white</span>");
        showMessage("<span class='red_font'>red</span>");
        showMessage("<span class='blue_font'>blue</span>");
        showMessage("<span class='green_font'>green</span>");
        showMessage("<span class='magenta_font'>magenta</span>");
        showMessage("<span class='cyan_font'>cyan</span>");
        showMessage("<span class='yellow_font'>yellow</span>");
    }),
    new Command("print","Send to print the page",function(arguments) {
        arguments = arguments.join("").trim();
        if(arguments.length != 0) {
            showError("This command doesn't accept arguments.");
            return;
        }
        window.print();
    }),
    new Command("blog-languages","Display the list of languages of the blog.",function(arguments) {
        arguments = arguments.join("").trim();
        if(arguments.length != 0) {
            showError("This command doesn't accept arguments.");
            return;
        }
        blog_languages.forEach(language => {
            showMessage(language);
        });
    }),
    new Command("blog-language-default","Display the default language of the blog.",function(arguments) {
        arguments = arguments.join("").trim();
        if(arguments.length != 0) {
            let default_language = undefined;
            for (let i = 0; i < blog_languages.length; i++) {
                if(arguments == blog_languages[i]) {
                    default_language = blog_languages[i];
                    break;
                }
            }
            if(!default_language) {
                showError("That language is not valid.");
                return;
            }
            blog_default_language = default_language;
        } else {
            showMessage(blog_default_language);
        }
    }),
    new Command("blog-topics","Display the list of topics of the blog.",function(arguments) {
        arguments = arguments.join("").trim();
        if(arguments.length != 0) {
            showError("This command doesn't accept arguments.");
            return;
        }
        blog_topics.forEach(topic => {
            showMessage(topic);
        });
    }),
    /*new Command("blog-list","Display the list of entries in the blog.",function(arguments) {
        if(entries.length > 0) {
            for (let index = 0; index < entries.length; index++) {
                let entry = entries[index];
                showMessage("[<span class='cyan_font'>" + index + "</span>]&nbsp;<span class='cyan_font'>" + entry.title + "</span>");
            }
        } else {
            showError("No entry could be found in the list."); 
        }
    }),
    new Command("blog-read","Open the blog entry. Arguments <span class='magenta_font'>blog-read</span> <span class='blue_font'>index</span>.",function(arguments) {
        if(entries.length === 0) {
            showError("The entries list is empty."); 
            return;
        }
        arguments = arguments.join(" ").trim();
        if(!arguments || arguments.length === 0) arguments = Math.floor(Math.random() * (entries.length - 0) + 0) + "";
        if(!/^\d+$/gm.test(arguments)) {
            showError("You need send a integer as index."); 
            return;
        }
        let index = Number(arguments);
        if(index >= entries.length) {
            showError("The entry with the index <span class='yellow_font'>[" + index + "]</span> doesn't exist."); 
        } else {
            let entry = entries[index];
            showMessage("[<span class='cyan_font'>" + index + "</span>]&nbsp;<span class='cyan_font'>" + entry.title + "</span>");
            entry.contents.forEach(content => {
                showLineBreak();
                switch(content.type) {
                    case "paragraph":
                        content.lines.forEach(line => {
                            showMessage(line);
                        });
                        break;
                    case "image":
                        showImage(content);
                        break;
                    default:
                        showError("The type [" + content.type + "] is not defined.");
                }
            });
        }
    })*/
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