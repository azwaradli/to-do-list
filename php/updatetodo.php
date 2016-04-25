<?php
	$connection = mysql_connect("localhost", "root", "");
	$db = mysql_select_db("todolist", $connection);

	$data = json_decode(file_get_contents("php://input"));
	$id = mysql_real_escape_string($data->id);
	$title = mysql_real_escape_string($data->title);
	$desc = mysql_real_escape_string($data->desc);
	$start_date = mysql_real_escape_string($data->startdate);
	$end_date = mysql_real_escape_string($data->enddate);
	$priority = mysql_real_escape_string($data->priority);

	$query = "UPDATE todo SET title = '$title', description = '$desc', start_date = '$start_date', end_date = '$end_date', priority = '$priority' WHERE id = $id";
	$result = mysql_query($query);

	if($result){
		$response = array('message' => 'Todo successfully edited');
		echo json_encode($response);
	}
	else{
		$response = array('message' => 'Failed to edit todo');
		echo json_encode($response);
	}

?>