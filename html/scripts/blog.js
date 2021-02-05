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
var blog_entries = [];