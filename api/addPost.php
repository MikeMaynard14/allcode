<?php

if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    exit;
}

include 'db_connection.php';

$request_body = file_get_contents('php://input');
$data = json_decode($request_body);

$message = $data->message;
$user = $data->user;



if($message === ''){
    echo ("Message is Empty");
} else {

    $sql = "INSERT INTO appPosts (id, userpost, timestamp, message) VALUES (NULL, '$user', CURRENT_TIMESTAMP, '$message');";
    $result = mysqli_query($conn, $sql);
    
    if(!$result){
        echo ("Error Description: " . mysqli_error($conn));
    } else {
        echo ("All is Goood! Added Post");
    }

}



?>