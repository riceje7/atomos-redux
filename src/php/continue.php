<?php

include 'connect_to_mysql.php';
$lastlevel = $_POST['level'];
if (isset($lastlevel) && $lastlevel !== 0) {
  connect_to_mysql();
  $levelname = "Now Loading ...<br/>";

  echo json_encode(array('status' => "success", 'message' => $levelname, 'level' => $lastlevel, 'url' => $url));
  die();
}
?>
