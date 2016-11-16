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
	
	public function createUser($email, $password ,$view)
	{
		
		require_once '../../../api/includes/passHash.php';
		
		$response = array();
		
		// 		First check if user already existed in db
		if (!$this->isUserExists($email))
		{
			
			// 			Generating password hash
			$password_hash = PassHash::hash($password);
			
			// 			Generating API key
			$api_key = $this->generateApiKey();
			
			// 			insert query
			if($view=="Employer")
			{
				
				$isQueryExecuted=$this->conn->insert("users",["EMAIL"=>$email,"PASSWORD_HASH"=>$password_hash,"API_KEY"=>$api_key,"ROLE_ID"=>"2"]);
				
			}
			
			
			else
			{
				
				$isQueryExecuted=$this->conn->insert("users",["EMAIL"=>$email,"PASSWORD_HASH"=>$password_hash,"API-KEY"=>$api_key,"ROLE_ID"=>"1"]);
				
			}
			
			
			// 			Check for successful insertion
			if($isQueryExecuted)
			{
				
				$response['status']=USER_CREATED_SUCCESSFULLY;
				
				$response['apiKey'] = $api_key;
				
			}
			
			else {
				
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
	
	
	
	
	public function editProfile($user_id,$name,$email,$sexSelected,$dob,$mobileno,$address,$city,$pincode,$district,$state)
	{
		
		
		
		//$		userName=$this->getNameById($user_id);
		
		
		
		echo "\n".$name.$email.$sexSelected.$dob.$mobileno.$address.$city.$pincode.$district.$state;
		
		
		
		
		$stmt = $this->conn->prepare("UPDATE `tms_users` SET `name`=?,`email`=?,`modified_by`=?,`modified_at`=now() WHERE id=?");
		
		
		
		$stmt->bind_param("ssii",$name,$email,$user_id,$user_id);
		
		
		
		$stmt->execute();
		
		
		
		$num_affected_rows = $stmt->affected_rows;
		
		
		
		echo $num_affected_rows;
		
		
		
		if($num_affected_rows)
		{
			
			
			
			$stmt = $this->conn->prepare("UPDATE `tms_user_personal_info` SET `gender`=?,`mobileno`=?,`address`=?,`city`=?,`district`=?,`pincode`=?,`state`=?,`dob`=?,`modifiedby`=?,`modifieddate`=now() WHERE userid=?");
			
			
			
			$stmt->bind_param("ssssssssii",$sexSelected,$mobileno,$address,$city,$district,$pincode,$state,$dob,$user_id,$user_id);
			
			
			
			$stmt->execute();
			
			
			
			$num_affected_rows = $stmt->affected_rows;
			
			
			
			echo "\n".$num_affected_rows;
			
			
			
		}
		
		
		
		$stmt->close();
		
		
		
		return $num_affected_rows > 0;
		
		
		
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
	
	
	
	
	// public function getStudentAll()
	// {
		
		
		
	// 	$query1="SELECT id,name FROM tms_students";
		
		
		
	// 	$result1=mysqli_query($this->conn,$query1) or die("cud not run first query1".mysql_error());
		
		
		
	// 	if($result1)
	// 	{
			
			
			
	// 		// 			$user=mysqli_fetch_assoc($result1);
			
			
			
	// 		mysqli_close($this->conn);
			
			
			
	// 		return $result1;
			
			
			
	// 	}
		
		
		
	// 	else
	// 	{
			
			
			
	// 		return NULL;
			
			
			
	// 	}
		
		
		
	// }
	
	
	
	
	
	
	
	// public function getAllQuestion()
	// {
		
		
		
	// 	$query1="SELECT `id`,CONCAT(`id`, '. ', `question`) as question FROM `tms_questions` WHERE 1";
		
		
		
	// 	$result1=mysqli_query($this->conn,$query1) or die("cud not run first query1".mysql_error());
		
		
		
	// 	if($result1)
	// 	{
			
			
			
	// 		// 			$user=mysqli_fetch_assoc($result1);
			
			
			
	// 		// 			mysqli_close($this->conn);
			
			
			
	// 		return $result1;
			
			
			
	// 	}
		
		
		
	// 	else
	// 	{
			
			
			
	// 		return NULL;
			
			
			
	// 	}
		
		
		
	// }
	
	
	
	
	
	
	// public function getIndConDet($stdId,$qId)
	// {
		
		
		
	// 	$query1="SELECT tms_c.id,tms_c.con_q_id, tms_c.assigned_date, tms_c.isCompleted, tms_c.completed_date, tms_c.assignmentTypeId, tms_c.comment, tms_u1.name as assigned_by, tms_c.created_at FROM tms_counsel as tms_c,tms_users as tms_u1 WHERE tms_c.created_by=tms_u1.id and tms_c.std_id=".$stdId." and tms_c.con_q_id= ".$qId;
		
		
		
	// 	$result1=mysqli_query($this->conn,$query1) or die("cud not run first query2".mysql_error());
		
		
		
	// 	if($result1)
	// 	{
			
			
			
	// 		// 			$user=mysqli_fetch_assoc($result1);
			
			
			
	// 		// 			mysqli_close($this->conn);
			
			
			
	// 		return $result1;
			
			
			
	// 	}
		
		
		
	// 	else
	// 	{
			
			
			
	// 		return NULL;
			
			
			
	// 	}
		
		
		
	// }
	
	
	
	
	
	
	
	
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
		
		
		$data=$this->conn->select("users","API_KEY", [
		"EMAIL" => $email
		]);
		
		
		
		
		
		if(count($data)>0)
		{
			
			
			
			
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
	
	
	
	

	
	
	

	
	
	
	
	
	
	/**     * Fetching user by email     * @param String $email User email id     */
	
	
	
	// public function feedback($name,$email,$feedback)
	// {
		
		
		
	// 	$result1=$this->conn->prepare("INSERT INTO `feedback`(`Name`, `Email`, `Message`) VALUES (?,?,?)");
		
		
		
	// 	$result1->bind_param('sss',$name,$email,$feedback);
		
		
		
	// 	$result1->execute();
		
		
		
	// 	$this->send_mail1($name,$email,$feedback);
		
		
		
	// 	return true;
		
		
		
	// }
	
	

	/**     * Generating random Unique MD5 String for user Api key     */
	
	
	
	private function generateApiKey()
	{
		
		
		
		return md5(uniqid(rand(), true));
		
		
		
	}
		
}



?>