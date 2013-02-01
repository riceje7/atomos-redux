<?php

include 'connect_to_mysql.php';

session_start();
if (isset($_SESSION['user'])) {
  connect_to_mysql();
  $user = $_SESSION['user'];
  $query = "SELECT gamedata FROM users WHERE username = '$user'";
  $result = mysql_query($query) or die(mysql_error());
  if (mysql_num_rows($result) === 1) {
    $row = mysql_fetch_assoc($result);
    echo json_encode(array('status' => true, 'message' => "User Data Loaded", 'data' => $row));
    die();
  }
} else {
  echo json_encode(array('status' => false));
  die();
}
?>
