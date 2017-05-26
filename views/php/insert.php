<?php
	include('connect.php');

	if (isset($_POST['table']) && $_POST['table'] == 'user')
	{
	    $password = $_POST['password'];
	    $name = ucwords($_POST['name']);

	    $sql = 'INSERT INTO akun (NAMA, PASSWORD) VALUES("'.$name.'", "'.$password.'")';
	    $result = $conn->query($sql);
	    if($result)
	    {
	    	echo json_encode('Data berhasil dimasukkan');
	    }
	    else
	    {
	    	echo json_encode('Data gagal dimasukkan');
	    }
	}
	else if (isset($_POST['table']) && $_POST['table'] == 'types')
	{
	    $name = ucwords($_POST['name']);
	    $sql = 'SELECT * FROM jenis_faktor WHERE NAMA_JENIS_FAKTOR = "'.$name.'"';
	    $result = $conn->query($sql);
	    if ($result->num_rows > 0) 
	    {
	    	echo json_encode('Data telah ada. Data gagal dimasukkan');
	    }
	    else
	    {
	    	$sql = 'INSERT INTO jenis_faktor (NAMA_JENIS_FAKTOR) VALUES("'.$name.'")';
		    $result = $conn->query($sql);
		    if($result)
		    {
		    	echo json_encode('Data berhasil dimasukkan');
		    }
		    else
		    {
		    	echo json_encode('Data gagal dimasukkan');
		    }
	    }
	}
	else if (isset($_POST['table']) && $_POST['table'] == 'method')
	{
	    $name = ucwords($_POST['name']);
	    $sql = 'SELECT * FROM metode WHERE NAMA LIKE "%'.$name.'"%';
	    $result = $conn->query($sql);
	    if ($result->num_rows > 0) 
	    {
	    	echo json_encode('Data telah ada. Data gagal dimasukkan');
	    }
	    else
	    {
	    	$sql = 'INSERT INTO metode (NAMA) VALUES("'.$name.'")';
		    $result = $conn->query($sql);
		    if($result)
		    {
		    	echo json_encode('Data berhasil dimasukkan');
		    }
		    else
		    {
		    	echo json_encode('Data gagal dimasukkan');
		    }
	    }
	}
	else if (isset($_POST['table']) && $_POST['table'] == 'holts')
	{
		$date = date('Y-m-d', strtotime($_POST['date']));
	    $actual = $_POST['actual'];
	    $prediction = $_POST['prediction'];
	    $alpha = 0.9;
	    $beta = 0.1;

	    $result = $conn->query('SELECT id_saham_holts, ft, tt FROM saham_holts ORDER BY id_saham_holts DESC LIMIT 1');
	    if($result->num_rows > 0)
	    {
	    	$row = $result->fetch_assoc();
			$i = $row['id_saham_holts']+1;
	    	$ftb = $row['ft'];
	    	$ttb = $row['tt'];
	    	$aft = $ftb + $ttb;
	    	$ft = $alpha * $actual + ((1 - $alpha) * $aft);
	    	$tt = $beta * ($ft - $ftb) + ((1 - $beta) * $ttb);
	    	$aft = $ftb + $ttb;
	    	$error = abs($actual - $aft);
	    	$ape = $error/$actual*100;
	    	$sql = 'INSERT INTO saham_holts VALUES('.$i.', "'.$date.'", '.$actual.', '.$ft.', '.$tt.', '.$aft.', '.$error.', '.$ape.')';
	    	$result = $conn->query($sql);

	    	$j = 1;
	    	while($prediction--)
	    	{
	    		$j++;
	    		$aft = $ft + ($tt * $j);
	    		$sql = 'INSERT INTO detail_saham_holts VALUES("", '.$i.', '.$aft.')';
	    		$conn->query($sql);
	    	}
	    }
	    else
	    {
	    	$ft = $actual;
	    	$tt = 0;
	    	$error = NULL;
	    	$ape = NULL;
	    	$sql = 'INSERT INTO saham_holts VALUES(1, "'.$date.'", '.$actual.', '.$ft.', '.$tt.', NULL, NULL, NULL)';
	    	$result = $conn->query($sql);
	    }
	    if($result)
	    {
	    	echo json_encode('Data berhasil dimasukkan');
	    }
	    else
	    {
	    	echo json_encode('Data gagal dimasukkan');
	    }
	}

	else
	{
		die('No direct script access allowed'); 
	}
?>