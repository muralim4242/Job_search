<?php
$dbhost = "localhost";
$dbuname = "root";  // Database username
$dbpass = "";   // Database password
$dbname = "rsm";

// $con=mysqli_connect($dbhost,$dbuname,$dbpass,$dbname) or die(mysqli_error());

/**
* Database configuration
*/
define('DB_USERNAME', $dbuname);
define('DB_PASSWORD', $dbpass);
define('DB_HOST', $dbhost);
define('DB_NAME', $dbname);

define('USER_CREATED_SUCCESSFULLY', 0);
define('USER_CREATE_FAILED', 1);
define('USER_ALREADY_EXISTED', 2);

?>
