$(document).ready(function(){
	makeGraph(numbers);
});
HEIGHT = 500;
WIDTH = 500;

var y = d3.scale.linear()
	.domain([0, d3.max(numbers, function(d, i){
		return d.num;
	})])
	.range([0, WIDTH]);
var x = d3.scale.ordinal()
	.domain(numbers.map(function(d, i) {
    return d.t;
  }))
	.rangeBands([0, HEIGHT], 0.1);

function makeGraph(ns){
	var svg = d3.select('#graph')
		.attr('height', HEIGHT)
		.attr('width', WIDTH);
	var barsGroup = d3.select('#bars')
		.attr('transform', 'translate(0, '+HEIGHT+') scale(1, -1)');
	var rects = barsGroup.selectAll('rect')
		.data(ns);
	var newRects = rects.enter();
	newRects.append('rect')
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
		.attr('stroke-width', 3);
}

function doClick(){
	var svg = d3.select('svg');
	var rects = svg.selectAll('rect');
	rects.attr('fill', 'red');
}