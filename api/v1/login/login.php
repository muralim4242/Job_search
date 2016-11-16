<?php
require_once 'loginHandler.php';


require_once '../../../api/includes/passHash.php';


require '../../../api/libs/Slim/Slim.php';



\Slim\Slim::registerAutoloader();



$app = new \Slim\Slim();



// User id from db - Global Variable
$user_id = NULL;





/** * Adding Middle Layer to authenticate every request * Checking if the request has valid api key in the 'Authorization' header */


function authenticate(\Slim\Route $route) {
	
	
	// 	Getting request headers
	$headers = apache_request_headers();
	
	
	$response = array();
	
	
	$app = \Slim\Slim::getInstance();
	
	
	
	// 	Verifying Authorization Header
	if (isset($headers['Authorization'])) {
		
		
		$db = new loginHandler ();
		
		
		
		// 		get the api key
		$api_key = $headers['Authorization'];
		
		
		// 		validating api key
		if (!$db->isValidApiKey($api_key)) {
			
			
			// 			api key is not present in users table
			$response["error"] = true;
			
			
			$response["message"] = "Access Denied. Invalid Api key";
			
			
			echoRespnse(401, $response);
			
			
			$app->stop();
			
			
		}
		
		else {
			
			
			global $user_id;
			
			
			// 			get user primary key id
			$user_id = $db->getUserId($api_key);
			
			
			// 			echo $user_id;
			
			
		}
		
		
	}
	
	else {
		
		
		// 		api key is missing in header
		$response["error"] = true;
		
		
		$response["message"] = "Api key is misssing";
		
		
		echoRespnse(400, $response);
		
		
		$app->stop();
		
		
	}
	
	
}






/** * Verifying required params posted or not */





/** * User Registration * url - /register * method - POST * params - name, email, password */


$app->post('/register', function() use ($app)
{
	
	
	
	
	// 	check for required params
	verifyRequiredParams(array('email', 'password','view'));
	
	
	
	$response = array();
	
	
	
	$request_params = json_decode($app->request()->getBody(), true);
	
	
	$email = $request_params['email'];
	
	
	$password = $request_params['password'];
	
	
	$view = $request_params['view'];
	
	
	
	
	
	validateEmail($email);
	
	
	$db = new loginHandler();
	
	
	$res=array();
	
	
	$res = $db->createUser($email, $password ,$view);
	
	
	if ($res['status'] == USER_CREATED_SUCCESSFULLY)
	{
		
		
		$response["error"] = false;
		
		
		//			$response['id']=$res['id'];
		
		
		$response["message"] = "You are successfully registered";
		
		
		$response['apiKey'] = $res['apiKey'];
		
		
		echoRespnse(201, $response);
		
		
	}
	
	else if ($res['status'] == USER_CREATE_FAILED) {
		
		
		$response["error"] = true;
		
		
		$response["message"] = "Oops! An error occurred while registereing";
		
		
		echoRespnse(200, $response);
		
		
	}
	
	else if ($res['status'] == USER_ALREADY_EXISTED) {
		
		
		$response["error"] = true;
		
		
		$response["message"] = "Sorry, this email already existed";
		
		
		echoRespnse(200, $response);
		
		
	}
	
	
}

);






/** * User Login * url - /login * method - POST * params - email, password */


$app->post('/login', function() use ($app)
{
	
	
	// 	check for required params
	verifyRequiredParams(array('email', 'password'));
	
	// 	reading post params
	
	
	$response = array();
	
	
	$request_params = json_decode($app->request()->getBody(), true);
	
	
	$email = $request_params['email'];
	
	
	$password = $request_params['password'];
	
	
	$db = new loginHandler();
	
	
	if ($db->checkLogin($email, $password))
	{
		
		
		if($db->updateApiKey($email))
		{
			
			$user = $db->getUserByEmail($email);
			
			
			
			if ($user != NULL)
			{
				
				
				$response["error"] = false;
				
				
				$response['apiKey'] = $user[0];
				
				
				// 				$response['created_at'] = $user['created_at'];
				
				
			}
			
			else {
				
				
				// 				unknown error occurred
				$response['error'] = true;
				
				
				$response['message'] = "An error occurred. Please try again";
				
				
			}
			
		}
		
		
		
	}
	
	
	else
	{
		
		
		// 		user credentials are wrong
		$response['error'] = true;
		
		
		$response['message'] = 'Login failed. Incorrect credentials';
		
		
	}
	
	
	
	echoRespnse(200, $response);
	
	
});





$app->post('/add_employer','authenticate',function() use ($app)
{
    	$response = array();
	
	
	$request_params = json_decode($app->request()->getBody(), true);
	
	
	$employer_name = $request_params['employer_name'];
	
	
	$telephone = $request_params['telephone'];
    
    global $user_id;
	
	$db = new loginHandler();

    	$res= $db->add_employer($user_id,$employer_name,$telephone);
	
	
	
	if ($res)
	{
		
		
		$response["error"] = false;
		
		
		
		
		/*  $response['id'] = $user['id'];                            $response['apiKey'] = $user['api_Key'];                            $response['created_at'] = $user['created_at'];*/
		
		
		$response['message'] = "Employer record created successfully";
		
		
	}
	
	
	else
	{
		
		
		// 		unknown error occurred
		$response['error'] = true;
		
		
		$response['message'] = "An error occurred. Please try again";
		
		
	}
	
	
	
	echoRespnse(200, $response);
	
});

// $app->get('/getStudentAll', 'authenticate', function() use ($app)
// {
	
	
// 	// 	check for required params
	
// 	// 	verifyRequiredParams(array('name','age','relationship','sex'));
	
	
	
// 	$response = array();
	
	
	
// 	global $user_id;
	
	
// 	$db = new loginHandler();
	
	
	
// 	// 	creating new Family Member
// 	$students = $db->getStudentAll();
	
	
// 	//p	rint_r $result;
	
	
// 	if ($students)
// 	{
		
		
// 		$response["error"] = false;
		
		
		
// 		$response["students"]=array();
		
		
// 		while ($student = $students->fetch_assoc())
// 		{
			
			
// 			array_push($response["students"], $student);
			
			
// 		}
		
		
		
// 	}
	
	
// 	else
// 	{
		
		
// 		// 		unknown error occurred
// 		$response['error'] = true;
		
		
// 		$response['message'] = "An error occurred. Please try again";
		
		
// 	}
	
	
	
// 	echoRespnse(200, $response);
	
	
	
// }

// );



// $app->get('/getIndConDet/:stdId', 'authenticate', function($stdId) use ($app)
// {
	
	
// 	// 	check for required params
	
// 	// 	verifyRequiredParams(array('name','age','relationship','sex'));
	
	
	
// 	$response = array();
	
	
	
// 	global $user_id;
	
	
// 	$db = new loginHandler();
	
	
	
// 	// 	creating new Family Member
// 	$getAllQuestion = $db->getAllQuestion();
	
	
	
// 	//p	rint_r $result;
	
	
// 	if ($getAllQuestion)
// 	{
		
		
// 		$response["error"] = false;
		
		
// 		$response["stdName"]=$db->getStdNameById($stdId);
		
		
		
// 		$response["questions"]=array();
		
		
// 		// 		$response["indStdDets"]=array();
		
		
// 		while ($question = $getAllQuestion->fetch_assoc())
// 		{
			
			
// 			$indConDets=$db->getIndConDet($stdId,$question["id"]);
			
			
// 			$question["indStdDets"]=array();
			
			
// 			while ($indStdDet = $indConDets->fetch_assoc())
// 			{
				
				
// 				array_push($question["indStdDets"], $indStdDet);
				
				
// 			}
			
			
// 			array_push($response["questions"], $question);
			
			
// 		}
		
		
// 		// 		while ($indStdDet = $getIndConDet->fetch_assoc())
// 		// 		{
			
			
// 			// 			array_push($response["indStdDets"], $indStdDet);
			
			
// 			//			
// 		}
		
		
		
// 	}
	
	
// 	else
// 	{
		
		
// 		// 		unknown error occurred
// 		$response['error'] = true;
		
		
// 		$response['message'] = "An error occurred. Please try again";
		
		
// 	}
	
	
	
// 	echoRespnse(200, $response);
	
	
	
// }

// );



// $app->post('/feedback', function() use ($app)
// {
	
	
// 	// 	check for required params
// 	// 	verifyRequiredParams(array('id', 'password'));
	
	
	
// 	// 	reading post params
	
	
// 	/*   $email = $app->request()->post('email');            $password = $app->request()->post('password'); */
	
	
	
// 	$response = array();
	
	
// 	$request_params = json_decode($app->request()->getBody(), true);
	
	
	
// 	$name = $request_params['name'];
	
	
// 	$email = $request_params['email'];
	
	
// 	$feedback = $request_params['feedback'];
	
	
	
// 	$db = new loginHandler();
	
	
// 	//		echo $id." ".$password;
	
	
// 	// 	check for correct id and password
	
// 	$user = $db->feedback($name,$email,$feedback);
	
	
	
// 	if ($user)
// 	{
		
		
// 		$response["error"] = false;
		
		
		
		
// 		/*  $response['id'] = $user['id'];                    $response['apiKey'] = $user['api_Key'];                    $response['created_at'] = $user['created_at'];*/
		
		
// 	}
	
	
// 	else
// 	{
		
		
// 		// 		unknown error occurred
// 		$response['error'] = true;
		
		
// 		$response['message'] = "An error occurred. Please try again";
		
		
// 	}
	
	
	
// 	echoRespnse(200, $response);
	
	
// }

// );



// $app->put('/counselUpdate/:conId','authenticate',  function($conId) use ($app)
// {
	
	
	
// 	global $user_id;
	
	
// 	$response = array();
	
	
// 	$request_params = json_decode($app->request()->getBody(), true);
	
	
	
// 	$stdId = $request_params['stdId'];
	
	
// 	$qId = $request_params['qId'];
	
	
// 	$assigned_date = $request_params['assigned_date'];
	
	
// 	$assignmentTypeId = $request_params['assignmentTypeId'];
	
	
// 	$isCompleted = $request_params['isCompleted']?1:0;
	
	
// 	$completed_date = $request_params['completed_date'];
	
	
// 	$comment = $request_params['comment'];
	
	
	
// 	// 	echo "hai";
	
	
// 	// 	echo $user_id .$request_params['stdId'].$request_params['qId'].  $request_params['assigned_date'].$request_params['assignmentTypeId'];
	
	
// 	// 	echo $isCompleted = $request_params['isCompleted']. $request_params['completed_date'].$request_params['comment'];
	
	
// 	$db = new loginHandler();
	
	
// 	//		echo $id." ".$password;
	
	
// 	// 	check for correct id and password
	
// 	$res= $db->counselUpdate($conId,$user_id,$assigned_date,$assignmentTypeId,$isCompleted,$completed_date,$comment);
	
	
	
// 	if ($res)
// 	{
		
		
// 		$response["error"] = false;
		
		
		
		
// 		/*  $response['id'] = $user['id'];                            $response['apiKey'] = $user['api_Key'];                            $response['created_at'] = $user['created_at'];*/
		
		
// 		$response['message'] = "Counsel updated successfully";
		
		
// 	}
	
	
// 	else
// 	{
		
		
// 		// 		unknown error occurred
// 		$response['error'] = true;
		
		
// 		$response['message'] = "An error occurred. Please try again";
		
		
// 	}
	
	
	
// 	echoRespnse(200, $response);
	
	
// }

// );



// $app->post('/counselAdd','authenticate',  function() use ($app)
// {
	
	
	
// 	global $user_id;
	
	
// 	$response = array();
	
	
// 	$request_params = json_decode($app->request()->getBody(), true);
	
	
	
// 	$stdId = $request_params['stdId'];
	
	
// 	$qId = $request_params['qId'];
	
	
// 	$assigned_date = $request_params['assigned_date'];
	
	
// 	$assignmentTypeId = $request_params['assignmentTypeId'];
	
	
// 	$isCompleted = $request_params['isCompleted']?1:0;
	
	
// 	$completed_date = $request_params['completed_date'];
	
	
// 	$comment = $request_params['comment'];
	
	
	
// 	// 	echo "hai";
	
	
// 	// 	echo $user_id .$request_params['stdId'].$request_params['qId'].  $request_params['assigned_date'].$request_params['assignmentTypeId'];
	
	
// 	// 	echo $isCompleted = $request_params['isCompleted']. $request_params['completed_date'].$request_params['comment'];
	
	
// 	$db = new loginHandler();
	
	
// 	//		echo $id." ".$password;
	
	
// 	// 	check for correct id and password
	
// 	$res= $db->counselAdd($user_id,$stdId,$qId,$assigned_date,$assignmentTypeId,$isCompleted,$completed_date,$comment);
	
	
	
// 	if ($res)
// 	{
		
		
// 		$response["error"] = false;
		
		
		
		
// 		/*  $response['id'] = $user['id'];                                    $response['apiKey'] = $user['api_Key'];                                    $response['created_at'] = $user['created_at'];*/
		
		
// 		$response['message'] = "Counsel added successfully";
		
		
// 	}
	
	
// 	else
// 	{
		
		
// 		// 		unknown error occurred
// 		$response['error'] = true;
		
		
// 		$response['message'] = "An error occurred. Please try again";
		
		
// 	}
	
	
	
// 	echoRespnse(200, $response);
	
	
// }

// );





// $app->get('/viewProfile', 'authenticate', function() use ($app)
// {
	
	
// 	// 	check for required params
	
// 	// 	verifyRequiredParams(array('name','age','relationship','sex'));
	
	
	
// 	$response = array();
	
	
	
// 	global $user_id;
	
	
// 	$db = new loginHandler();
	
	
	
// 	// 	creating new Family Member
// 	$user = $db->viewProfile($user_id);
	
	
// 	//p	rint_r $result;
	
	
// 	if ($user)
// 	{
		
		
// 		$response["error"] = false;
		
		
// 		$response["id"]=$user['id'];
		
		
// 		$response['name'] = $user['name'];
		
		
// 		$response['email'] = $user['email'];
		
		
// 		$response['sexSelected'] = $user['sexSelected'];
		
		
// 		$response['dob'] = $user['dob'];
		
		
// 		$response['mobileno'] = $user['mobileno'];
		
		
// 		$response['address'] = $user['address'];
		
		
// 		$response['city'] = $user['city'];
		
		
// 		$response['pincode'] = $user['pincode'];
		
		
// 		$response['district'] = $user['district'];
		
		
// 		$response['state'] = $user['state'];
		
		
		
// 	}
	
	
// 	else
// 	{
		
		
// 		// 		unknown error occurred
// 		$response['error'] = true;
		
		
// 		$response['message'] = "An error occurred. Please try again";
		
		
// 	}
	
	
	
// 	echoRespnse(200, $response);
	
	
	
// }

// );



// $app->post('/editProfile', 'authenticate', function() use ($app)
// {
	
	
// 	// 	check for required params
// 	// 	verifyRequiredParams(array('name','age','relationship','sex'));
	
	
// 	$response = array();
	
	
// 	$request_params = json_decode($app->request()->getBody(), true);
	
	
// 	$name = $request_params['name'];
	
	
// 	$email = $request_params['email'];
	
	
// 	$sexSelected = $request_params['sexSelected'];
	
	
// 	$dob = $request_params['dob'];
	
	
// 	$mobileno = $request_params['mobileno'];
	
	
// 	$address = $request_params['address'];
	
	
// 	$city = $request_params['city'];
	
	
// 	$pincode = $request_params['pincode'];
	
	
// 	$district = $request_params['district'];
	
	
// 	$state = $request_params['state'];
	
	
	
// 	//		echo $name.$email.$sexSelected.$dob.$mobileno.$address.$city.$pincode.$district.$state;
	
	
	
// 	global $user_id;
	
	
// 	$db = new loginHandler();
	
	
	
// 	// 	creating new Family Member
// 	$user = $db->editProfile($user_id,$name,$email,$sexSelected,$dob,$mobileno,$address,$city,$pincode,$district,$state);
	
	
// 	//p	rint_r $result;
	
	
// 	if ($user)
// 	{
		
		
// 		$response["error"] = false;
		
		
		
// 	}
	
	
// 	else
// 	{
		
		
// 		// 		unknown error occurred
// 		$response['error'] = true;
		
		
// 		$response['message'] = "An error occurred. Please try again";
		
		
// 	}
	
	
	
// 	echoRespnse(200, $response);
	
	
	
// }

// );




function verifyRequiredParams($required_fields)
{
	
	
	$error = false;
	
	
	$error_fields = "";
	
	
	$request_params = array();
	
	
	$request_params = $_REQUEST;
	
	
	// 	Handling PUT request params
	if ($_SERVER['REQUEST_METHOD'] == 'PUT' || $_SERVER['REQUEST_METHOD'] == 'POST')
	{
		
		
		$app = \Slim\Slim::getInstance();
		
		
		// 		parse_str($app->request()->getBody(), $request_params);
		
		
		$request_params = json_decode($app->request()->getBody(), true);
		
		
	}
	
	
	
	foreach ($required_fields as $field)
	{
		
		
		if (!isset($request_params[$field]))// 		|| strlen(trim($request_params[$field])) <= 0)
		{
			
			
			$error = true;
			
			
			$error_fields .= $field . ', ';
			
			
		}
		
		
	}
	
	
	
	if ($error)
	{
		
		
		// 		Required field(s) are missing or empty
		// 		echo error json and stop the app
		$response = array();
		
		
		$app = \Slim\Slim::getInstance();
		
		
		$response["error"] = true;
		
		
		$response["message"] = 'Required field(s) ' . substr($error_fields, 0, -2) . ' is missing or empty';
		
		
		echoRespnse(400, $response);
		
		
		$app->stop();
		
		
	}
	
	
}





/** * Validating email address */


function validateEmail($email)
{
	
	
	$app = \Slim\Slim::getInstance();
	
	
	if (!filter_var($email, FILTER_VALIDATE_EMAIL))
	{
		
		
		$response["error"] = true;
		
		
		$response["message"] = 'Email address is not valid';
		
		
		echoRespnse(400, $response);
		
		
		$app->stop();
		
		
	}
	
	
}





/** * Echoing json response to client * @param String $status_code Http response code * @param Int $response Json response */


function echoRespnse($status_code, $response)
{
	
	
	$app = \Slim\Slim::getInstance();
	
	
	// 	Http response code
	$app->status($status_code);
	
	
	
	// 	setting response content type to json
	$app->contentType('application/json');
	
	
	
	echo json_encode($response);
	
	
}



$app->run();



?>