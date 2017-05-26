<?php
	if (basename($_SERVER['PHP_SELF']) == basename(__FILE__)) { 
		die('No direct script access allowed'); 
	}
	$servername = "localhost";
	$username = "root";
	$password = "";
	$dbname = "spps";

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	}

?>