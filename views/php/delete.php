<?php
	include('connect.php');
	if (basename($_SERVER['REQUEST_URI']) == basename(__FILE__)) 
	{ 
		die('No direct script access allowed '); 
	}


	if (!isset($_GET['key2']))
	{
		$table = $_GET['table'];
		$key = $_GET['key'];
	}
	else
	{
		$table = $_GET['table'];
		$key = $_GET['key'];
		$key2 = $_GET['key2'];
	}

	if ($table == 'user')
	{
		$sql = 'DELETE FROM akun WHERE id = "' . $key . '"';
	}
	else if ($table == 'types')
	{
		$sql = 'DELETE FROM jenis_faktor WHERE id_jenis_faktor = "' . $key . '"';
	}
	else if ($table == 'factor')
	{
		$sql = 'DELETE FROM faktor WHERE id_faktor = "' . $key . '"';
	}
	else if ($table == 'method')
	{
		$sql = 'DELETE FROM metode WHERE id_metode = "' . $key . '"';
	}
	else if ($table == 'holts')
	{
		$sql = 'DELETE FROM saham_holts WHERE id_saham_holts = "' . $key . '"';
		$conn->query($sql);
		$sql = 'CALL reset_auto_increment("detail_saham_holts")';
		$conn->query($sql);
		$sql = 'CALL reset_auto_increment("saham_holts")';
	}

	$result = $conn->query($sql);
	if ($result)
	{
		echo json_encode(1);
	}
	else
	{
		echo json_encode(0);
	}
?>