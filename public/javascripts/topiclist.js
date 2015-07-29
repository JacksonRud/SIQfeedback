$('.listItem').on( "touchstart", function(event){
	$(this).css("background", "rgba(0, 0, 200, 0.5)");
	document.cookie = "classname="+$(this).attr("classname");
	window.location.href = "/pretty"
});

$('.listItem').on( "click", function(event){
	$(this).css("background", "rgba(0, 0, 200, 0.5)");
	document.cookie = "classname="+$(this).attr("classname");
	window.location.href = "/pretty"

});

$('.listItem').on( "touchend", function(){
	$(this).css("background", "linear-gradient(to bottom, rgba(0, 0, 200, 0.5), rgba(0, 0, 50, 0.5))");
});

