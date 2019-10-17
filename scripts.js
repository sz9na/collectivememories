$(document).ready(function() {

$("h1").mouseenter(function() {
			$(this).css("color", "teal"); // Changes all H1 elements to teal when moused over
		});
$("h1").mouseleave(function() {
			$(this).css("color", "#0D5661"); // Changes all H1 elements back to their original color ("#FFC107") when the mouse moves back out
		});




	});