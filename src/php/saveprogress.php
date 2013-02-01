<?php
include 'connect_to_mysql.php';
connect_to_mysql();
$data = $_POST['data'];
$user = $_POST['user'];
$sql = "UPDATE users SET gamedata='$data' WHERE username='$user'";
$result = mysql_query($sql);
if ($result) {
	return json_encode(array('status' => true));
} else {
	return json_encode(array('status' => false));
}
?>