<?php

if($_SERVER['REQUEST_METHOD'] != 'POST'){
    exit;
}

include 'db_connection.php'; 

$request_body = file_get_contents('php://input');
$data = json_decode($request_body);

$updatedPost = $data->newMessage; 
$postId = $data->id;

$sql = "UPDATE appPosts SET timestamp=CURRENT_TIMESTAMP, message='$updatedPost' WHERE id = '$postId';";
$result = mysqli_query($conn, $sql);

if(!$result){
    echo ("Error Description: " . mysqli_error($conn));
} else {
    echo ("All is Goood! Post was Updated");
}
?>

