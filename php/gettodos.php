<?php
	$connection = mysql_connect("localhost", "root", "");
	$db = mysql_select_db("todolist", $connection);

	$query = "SELECT * FROM todo";
	$result = mysql_query($query);

	$data = array();

	if($result){
		while($row = mysql_fetch_assoc($result)){
			$data[] = $row;
		}

		echo json_encode($data);
	}
?>