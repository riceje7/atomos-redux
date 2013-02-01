<?php
include("./connect_to_mysql.php");
connect_to_mysql();
$login = $_POST['login'];
$sqlquery = mysql_query("SELECT * FROM users WHERE username='$login'") or die(mysql_error());
if (mysql_num_rows($sqlquery) == 1) {
	session_start();
	$_SESSION['user'] = $login;
	echo  json_encode(array('status' => true, 'user' => $login));
} else {
	echo  json_encode(array('status' => false));
}
?>