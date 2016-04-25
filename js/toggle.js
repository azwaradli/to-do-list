$(document).ready(function(){
	$(".search-button").nextUntil(".add-button").hide();
	$(".search-button").click(function(){
		$(".search-bar").slideToggle();
	});

	$(".todo-button").before().hide();
});
