$(document).ready(function(){
	makeGraph(numbers);
});
HEIGHT = 500;
WIDTH = 500;

var x = d3.scale.linear()
	.domain([0, d3.max(numbers, function(d, i){
		return d.num;
	})])
	.range([0, WIDTH]);
var y = d3.scale.ordinal()
	.domain(numbers.map(function(d, i) {
    return d.t;
  }))
	.rangeRoundBands([0, HEIGHT]);
function makeGraph(ns){
	var svg = d3.select('svg')
		.attr('height', HEIGHT)
		.attr('width', WIDTH);
	var rects = svg.selectAll('rect')
		.data(ns);
	var newRects = rects.enter();
	newRects.append('rect')
		.attr('x', function(d, i){
			return y(d.t);
		})
		.attr('y', 500)
		.attr('width', 100)
		.attr('height', function(d, i){
			return x(d.num);
		})
		.attr('fill', 'pink')
		.attr('stroke', 'white')
		.attr('stroke-width', 3);
}