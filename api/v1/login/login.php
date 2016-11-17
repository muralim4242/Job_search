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
	verifyRequiredParams(array('EMAIL', 'PASSWORD','VIEW'));
	
	
	
	$response = array();
	
	
	
	$request_params = json_decode($app->request()->getBody(), true);
	

	
	
	validateEmail($request_params['EMAIL']);
	
	
	$db = new loginHandler();
	
	
	$res=array();
	
	

	$res = $db->createUser($request_params);
	
	
	if ($res['status'] == USER_CREATED_SUCCESSFULLY)
	{
		
		
		$response["error"] = false;
		
		
		
		
		
		$response["message"] = "You are successfully registered";
		
		
		$response['apiKey'] = $res['apiKey'];
		$response['view']=$res['view'];
		
		
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
				$response['view']=$user[2];
				
				
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



//employer


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


$app->post('/update_employer','authenticate',function() use ($app)
{
    	$response = array();
	
	
	$request_params = json_decode($app->request()->getBody(), true);
	
	
	$employer_name = $request_params['employer_name'];
	
	
	$telephone = $request_params['telephone'];
    
    global $user_id;
	
	$db = new loginHandler();

    	$res= $db->update_employer($user_id,$employer_name,$telephone);
	
	
	
	if ($res)
	{
		
		
		$response["error"] = false;
		
		
		
		
		/*  $response['id'] = $user['id'];                            $response['apiKey'] = $user['api_Key'];                            $response['created_at'] = $user['created_at'];*/
		
		
		$response['message'] = "Employer record updated successfully";
		
		
	}
	
	
	else
	{
		
		
		// 		unknown error occurred
		$response['error'] = true;
		
		
		$response['message'] = "An error occurred. Please try again";
		
		
	}
	
	
	
	echoRespnse(200, $response);
	
});




// job post

//get all post

$app->get('/getAllPost', 'authenticate', function() use ($app)
{
	
	
	
	$response = array();
	
	
	
	global $user_id;
	
	
	$db = new loginHandler();
	
	
	
	// 	creating new Family Member
	$getAllJobPost = $db->getAllJobPost();
	
	
	
	//p	rint_r $result;
	
	
	if ($getAllJobPost)
	{
		
		
		$response["error"] = false;
		
		
	
		
		$response["jobPosts"]=array();
		
		
		// 		$response["indStdDets"]=array();
	//	print_r($getAllJobPost);
		foreach ($getAllJobPost as $key => $value) {
				array_push($response["jobPosts"], $value);
		}
		
		
		}
		
	
	
	
	else
	{
		
		
		// 		unknown error occurred
		$response['error'] = true;
		
		
		$response['message'] = "An error occurred. Please try again";
		
		
	}
	
	
	
	echoRespnse(200, $response);
	
	
	
}

);


$app->get('/getIndPost/:postId', 'authenticate', function($postId) use ($app)
{
	
	
	
	$response = array();
	
	
	
	global $user_id;
	
	
	$db = new loginHandler();
	
	
	
	// 	creating new Family Member
	$getIndJobPost = $db->getIndJobPost($postId);
	
	
	
	//p	rint_r $result;
	
	
	if ($getIndJobPost)
	{
		
		
		$response["error"] = false;
		
		
	
		
		$response["getIndJobPost"]=$getIndJobPost[0];
		
	
		
		}
		
	
	
	
	else
	{
		
		
		// 		unknown error occurred
		$response['error'] = true;
		
		
		$response['message'] = "An error occurred. Please try again";
		
		
	}
	
	
	
	echoRespnse(200, $response);
	
	
	
});


$app->get('/getAllPostRelToEmp', 'authenticate', function() use ($app)
{
	
	
	
	$response = array();
	
	
	
	global $user_id;
	
	
	$db = new loginHandler();
	$employerId=$db->getEmployerId($user_id);
	
	
	// 	creating new Family Member
	$getAllJobPost = $db->getAllJobPostRelToEmp($employerId);
	
	
	
	//p	rint_r $result;
	
	
	if ($getAllJobPost)
	{
		
		
		$response["error"] = false;
		
		
	
		
		$response["jobPosts"]=array();
		
		
		// 		$response["indStdDets"]=array();
	//	print_r($getAllJobPost);
		foreach ($getAllJobPost as $key => $value) {
				array_push($response["jobPosts"], $value);
		}
		
		
		}
		
	
	
	
	else
	{
		
		
		// 		unknown error occurred
		$response['error'] = true;
		
		
		$response['message'] = "An error occurred. Please try again";
		
		
	}
	
	
	
	echoRespnse(200, $response);
	
	
	
}

);






$app->post('/job_post','authenticate',function() use ($app)
{
    	$response = array();
	
	
	$db = new loginHandler();


	$request_params = json_decode($app->request()->getBody(), true);
	
	
	// $employer_name = $request_params['employer_name'];
	
	
	// $telephone = $request_params['telephone'];
    
    global $user_id;

	$employerId=$db->getEmployerId($user_id);
	
	

    	$res= $db->job_post($employerId,$request_params);
	
	
	
	if ($res)
	{
		
		
		$response["error"] = false;
		
		
		
	
		
		$response['message'] = "New Job Post Created successfully";
		
		
	}
	
	
	else
	{
		
		
		// 		unknown error occurred
		$response['error'] = true;
		
		
		$response['message'] = "An error occurred. Please try again";
		
		
	}
	
	
	
	echoRespnse(200, $response);
	
});


$app->put('/job_post_update/:jId','authenticate',function($jId) use ($app)
{
    	$response = array();
	
	
	$db = new loginHandler();


	$request_params = json_decode($app->request()->getBody(), true);
	
	

    
    global $user_id;

	
	

    	$res= $db->job_post_update($jId,$request_params);
	
	
	
	if ($res)
	{
		
		
		$response["error"] = false;
		
		
		
	
		
		$response['message'] = "New Job Post Updated successfully";
		
		
	}
	
	
	else
	{
		
		
		// 		unknown error occurred
		$response['error'] = true;
		
		
		$response['message'] = "An error occurred. Please try again";
		
		
	}
	
	
	
	echoRespnse(200, $response);
	
});

//job_seeks

$app->get("/getJobSeek(/:jSId)",'authenticate',function($jSId=null) use ($app)
{
		echo $jSId;
		$response=array();
		$db=new loginHandler();
		if($jSId)
		{
				$jobSeekers=$db->getAllJobSeekers($jSId);
			if ($jobSeekers)
	{
		
		
		$response["error"] = false;
		
		
	
		
		$response["jobSeeker"]=$jobSeekers[0];
		
		
		
		
		}
		
	
	
	
	else
	{
		
		
		// 		unknown error occurred
		$response['error'] = true;
		
		
		$response['message'] = "An error occurred. Please try again";
		
		
	}

		}
		else
		{
			$jobSeekers=$db->getAllJobSeekers(null);
			if ($jobSeekers)
	{
		
		
		$response["error"] = false;
		
		
	
		
		$response["jobSeekers"]=array();
		
		
		// 		$response["indStdDets"]=array();
	//	print_r($getAllJobPost);
		foreach ($jobSeekers as $key => $value) {
				array_push($response["jobSeekers"], $value);
		}
		
		
		}
		
	
	
	
	else
	{
		
		
		// 		unknown error occurred
		$response['error'] = true;
		
		
		$response['message'] = "An error occurred. Please try again";
		
		
	}

		}

		echoRespnse(200,$response);
});

$app->post('/job_seeker_post',function() use ($app)
{
    	$response = array();
	
	
	$db = new loginHandler();


	$request_params = json_decode($app->request()->getBody(), true);
	
	
  
	
	

    	$res= $db->job_seeker_post($request_params);
	
	
	
	if ($res)
	{
		
		
		$response["error"] = false;
		
		
		
	
		
		$response['message'] = "New Job Seeker Post Created successfully";
		
		
	}
	
	
	else
	{
		
		
		// 		unknown error occurred
		$response['error'] = true;
		
		
		$response['message'] = "An error occurred. Please try again";
		
		
	}
	
	
	
	echoRespnse(200, $response);
	
});


$app->put('/job_seeker_post_update/:jSId',function($jSId) use ($app)
{
    	$response = array();
	
	
	$db = new loginHandler();


	$request_params = json_decode($app->request()->getBody(), true);
	
	
  
	
	

    	$res= $db->job_seeker_post_update($jSId,$request_params);
	
	
	
	if ($res)
	{
		
		
		$response["error"] = false;
		
		
		
	
		
		$response['message'] = "New Job Seeker Post Updated successfully";
		
		
	}
	
	
	else
	{
		
		
		// 		unknown error occurred
		$response['error'] = true;
		
		
		$response['message'] = "An error occurred. Please try again";
		
		
	}
	
	
	
	echoRespnse(200, $response);
	
});


//logout
$app->get('/logout','authenticate',function() use ($app)
{
    	$response = array();
	
	
	$db = new loginHandler();


	
	global $user_id;
	
	
  
	
	//	echo $user_id;

    	$res= $db->logout($user_id);
	
	
	
	if ($res)
	{
		
		
		$response["error"] = false;
		
		
		
	
		
		$response['message'] = "Successfully logged out";
		
		
	}
	
	
	else
	{
		
		
		// 		unknown error occurred
		$response['error'] = true;
		
		
		$response['message'] = "An error occurred. Please try again";
		
		
	}
	
	
	
	echoRespnse(200, $response);
	
});

//Dashboard
$app->get('/dashboard','authenticate',function()
{
	$response=array();
	$db=new loginHandler();
	$response["totalJobPosts"]=$db->total_job_posts();
	$response["totalJobSeekers"]=$db->total_job_seekers();

	echoRespnse(200,$response);
});



//internal helper functions

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