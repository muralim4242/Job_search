<?php
 require_once '../../../api/libs/Medoo-Master/medoo.php';
// require_once '../../api/libs/Medoo-Master/medoo.php';
/**
* Handling database connection
*
*
*/
//require_once 'config.php';
class DbConnect
{

    private $conn;

// function __construct()
    //  {
//
// }

/**
    * Establishing database connection
    * @return database connection handler
    */
function connect()
{
    include_once dirname(__FILE__) . '/config.php';
   // echo DB_NAME.' '.DB_HOST.' '.DB_USERNAME.' '.DB_PASSWORD;

    // If you installed via composer, just use this code to requrie autoloader on the top of your projects.
// require 'vendor/autoload.php';

// Or if you just download the medoo.php into directory, require it with the correct path.
// require  'medoo.php';


$this->conn = new medoo([
// required
'database_type' => 'mysql',
'database_name' => DB_NAME,
'server' => DB_HOST,
'username' => DB_USERNAME,
'password' => DB_PASSWORD,
'charset' => 'utf8',

// [optional]
// 'port' => 3306,

// [optional] Table prefix
// 'prefix' => 'PREFIX_',

// [optional] driver_option for connection, read more from http://www.php.net/manual/en/pdo.setattribute.php
// 'option' => [
//     PDO::ATTR_CASE => PDO::CASE_NATURAL
// ]
]);




    // Connecting to mysql database
//     $this->conn = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);
//
//     // Check for database connection error
//     if (mysqli_connect_errno())
    // {
//         echo "Failed to connect to MySQL: " . mysqli_connect_error();
//     }

    // returing connection resource
    return $this->conn;
}

}

?>
