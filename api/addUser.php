<?php

include 'db_connection.php';

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: * ");

$request_body = file_get_contents('php://input');
$data = json_decode($request_body);

$first = $data->first;
$last = $data->last;
$email = $data->email;
$contact = $data->contact;
$username = $data->username;
$password = $data->password;
$image = $data->image;

$passwordEncrypt = md5($password);

list($type, $image) = explode(';', $image);
list(, $image)      = explode(',', $image);
$image = base64_decode($image);

$newPath = 'profiles/' . time() . '.jpg';
 
file_put_contents($newPath, $image);

$sql = "INSERT INTO users (id, first, last, email, contact, username, password, userCreate, imgPath) VALUES (NULL, '$first','$last', '$email', '$contact', '$username', '$passwordEncrypt', CURRENT_TIMESTAMP, '$newPath');";
$result = mysqli_query($conn, $sql);

if(!$result){
    echo ("Error Description: " . mysqli_error($conn));
} else {
    echo ("All is Goood! Added user");
}

?>