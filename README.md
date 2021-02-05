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

## Image and link

You can add images and links to use into the **web-console**. The configuration must be done [here](html/scripts/lists.js).

```javascript
class Element {
    constructor(identifier, value) {
        this.identifier = identifier;
        this.value = value;
    }
}
```

### Attributes

- **Identifier:** String to call in command *'image-show'* or *'link-open'*.
- **Value:** Element path or link.

## Blog

Blog is a little bit more complex than the other classes. The first one is for store the second one in the contents array. The *'BlogElement'* is the base as *'BlogParagraph'* and *'BlogImage'*. The order to show the contents is from the first element of the array and so on. You can add blog entries [here](html/scripts/blog.js).

```javascript
class BlogEntry {
    constructor(title, contents) {
        this.title = title;
        this.contents = contents;
    }
}
class BlogElement {
    constructor(type) {
        this.type = type;
    }
}
class BlogParagraph extends BlogElement {
    constructor(lines) {
        super("paragraph");
        this.lines = lines;
    }
}
class BlogImage extends BlogElement {
    constructor(identifier, value) {
        super("image");
        this.identifier = identifier;
        this.value = value;
    }
}
```

### Attributes

#### BlogEntry

- **Title:** String to store the title of the blog entry.
- **Contents:** BlogElement array to display.

#### BlogElement

- **Type:** Type of element(*paragraph* or *image*).

#### BlogParagraph

- **Lines:** String array to store the text of the paragraph.

#### BlogImage

- **Identifier:** String to print over the image.
- **Value:** Element path or link of the image.

### Author

- Roberto, Rojas