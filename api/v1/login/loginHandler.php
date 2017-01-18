<?php
// include("../../includes/PHPMailer-master/class.phpmailer.php");







/** * Class to handle all db operations * This class will have CRUD methods for database tables * */



class loginHandler
{



	private $conn;




	function __construct()
	{




		require_once '../../../api/includes/dbConnect.php';



		// 		opening db connection
		$db = new DbConnect();



		$this->conn = $db->connect();



	}







	/* ------------- `users` table method ------------------ */







	/**     * Creating new user     * @param String $name User full name     * @param String $email User login email id     * @param String $password User login password     */

	public function createUser($user)
	{
		//print_r($user);
		require_once '../../../api/includes/passHash.php';

		$response = array();

		// 		First check if user already existed in db
		if (!$this->isUserExists($user["EMAIL"]))
		{

			// 			Generating password hash
			$password_hash = PassHash::hash($user["PASSWORD"]);

			// 			Generating API key
			$api_key = $this->generateApiKey();
			$view=$user["VIEW"];
			// 			insert query
			if($user["VIEW"]=="Employer")
			{
		//		echo "hai";
				$user["API_KEY"]=$api_key;
				$user["ROLE_ID"]=2;
				$user["PASSWORD_HASH"]=$password_hash;
				unset($user["PASSWORD"]);
				unset($user["VIEW"]);
			//	print_r($user);
				$isQueryExecuted=$this->conn->insert("users",$user);

			}


			else if($user["VIEW"]=="Admin")
			{
	//			echo "hai2";
				$user["API_KEY"]=$api_key;
				$user["ROLE_ID"]=1;
				$user["PASSWORD_HASH"]=$password_hash;
				unset($user["PASSWORD"]);
				unset($user["VIEW"]);
				//print_r($user);
				$isQueryExecuted=$this->conn->insert("users",$user);
			}
			else {
				$user["API_KEY"]=$api_key;
				$user["ROLE_ID"]=3;
				$user["PASSWORD_HASH"]=$password_hash;
				$user["STATUS"]=0;
				unset($user["PASSWORD"]);
				unset($user["VIEW"]);
				//print_r($user);
				$isQueryExecuted=$this->conn->insert("users",$user);
			}


			// 			Check for successful insertion
			if($isQueryExecuted)
			{
			//	echo "hai3";
				$response['status']=USER_CREATED_SUCCESSFULLY;

				$response['apiKey'] = $api_key;
				$response['view']=$view;

			}

			else {

					//echo "hai4";

				$response['status']=USER_CREATE_FAILED;

			}

			return $response;

		}

		else
		{

			$response['status']=USER_ALREADY_EXISTED;

			return $response;

		}

	}







	public function isValidApiKey($api_key)
	{


        $data=$this->conn->select("users","ID", [
		"API_KEY" => $api_key
		]);
		return count($data)?true:false;



	}







	/**     * Checking user login     * @param String $id User login  id     * @param String $password User login password     * @return boolean User login status success/fail     */




	public function checkLogin($email, $password)
	{

        $data=$this->conn->select("users","PASSWORD_HASH", [
		"EMAIL" => $email
		]);






		if (count($data) > 0)
		{






			if (PassHash::check_password($data[0], $password))
			{


				// 				User password is correct
				return TRUE;



			}


			else
			{



				// 				user password is incorrect
				return FALSE;



			}



		}


		else
		{




			// 			user not existed with the email
			return FALSE;



		}



	}







	/**     * Checking for duplicate user by email address     * @param String $email email to check in db     * @return boolean     */



	private function isUserExists($email)
	{



		$data=$this->conn->select("users","ID", [
		"EMAIL" => $email
		]);



		return count($data);



		// 		$this->conn->select
		// 		$stmt = $this->conn->prepare("SELECT id from tms_users WHERE email = ?");



		// 		$stmt->bind_param("s", $email);



		// 		$stmt->execute();



		// 		$stmt->store_result();



		// 		$num_rows = $stmt->num_rows;



		// 		$stmt->close();



		// 		return $num_rows > 0;





	}




	public function viewProfile($user_id)
	{



		$query1="SELECT u.id,u.name,u.email,uPI.`gender` as sexSelected, uPI.`mobileno`, uPI.`address`, uPI.`city`, uPI.`district`, uPI.`pincode`, uPI.`state`, uPI.`dob` FROM tms_users as u, `tms_user_personal_info` as uPI WHERE u.id='".$user_id."' and u.id=uPI.userid";



		$result1=mysqli_query($this->conn,$query1) or die("cud not run first query1".mysql_error());



		if($result1)
		{



			$user=mysqli_fetch_assoc($result1);



			mysqli_close($this->conn);



			return $user;



		}



		else
		{



			return NULL;



		}



	}








	public function getAllFranchiesies()
	{
		$result1=$this->conn->select("franchesies",["[>]users" => ["U_ID" => "ID"]],"*",["franchesies.DELETE_FL"=>false]);
		if($result1)
		{
			return $result1;
		}
		else
		{
			return NULL;
		}
	}


	public function getAllJobPost()
	{
		$result1=$this->conn->select("employers_post","*",["DELETE_FL"=>false]);
		if($result1)
		{
			return $result1;
		}
		else
		{
			return NULL;
		}
	}

	public function getAllJobPostRelToEmp($employerId)
	{





		$result1=$this->conn->select("employers_post","*",["AND"=>["E_ID"=>$employerId,"DELETE_FL"=>false]]);



		if($result1)
		{




			return $result1;



		}



		else
		{



			return NULL;



		}



	}


	public function getIndJobPost($postId)
	{





		$result1=$this->conn->select("employers_post","*",["ID"=>$postId]);



		if($result1)
		{




			return $result1;



		}



		else
		{



			return NULL;



		}



	}


		public function getEmployerId($userId)
	{





		$result1=$this->conn->select("employers","ID",["U_ID"=>$userId]);



		if($result1)
		{




			return $result1[0];



		}



		else
		{



			return NULL;



		}



	}



	public function job_post($employerId,$post)
	{
		 $post["E_ID"]=$employerId;
		return $this->conn->insert("employers_post",$post);

	}

	public function job_post_update($postId,$updatedPost)
	{
		return $this->conn->update("employers_post",$updatedPost,["ID"=>$postId]);
	}

	public function job_post_delete($postId)
	{
		return $this->conn->update("employers_post",["DELETE_FL"=>true],["ID"=>$postId]);
	}

	public function UpdateUserStatus($uId,$status)
	{
		return $this->conn->update("users",["STATUS"=>$status],["ID"=>$uId]);
	}











	/**     * Fetching user by email     * @param String $email User email id     */

	public function updateApiKey($email)
    {
        $api_key = $this->generateApiKey();
        if ($this->isValidApiKey($api_key)) {
            $this->conn->update("users",["API_KEY"=>$api_key,"#MODIFIED_AT"=>"NOW()"],[
							"EMAIL" => $email
							]);
        } else {
             $this->conn->update("users",["API_KEY"=>$api_key,"#MODIFIED_AT"=>"NOW()"],[
							 "EMAIL" => $email
							 ]);
        }

        return true;


        //$this->conn->update()
    }

	public function getUserByEmail($email)
	{


		$data=$this->conn->get("users",["API_KEY","ROLE_ID","STATUS"], [
		"EMAIL" => $email
		]);





		if(count($data)>0)
		{

		//	print_r($data);
			if($data['ROLE_ID']==1)
		{
			$data["view"]="Admin";
		}
		else if($data['ROLE_ID']==2)
		{
			$data["view"]="Employer";
		}
		else {
				$data["view"]="Franchiesies";
		}

			return $data;



		}



		else
		{



			return NULL;



		}



	}

    public function add_employer($user_id,$employer_name,$telephone)
    {
         if($this->conn->insert("employers",["U_ID"=>$user_id,"NAME"=>$employer_name,"TELEPHONE"=>$telephone]))
        {
                return true;
        }
        else {
            return false;
        }
    }

		public function add_Franchiesies($user_id,$employer_name,$telephone)
    {
         if($this->conn->insert("franchesies",["U_ID"=>$user_id,"NAME"=>$employer_name,"TELEPHONE"=>$telephone]))
        {
                return true;
        }
        else {
            return false;
        }
    }

    //contact us form detail
	 public function contact_us($contactus)
    {
         if($this->conn->insert("contactus",$contactus))
        {
                return true;
        }
        else {
			echo $this->conn->last_query();
            return false;
        }
    }

	//Get Contact Form Details
	public function get_contact_us()
	{
		$result1=$this->conn->select("contactus","*");
		if($result1)
		{
			return $result1;
		}
		else
		{
			return NULL;
		}
	}


	public function update_employer($user_id,$employer_name,$telephone)
    {
         if($this->conn->update("employers",["NAME"=>$employer_name,"TELEPHONE"=>$telephone],["U_ID"=>$user_id]))
        {
                return true;
        }
        else {
            return false;
        }
    }


	//job seekers
	public function getAllJobSeekers($jSId)
	{
		if($jSId)
		{
		//	echo $jSId;
			$response=$this->conn->select("job_seekers","*",["AND"=>["DELETE_FL"=>false,"ID"=>$jSId]]);
			if($response)
			{
				return $response;
			}
			else {
				return false;
			}
		}
		else {
			$response=$this->conn->select("job_seekers","*");
			if($response)
			{
				return $response;
			}
			else {
				return false;
			}
		}
	}

	public function getJobSeekerbyMobNo($mobNo)
	{
			$response=$this->conn->select("job_seekers","*",["TELEPHONE"=>$mobNo]);
			if($response)
			{
				return $response;
			}
			else {
					return false;
			}
	}

	public function apply_for_post($detail)
	{
			return $this->conn->insert("applied_post",$detail);
	}
	public function direct_upload($detail)
	{
			return $this->conn->insert("directupload",$detail);
	}

	public function isSeekerAppliedForPost($jSId,$postId)
	{
		if($this->conn->has("applied_post",["AND" => ["JSID"=>$jSId,"PID"=>$postId]]))
		{
			return true;
		}
		else {
				return false;
		}
	}

	public function job_seeker_post($jobSeeker)
	{
		$file=$jobSeeker["file"];
		$fileExtention=$jobSeeker["fileExtention"];
		if(!$jobSeeker["directUpload"]){
			$PID=$jobSeeker["PID"];
		}
		unset($jobSeeker["file"]);
		unset($jobSeeker["fileExtention"]);
		unset($jobSeeker["PID"]);
		unset($jobSeeker["isProfilePresent"]);
		$res=$this->conn->insert("job_seekers",$jobSeeker);
		$max=$this->conn->max("job_seekers","ID");
		$data = base64_decode(preg_replace('#^data:application/\w+;base64,#i', '', $file));
		file_put_contents('../../../app/assets/job-seekers-resume/'.$max.'.'.$fileExtention,$data);
		$this->conn->update("job_seekers",["RESUME_LOCATION"=>'app/assets/job-seekers-resume/'.$max.'.'.$fileExtention],["ID"=>$max]);
		if(!$jobSeeker["directUpload"]){
		return $this->apply_for_post(array('JSID' =>$max ,'PID'=>$PID ));
		}else{
			return $this->direct_upload(array('candidateId' =>$max));
		}
	}


	public function job_seeker_post_update($jSId,$jobSeeker)
	{
		return $this->conn->update("job_seekers",$jobSeeker,["ID"=>$jSId]);
	}




	/**     * Fetching user by id     * @param String $id User id id     */



	public function getUserById($id)
	{



		$query1="SELECT u.id, u.api_Key, u.created_at FROM tms_users as u WHERE u.id = '".$id;



		$result1=mysqli_query($this->conn,$query1) or die("cud not run first query1".mysql_error());



		if($result1)
		{



			$user=mysqli_fetch_assoc($result1);



			mysqli_close($this->conn);



			return $user;



		}



		else
		{



			return NULL;



		}



	}








	/**     * Fetching user api key     * @param String $user_id user id primary key in user table     */



	public function getApiKeyById($user_id)
	{



		$query1="SELECT api_Key FROM tms_users WHERE id ='".$user_id."'";



		$result1=mysqli_query($this->conn,$query1) or die("cud not run first query1".mysql_error());



		if($result1)
		{



			$user=mysqli_fetch_assoc($result1);



			mysqli_close($this->conn);



			return $user['api_Key'];



		}






		/* $stmt = $this->conn->prepare("SELECT api_Key FROM users WHERE id = ?");        $stmt->bind_param("i", $user_id);        if ($stmt->execute())		{            $api_key = $stmt->get_result()->fetch_assoc();            $stmt->close();            return $api_key['api_Key'];        }  */



		else
		{



			return NULL;



		}



	}







	/**     * Fetching user id by api key     * @param String $api_key user api key     */



	public function getUserId($api_key)
	{

        $data=$this->conn->select("users",'ID',["API_KEY"=>$api_key]);

        return $data[0];

	}


	//dashboard
	public function total_job_posts()
	{
		return $this->conn->count("employers_post");
	}

	public function total_job_seekers()
	{
		return $this->conn->count("job_seekers");
	}

	 public function total_requested_contacts($value='')
	{
		return $this->conn->count("contactus");
	}

	public function logout($user_id)
	{
		//	echo $user_id;
		return $this->conn->update("users",["API_KEY"=>null],["ID"=>$user_id]);
	}



	/**     * Generating random Unique MD5 String for user Api key     */



	private function generateApiKey()
	{



		return md5(uniqid(rand(), true));



	}

}



?>
