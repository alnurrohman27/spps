<?php
	include('connect.php');

	if (isset($_POST['table']) && $_POST['table'] == 'user')
	{
		$id = $_POST['id'];
	    $password = $_POST['password'];
	    $name = ucwords($_POST['name']);

	    $sql = 'UPDATE akun SET password = "'.$password.'", nama = "'.$name.'" WHERE id = "'.$id.'"';
	    $result = $conn->query($sql);
	    if ($result)
	    {
	    	echo json_encode('Data berhasil diubah');
	    }
	    else
	    {
	    	echo json_encode(0);
	    }
	}
	else if (isset($_POST['table']) && $_POST['table'] == 'types')
	{
		$id = $_POST['id'];
	    $name = ucwords($_POST['name']);

	    $sql = 'UPDATE jenis_faktor SET nama = "'.$name.'" WHERE id_jenis_faktor = "'.$id.'"';
	    $result = $conn->query($sql);
	    if ($result)
	    {
	    	echo json_encode('Data berhasil diubah');
	    }
	    else
	    {
	    	echo json_encode(0);
	    }
	}
	else if (isset($_POST['table']) && $_POST['table'] == 'factor')
	{
		$id = $_POST['id'];
	    $name = ucwords($_POST['name']);
	    $type = $_POST['type'];
	    $value = $_POST['value'];

	    $sql = 'UPDATE faktor SET nama = "'.$name.'", id_jenis_faktor = "'.$type.'", nilai = '.$value.' WHERE id_faktor = "'.$id.'"';
	    $result = $conn->query($sql);
	    if ($result)
	    {
	    	echo json_encode('Data berhasil diubah');
	    }
	    else
	    {
	    	echo json_encode(0);
	    }
	}
	else if (isset($_POST['table']) && $_POST['table'] == 'method')
	{
		$id = $_POST['id'];
	    $name = ucwords($_POST['name']);

	    $sql = 'UPDATE metode SET nama = "'.$name.'" WHERE id_metode = "'.$id.'"';
	    $result = $conn->query($sql);
	    if ($result)
	    {
	    	echo json_encode('Data berhasil diubah');
	    }
	    else
	    {
	    	echo json_encode(0);
	    }
	}
	else
	{
		die('No direct script access allowed'); 
	}
?>