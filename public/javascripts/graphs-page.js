$(document).ready(function(){
	beginLoop();
});
HEIGHT = 400;
WIDTH = 500;

var svgBar = d3.select('#graph')
	.attr('height', HEIGHT)
	.attr('width', WIDTH);
var vis = d3.select("#pie")
	.attr("width", WIDTH)
	.attr("height", HEIGHT)
	.append("g")
	.attr("transform", "translate("+WIDTH/2+","+HEIGHT/2+")");


function beginLoop(){
	var ql = "";
	var cl = "";
	var i = 0;
	setInterval(function(){
		$.getJSON('database/feedback' , function( data ) {
			var items = [];
				$.each( data, function( key, val ) {
				    items.push(val); 
				});
			classAnswers = fixAllData(items);
			cl = [];
			for(var k in classAnswers)cl.push(k);
			$('#heading').html("Ratings for: "+cl[i]);
			makeGraph(makeObj(tallyQuestion(classAnswers, cl[i], "q")));
			makePie(makeObj(tallyQuestion(classAnswers, cl[i], "q")));
			i = (i+1)%(cl.length);
		});	
	}, 3000);}

function makePie(ns){
	var r = 250;
	color=d3.scale.category20c();
	var vis = d3.select("#pie")
		.data(ns)
	var pie = d3.layout.pie()
		.value(function(d){return d.num;});
	var arc = d3.svg.arc()
		.outerRadius(r);
	var svg = d3.select('svg.pie');
	var arcs = vis.selectAll("g.slice")
		.data(pie);
	arcs.enter()
		.append("path")
		.attr("fill", function(d,i){return color(i);})
		.attr("d", arc);
	arcs.append("text").attr("transform", function(d){
		return "translate(" + arc.centroid(d) + ")";
	})
		.attr("text-anchor", "middle")
		.attr("dy", ".99em")
		.attr("fill", "#000")
		.style("font-weight", "bold")
		.text( function(d, i) {
			if (d.num > 0){
				return d.t;
			} else{
				return "";
			}
		});
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
function makeObj(arr){
	return [
		{"t":"ones", "num": arr[1]},
		{"t":"twos", "num": arr[2]},
		{"t":"threes", "num": arr[3]},
		{"t":"fours", "num": arr[4]},
		{"t":"fives", "num": arr[5]}
	];}
function tallyQuestion(classList, classname, qName){
	var distribution = [0,0,0,0,0,0];
	var thisClass = classList[classname];
	for(var i = 0; i < thisClass.length; i++){
		var thisPerson = thisClass[i];
		for(var j = 0; j<thisPerson.length; j++){
			var thisResponse = thisPerson[j];
			if(thisResponse.question === qName){
				var ans = thisResponse.answer;	
				if (ans === ""){
					distribution[0]++;
				} else {
					distribution[parseInt(ans)]++;
					}
			}
		}
	}
	return distribution;
	}
function avgOf(ns){
	var sum = 0;
	var n = 0;
	$.each(ns, function(k, v){
		if(k !== 0){
			sum += parseInt(k)*parseInt(v.num);
			n += parseInt(v.num);
		}
	});
	return [sum/n, n];
	}
function makeGraph(ns){
	var arr = avgOf(ns);
	var avg = arr[0];
	var n = arr[1];
	var y = d3.scale.linear()
		.domain([0, d3.max(ns, function(d, i){
			return d.num;
		})])
		.range([0, HEIGHT]);
	var x = d3.scale.ordinal()
		.domain(ns.map(function(d, i) {
			return d.t;
		}))
		.rangeBands([0, WIDTH], 0.1);
	var xAxis = d3.svg.axis()
    	.scale(x)
    	.orient("top");
    svgBar.select("#ax")
    	.attr('transform', 'translate(0, '+(HEIGHT)+')')
    	.attr("class", "axis")
    	.attr("fill", "rgba(255, 255, 255, 0.5)")
    	.call(xAxis);
	var colorScale = d3.scale.linear().domain([1, 5])
        .range(['#ff0000', '#00ff00']);
	var barsGroup = d3.select('#bars')
		.attr('transform', 'translate(0, '+HEIGHT+') scale(1, -1)');
	var rects = barsGroup.selectAll('rect')
		.data(ns);
	rects.enter().append('rect')
		.attr('x', function(d, i){
			return x(d.t);
		})
		.attr('y', 0)
		.attr('width', x.rangeBand())
		.attr('height', function(d, i){
			return y(d.num);
		})
		.attr('fill', 'pink')
		.attr('stroke', 'white')
		.attr('stroke-width', 1);
	rects
		.transition()
		.duration(1000)
		.attr('x', function(d, i){
			return x(d.t);
		})
		.attr('y', 0)
		.attr('width', x.rangeBand())
		.attr('height', function(d, i){
			return y(d.num);
		})
		.attr('fill', colorScale(avg));
	var info = svgBar.select("#subtext").selectAll("text")
		.data([{"total":n}]);
	info.enter().append("text")
		.attr("x", 0)
		.attr("y", 50)
		.attr("font-size", "50px")
		.attr("fill", "rgba(255, 255, 255, 0.5)")
		.text(function(d){
			return ""+d.total+" responses"
		});
	info
		.transition()
		.duration(1000)
		.text(function(d){
			return ""+d.total+" responses"
		});
	}

