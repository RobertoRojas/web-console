# web-console

This project is a shell simulator, and **it doesn't try to become a real shell interface**, is only for fun. With this clear, we can proceed with the basic configuration of the **web-console**. 

## Command

Into the [eventsmanager.js](html/scripts/eventsmanager.js), you can define a new command into the array *'commands'*, you need use the follow class:

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

## Image

You can add images to use into the **web-console**. The configuration must be done [here](html/rest/API.php).

```PHP
    new Image("identifier","path")
    new Image("identifier","path", 40, 30)
```

### Attributes

- **Identifier:** String to call in command *'image-show'*.
- **Value:** Element path.
- **Width:** Width of the image (default: 20).
- **Height:** Height of the image (default: 15).

## Link

You can add links to use into the **web-console**. The configuration must be done [here](html/rest/API.php).

```PHP
    new Link("identifier","url")
```

### Attributes

- **Identifier:** String to call in command *'link-open'*.
- **Value:** Element link.

## Blog

Blog is a little bit more complex than the other classes. The first one is for store the second one in the contents array. The *'BlogElement'* is the base as *'BlogParagraph'* and *'BlogImage'*. The order to show the contents is from the first element of the array and so on. You can add blog entries [here](html/rest/API.php).

```PHP
new BlogEntry("title", array(
    new BlogParagraph(array(
        "line"
    )),
    new BlogImage("identifier","path"),
    new BlogImage("identifier","path", 40, 30)
))
```

### Attributes

#### BlogEntry

- **Title:** String to store the title of the blog entry.
- **Contents:** BlogElement array to display.

#### BlogParagraph

- **Lines:** String array to store the text of the paragraph.

#### BlogImage

- **Identifier:** String to print over the image.
- **Value:** Element path or link of the image.
- **Width:** Width of the image (default: 20).
- **Height:** Height of the image (default: 15).

### Author

- Roberto, Rojas