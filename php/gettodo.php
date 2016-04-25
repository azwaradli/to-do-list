<?php
	$connection = mysql_connect("localhost", "root", "");
	$db = mysql_select_db("todolist", $connection);

	$data = $_GET['id'];
	$id = mysql_real_escape_string($data);

	$query = "SELECT * FROM todo WHERE id = $id";
	$result = mysql_query($query);

	if($result){
		$data = mysql_fetch_assoc($result);
	}

	echo json_encode($data);
?>