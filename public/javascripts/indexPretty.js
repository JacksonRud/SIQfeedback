$(document).ready( function(){
		fixCheckboxIDs();
		$('#heading').html("You are rating: \n"+document.cookie.split("=")[1]);
	});

function fixCheckboxIDs(){
	var i = 0;
	$('label').each(function(){
		var oldID = $(this).attr("for");
		var newID = oldID+"_"+i;
		$(this).attr("for", newID);
		$(this).find('input').attr("id", newID);
		i++;
	})
}

function setanswer(x,y){
	for (var i =0; i< questions.length; i++){
		if(questions[i].question == x){
			questions[i].answer = y ;
		}
	}
}
function answertox(x){
	var response = document.getElementsByName(x);
	if(response[0].type==="text"){
		var value = $('input[name="'+x+'"]').val();
		setanswer(x, value);
	} else {
		var radios = response;
		for (var i = 0; i < radios.length; i++) {
			var checked = radios[i].checked ; 
			if (checked==true) {
				setanswer(x, i +1);
			}
		}
	}
}

function putDataInFormat(classname, Data){
	var str = '{"classname" : "' + classname + '", "data" : ' ;
	var string = JSON.stringify(Data).replace(/&quot;/g, "\""); 
	str= str + string + "}";
	return JSON.parse(str);
}
function reply(){
	for (var i =0 ; i< questions.length; i++) {
		answertox(questions[i].question);
	}
	var Data=  putDataInFormat(document.cookie.split("=")[1],questions); 
	$.ajax({
		type: "POST",
		url: "/database/sendfeedback",
		data: Data,
		success: function(){window.location.href = "/thankyou"; },
		dataType: "JSON"
	});
	
}
