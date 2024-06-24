<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);
    
    $file = 'feedback.txt';
    $data = "Name: $name, Email: $email, Message: $message\n";
    
    file_put_contents($file, $data, FILE_APPEND);
    echo "Thank you for your feedback!";
}
?>
