<?php

session_start();
if (isset($_SESSION['user'])) {
    echo  json_encode(array('status' => true, 'login' => $_SESSION['user']));
} else {
    echo json_encode(array('status' => false));
}
?>
