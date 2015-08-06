$(document).ready(function(){
	beginLoop();
});

TIMEOUT = 10000;

function beginLoop(){
	var ql = "";
	var cl = "";
	var i = 0;
	var textDisplayInterval;
	var textarr;
	setTimeout(function(){
		setIntervalAndExecute(function(){
			clearInterval(textDisplayInterval);
			$.getJSON('database/endfeedback' , function( data ) {
				var items = [];
					$.each( data, function( key, val ) {
					    items.push(val); 
					});
				classAnswers = fixAllData(items);
				cl = [];
				for(var k in classAnswers)cl.push(k);
				$('#heading').html("Comments for: "+cl[i]);
				textarr = createAnswerArray(cl[i], questions[2].question);
				i = (i+1)%(cl.length);
				pageChange(cl.length);
			});	
			textDisplayInterval = setInterval(function(){
				fadeoutText();
				j = Math.floor(Math.random()*textarr.length);
				setTimeout(function(){ 
					fadeinText(textarr[j]); 
				}, 400);
			}, 1500);
		}, TIMEOUT);
	}, 2000);
}



function setIntervalAndExecute(fn, t) {
	fn();
	return(setInterval(fn, t));
}


function pageChange(nClasses){
	setTimeout( function(){
		window.location.href = "/endgraphs";
	}, TIMEOUT*(nClasses+1));
}

function fadeinText(str){
	$("#textRes").html(str);
	$("#textResP").removeClass("invis");
}
function fadeoutText(){
	$('#textResP').addClass("invis");
}

/* HELPERS */
function isDefined(x){
	var undefined;
	return x !== undefined;
	}
function fixData(jso){
	var fixed = {};
	fixed.classname=jso.classname;
	fixed.data = [];
	var temp = {};
	var i = 0;
	temp.question = jso["data["+i+"][question]"];
	while(isDefined(temp.question)){
		temp.type = jso["data["+i+"][type]"];
		temp.answer = jso["data["+i+"][answer]"];
		var send = JSON.parse(JSON.stringify(temp));
		fixed.data.push(send);
		i++;
		temp.question = jso["data["+i+"][question]"]
	}
	return fixed
	}
function fixAllData(it){
	outArr = [];
	for(var i =0; i<it.length; i++){
		outArr.push(fixData(it[i]));
			}
		return parseByClass(outArr);
	}
function parseByClass(it){	
	var cock = {};
	for( var i = 0; i < it.length; i++){
		var response=it[i];
		if (!isDefined(cock[""+response.classname])){
			cock[""+response.classname] = [];
			}	
		cock[""+response.classname].push(response.data);
		}
	return cock;
	}

function createAnswerArray(className, questionName){
    var answerArray = []; 
    for(var i = 0; i< classAnswers[className].length; i++){ // for all the people 
        for(var j=0; j< classAnswers[className][i].length; j++){ // look at all the questions they answered
            if (classAnswers[className][i][j].question === questionName){ // if the question is the one we are interested in...
                    answerArray.push(classAnswers[className][i][j].answer);
            }
        } 
    }
        return answerArray;
}
