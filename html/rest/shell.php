<?php
//header("Content-Type: application/json; charset=UTF-8");

class program
{
    public $name;
    public $description;
    public function __construct($name, $description)
    {
        $this->name = $name;
        $this->description = $description;
    }
}

$Program = new program("a","b");



echo json_encode(get_object_vars($Program));
?>