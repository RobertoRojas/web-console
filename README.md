# web-console

This project is a shell simulator, and **it doesn't try to become a real shell interface**, is only for fun. With this clear, we can proceed with the basic configuration of the **web-console**. 

## Command

Into the [eventsmanager.js](html/scripts/eventsmanager.js) you can define a new command into the array *'commands'*. use the follow class:

```javascript
class Command {
    constructor(executable, description, process) {
        this.name = executable;
        this.description = description;
        this.process = process;
    }
}
```

### Attributes

- **Name:** String to select the command.
- **Description:** String to show in *'help'* command.
- **Process:** Function to execute.

## Blog

To add entries to the blog, you need to create an external repository in github like [this](https://github.com/RobertoRojas/blog). To configure the user, repo and language of the **web-console**m you need to modify the follow [file](https://github.com/RobertoRojas/web-console/blob/main/html/scripts/configuration.js) into the blog section:

```javascript
// Blog configuration
var blogLang = "";
var blogOwner = "";
var blogRepo = "";
```

### Author

- Roberto, Rojas