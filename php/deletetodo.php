<?php
	$connection = mysql_connect("localhost", "root", "");
	$db = mysql_select_db("todolist", $connection);

	$data = $_GET['id'];
	$id = mysql_real_escape_string($data);

	$query = "DELETE FROM todo WHERE id = $id";
	$result = mysql_query($query);

	if($result){
		$response = array('message' => 'Todo successfully deleted');
		echo json_encode($response);
	}
	else{
		$response = array('message' => 'Failed to delete todo');
		echo json_encode($response);
	}
?>