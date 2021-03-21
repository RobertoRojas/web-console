<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET");
    header("Access-Control-Max-Age: 300");
    class Element {
        function __construct($identifier, $value) {
            $this->identifier = $identifier;
            $this->value = $value;
        }
    }
    class Link extends Element {
        public function __constuct($identifier, $value){ 
            parent::__construct($identifier, $value);
        }
    }
    class Image extends Element {
        public function __constuct($identifier, $value){ 
            parent::__construct($identifier, $value);
        }
    }
    class BlogEntry {
        function __construct($title, $contents) {
            $this->title = $title;
            $this->contents = $contents;
        }
    }
    class BlogElement {
        function __construct($type) {
            $this->type = $type;
        }
    }
    class BlogParagraph extends BlogElement {
        function __construct($lines) {
            parent::__construct("paragraph");
            $this->lines = $lines;
        }
    }
    class BlogImage extends BlogElement {
        function __construct($identifier, $value) {
            parent::__construct("image");
            $this->identifier = $identifier;
            $this->value = $value;
        }
    }
    $Links = array();
    $Images = array();
    $Entries = array();
    echo json_encode(array(
        'links' => $Links,
        'images' => $Images,
        'entries' => $Entries
    ));
?>