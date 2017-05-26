<?php
	include('connect.php');

	if (isset($_POST['table']))
	{
		$table = $_POST['table'];
		if ($table == 'user') 
		{
			$table = 'akun';
			searching_data($conn, $table, null);
		}
		else if ($table == 'login')
		{
			login($conn);
		}
		else if ($table == 'types')
		{
			$table = 'jenis_faktor';
			searching_data($conn, $table, null);
		}
		else if ($table == 'factor')
		{
			$table = 'faktor f, jenis_faktor jf';
			$key = 'f.id_jenis_faktor = jf.id_jenis_faktor GROUP BY f.id_jenis_faktor ORDER BY f.id_faktor DESC';
			searching_data($conn, $table, $key);
		}
		else if ($table == 'method')
		{
			$table = 'metode';
			searching_data($conn, $table, null);
		}
		else if ($table == 'holts')
		{
			$table = 'saham_holts';
			searching_data($conn, $table, null);
		}
		else if ($table == 'detail_holts')
		{
			$table = 'detail_saham_holts';
			$key = 'id_saham_holts = '.$_POST['key'];
			searching_data($conn, $table, $key);
		}
		else if ($table == 'holts_chart')
		{
			$result = $conn->query('SELECT id_saham_holts FROM saham_holts');
			$data = [];
			if($result->num_rows > 0){
				$i = 0;
				$j = 0;
				while ($row = $result->fetch_assoc()) {
					$result2 = $conn->query('SELECT * FROM detail_saham_holts WHERE id_saham_holts = '.$row['id_saham_holts']);
					if ($result2->num_rows > 0) {
						$k = 0;
						$data[$j]['label'] = "Data ".($i+1);
						while($row2 = $result2->fetch_assoc()) {
							$data[$j]['data'][$k][0] = $k+1;
							$data[$j]['data'][$k][1] = $row2['aft'];
							$k+=1;
						}
						$j+=1;
					}
					$i+=1;
				}

				if ($data)
					echo json_encode($data);
			}
		}
		else if ($table == 'generate_holts')
		{
			$data = [];
			$result = $conn->query('SELECT min(aft) AS min, max(aft) AS max FROM detail_saham_holts');
			if ($result->num_rows)
			{
				$row = $result->fetch_assoc();
				$min = $row['min']-($row['min']%100);
				$max = $row['max'];
				$data['tickMin'] = $min;
				$data['tickSize'] = (($max-$min)-(($max-$min)%100)+100)/4;
				echo json_encode($data);
			}
		}
		
	}
	else{
		die('No direct script access allowed'); 
	}

	function searching_data($conn, $table, $key)
	{
		$data = [];
		if ($key == null) 
		{
			$sql = 'SELECT * FROM ' . $table;
		}
		else
		{
			$sql = 'SELECT * FROM ' . $table . ' WHERE ' . $key;
		}
		$result = $conn->query($sql);

		if($result->num_rows > 0){
			$i = 1;
			while ($row = $result->fetch_assoc()) {
				$row['i'] = $i;
				$data[] = $row;
				$i+=1;
			}
		}
		echo json_encode($data);
	}

	function login($conn){
		$id = $_POST['id'];
		$password = $_POST['password'];

		$sql = 'SELECT * FROM akun WHERE id = ' . $id . ' AND password = "' . $password . '"';
		$result = $conn->query($sql);
		if($result->num_rows > 0){
			$sql = 'INSERT INTO login (ID) VALUES(' . $id . ')';
			$conn->query($sql);
			while($row = $result->fetch_assoc()){
				$data[] = $row;
			}
			echo json_encode($data);
		}
		else{
			echo json_encode(0);
		}
	}

?>