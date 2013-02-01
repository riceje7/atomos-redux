<?php
include './connect_to_mysql.php';
$login = $_POST['login'];
$password = $_POST['password'];

if(isset($_POST['action']) && !empty($_POST['action'])) {
    $action = $_POST['action'];
    switch($action) {
        case "login" : login($login, $password);break;
    }
}

function login($login, $password) {
	$link = connect_to_mysql();
	$linkdata = json_decode($link);
	if ($linkdata->{'status'} === "success") {
		$sqlquery = mysql_query("SELECT * FROM users WHERE username='$login' AND password='$password'") or die(mysql_error());
		if (mysql_num_rows($sqlquery) == 1) {
			session_start();
			$_SESSION['user'] = $login;
			echo  json_encode(array('status' => true, 'message' => "Login Successful.", 'user' => $login));
		} else {
			echo  json_encode(array('status' => false, 'error' => "loginfailure", 'message' => "The username or password you entered was incorrect, please try again."));
		}
	} else {
		echo json_encode(array('status' => false, 'error' => "connectionerror", 'message' => $linkdata->{'message'}));
	}
}
?>
