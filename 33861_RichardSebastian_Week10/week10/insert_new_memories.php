<?php
    if(isset($_SERVER['HTTP_ORIGIN'])){
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
    }

    $response = array();

    if(isset($_POST['id']) && isset($_POST['title']) && isset($_POST['imagePath']) && isset($_POST['type']) && isset($_POST['base64url']) && isset($_POST['lng']) && isset($_POST['lat']) ) {
            $id = $_POST['id'];
            $title = $_POST['title'];
            $type = $_POST['type'];
            $base64url = $_POST['base64url'];
            $imagePath = $_POST['imagePath'];
            $lat = $_POST['lat'];
            $lng = $_POST['lng'];

        require_once __DIR__ . '/dbconfig.php';

        $db = mysqli_connect(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE) or die(mysqli_connect_error());

        $source = $base64url['tmp_name'];
        $destination = 'uploads/' . $imagePath;
        move_uploaded_file($source, $destination);

        $result = mysqli_query($db, "INSERT INTO memories VALUES('$id', '$title', '$destination', '$type', '$base64url', '$lat', '$lng')");

        if($result) {
            $response["success"] = 1;
            $response["message"] = "Insert Data Success";
        } else {
            $response["success"] = 0;
            $response["message"] = "Insert Data Failed";
        }
        echo json_encode($response);
    } else {
        $response["success"] = 0;
        $response["message"] = "Data must be complete";

        echo json_encode($response);
    }
?>