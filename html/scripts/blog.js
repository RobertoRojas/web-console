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
var list = [
    new BlogParagraph("Este es un texto"),
    new BlogImage("s.a")
];
var blog_entries = [
    new BlogEntry("Hello world!", [
        new BlogParagraph([
            "This is a line",
            "This is other line"
        ]),
        new BlogImage("Google","https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png")
    ])
];