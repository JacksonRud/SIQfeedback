$('.listItem').on( "mousedown", function(){
	$(this).css("background", "rgba(0, 0, 200, 0.5)");
});
$('.listItem').on( "mouseup", function(){
	$(this).css("background", "linear-gradient(to bottom, rgba(0, 0, 200, 0.5), rgba(0, 0, 50, 0.5))");
});

$('.listItem').on( "touchstart", function(){
	$(this).css("background", "rgba(0, 0, 200, 0.5)");
});

$('.listItem').on( "touchend", function(){
	$(this).css("background", "linear-gradient(to bottom, rgba(0, 0, 200, 0.5), rgba(0, 0, 50, 0.5))");
});
