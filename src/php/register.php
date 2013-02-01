<?php

include './login.php';


$email = $_POST['login'];
$num = strpos($email, "@");
$username = substr($email, 0, $num);
$password = $_POST['password'];
$password2 = $_POST['password2'];
$sex = $_POST['sex'];
if ($password !== $password2) {
	return json_encode(array('status' => false, 'error' => "passwords", 'message' => "Passwords do not match, please try again."));
	die();
} else {
	$link = connect_to_mysql();
	if ($link) {
		$sqlquery = "INSERT INTO users (email, username, password, sex) VALUES ('$email','$username', '$password', '$sex')";
		$insert = mysql_query($sqlquery);
		if ($insert) {
			$loginattempt = json_decode(login($username, $password));
			if ($loginattempt->{'status'} === true) {
				return  json_encode(array('status' => true, 'message' => "Logged in user: ".$username, 'user' => $username));
			} else {
				return  json_encode(array('status' => false, 'error' => "loginfailure", 'message' => "Login Failed."));
			}
		} else {
			return json_encode(array('status' => false, 'error' => "registrationfailure", 'message' => mysql_error()));
		}
	}
}
?>
