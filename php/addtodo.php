<?php
	$connection = mysql_connect("localhost", "root", "");
	$db = mysql_select_db("todolist", $connection);

	$data = json_decode(file_get_contents("php://input"));
	$title = mysql_real_escape_string($data->title);
	$desc = mysql_real_escape_string($data->desc);
	$start_date = mysql_real_escape_string($data->startdate);
	$end_date = mysql_real_escape_string($data->enddate);
	$priority = mysql_real_escape_string($data->priority);

	$query = "INSERT INTO todo (title, description, start_date, end_date, priority) VALUES ('$title', '$desc', '$start_date', '$end_date', '$priority')";
	$result = mysql_query($query);

	if($result){
		$response = array('message' => 'New todo successfully added');
		echo json_encode($response);
	}
	else{
		$response = array('message' => 'Failed to add new todo');
		echo json_encode($response);
	}

?>