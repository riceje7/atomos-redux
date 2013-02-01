<?php
function connect_to_mysql() {
	$link = mysql_connect('localhost', 'foursq5', 'aecolomjerice1024!');
	if ($link) {
		mysql_select_db("foursq5_atomos", $link);
		return json_encode(array('status' => "success", 'message' => "connected"));
	} else {
		return json_encode(array('status' => "error", 'message' => mysql_error()));
	}
}
?>
