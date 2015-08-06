$(document).ready(function(){
	fixLabels();
});

$('#sub').on("mousedown", function(){
    $(this).css("background-color", "rgba(100, 100, 255, 0.5)");
    $(this).css("border", "5px solid rgba(100, 100, 100, 0.5)");
    $(this).css("color", "rgba(0,0,0, 0.5)");  
})
$('#sub').on("mouseup", function(){
    $(this).css("background-color", "rgba(100, 100, 200, 0.5)")
    $(this).css("border", "5px solid rgba(100, 100, 255, 0.5)")
    $(this).css("color", "rgba(255, 255, 255, 0.5)")
    
})
$('#sub').on("touchstart", function(){
    $(this).css("background-color", "rgba(100, 100, 255, 0.5)");
    $(this).css("border", "5px solid rgba(100, 100, 100, 0.5)");
    $(this).css("color", "rgba(0,0,0, 0.5)");  
})
$('#sub').on("touchend", function(){
    $(this).css("background-color", "rgba(100, 100, 200, 0.5)")
    $(this).css("border", "5px solid rgba(100, 100, 255, 0.5)")
    $(this).css("color", "rgba(255, 255, 255, 0.5)")
    
})

function fixLabels(){
	$("label").each(function(index){
		var oldID = $(this).attr("for");
		var newID = oldID+index;
		$(this).attr("for", newID);
		$(this).find("input").attr("id", newID);
	});
}

function setanswer(x,y){
    for (var i =0; i< questions.length; i++){
         if(questions[i].question == x){
             questions[i].answer = y ;
            
         }
     }
 }


function answertox(x){

    var response = document.getElementsByName(x)
    if(response[0].type==="text"){
         var value = response[0].value
         setanswer(x, value);
     }
    else{
        console.log(x);
         console.log("is of type scale")
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
         if(questions[i].answer === ""){
            window.alert("Please finish the survey.");
            return;
         }
         }

     var Data=  putDataInFormat("Conference",questions); 

    $.ajax({
        type: "POST",
        url: "/database/endsendfeedback",
        data: Data,
        success: function(){window.location.href = "/endthankyou";},
        dataType: "JSON"
    });

 }
