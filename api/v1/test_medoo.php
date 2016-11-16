<?php

/**     * Testing medoo     */


require_once '../../api/includes/dbConnect.php';


// echo DB_NAME.' '.DB_HOST.' '.DB_USERNAME.' '.DB_PASSWORD;

// opening db connection
$db = new DbConnect();

$conn = $db->connect();



//echo $conn->insert("roles", ["NAME" => "foo"]);


//$data=$conn->select("roles","NAME");

//print_r($data);


// $data=$conn->select("users","ID", [
// "EMAIL" => "foo@bar.com"
// ]);


//  $data=$conn->select("users","PASSWORD_HASH", [
// 		"EMAIL" => "muralim4242@gmail.com"
// 		]);
$data=$conn->select("employers_post","*");

//print_r($data);

echo json_encode($data);
//echo $data;
//print_r(count($data));





?>