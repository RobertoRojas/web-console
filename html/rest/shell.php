<?php
header("Content-Type: application/json; charset=UTF-8");
$Example = array(
    "name" => "Example"
);
echo json_encode($Example);
?>