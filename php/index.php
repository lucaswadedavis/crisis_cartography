<?php
$jsonObject = json_decode(file_get_contents("http://www.zachdominik.com/elysium/json/index.js"));
header('Content-Type: application/json');
echo json_encode($jsonObject);
?>