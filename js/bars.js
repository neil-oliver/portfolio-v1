
var margin = {top: 100, right: 100, bottom: 100, left: 100},
    width = (window.innerWidth /2) - margin.left - margin.right,
	height = (window.innerHeight*2/3) - margin.top - margin.bottom;

var barsOriginal;
var barsData;
var barsXaxis;
var barsYaxis;
var barsY;
var barsX;

var svg2 = d3.selectAll(".vistwo-container").append("svg")
	.attr("width", window.innerWidth /2)
    .attr("height", height + margin.top + margin.bottom)
	.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("/data/final.json").then(function(data){
	data.forEach(function(d){
        d.default = 1;
	})
	
	barsOriginal = data;

	// filter year
	barsData = barsOriginal.filter(function(d){return d.played == true && d3.timeParse(d.endTime) <= d3.timeParse("2019-01-12 23:00");});
	// Get every column value
	var elements = ['default','danceability', 'energy', 'valence', 'tempo'];
	var selection = elements[0];

	barsY = d3.scaleLinear()
			.domain([0, d3.max(barsData, function(d){
				return d[selection];
			})])
            .range([height, 0]);

	barsX = d3.scaleBand()
			.domain(barsData.map(function(d){ return d.trackName;}))
            .range([0, width])
            .paddingOuter(0.2);


	barsXaxis = d3.axisBottom(barsX);

	barsYaxis = d3.axisLeft(barsY);

	svg2.append("g")
    	.attr("class", "barsXaxis")
    	.attr("transform", "translate(0," + height + ")")
    	.call(barsXaxis)
    	.selectAll("text")
    	.style("font-size", "8px")
      	.style("text-anchor", "end")
      	.attr("dx", "-.8em")
      	.attr("dy", "-.55em")
      	.attr("transform", "rotate(-90)" );


 	svg2.append("g")
    	.attr("class", "barsYaxis")
    	.call(barsYaxis);

	svg2.selectAll("rectangle")
		.data(barsData)
		.join("rect")
		.attr("class","rectangle")
		.attr('opacity',1)
		.attr("width", width/barsData.length)
		.attr("height", function(d){
			return height - barsY(d[selection]);
		})
		.attr("x", function(d, i){
			return (width / barsData.length) * i ;
		})
		.attr("y", function(d){
			return barsY(d[selection]);
        })
        .attr('fill','#c87d55')
		// .style("pointer-events", "all")
		.on("mouseover", function(d) {	
	
            d3.select('#tooltip').transition()		
                .duration(200)		
                .style("opacity", 1)
                .style("left", (d3.event.pageX) + "px")		
                .style("top", (d3.event.pageY - 28) + "px");;	

            d3.select('#tooltip-track-name')
            .html(d.trackName);
            d3.select('#tooltip-artist-name')
            .html(d.artistName);
            d3.select('#tooltip-header-subheading')
            .html('Playlist: Party');
            d3.select('#tooltip-track-length')
            .html(formatTrackLength(d.track_duration));			
            d3.select('#tooltip-artwork')
            .attr('src', d.albumImages[1].url);

        })					
        .on("mouseout", function(d) {
            d3.select(this).attr("r", function(d, i){ return radius; })

            d3.select('#tooltip').transition()		
                .duration(500)		
                .style("opacity", 0)
        });

});

function changeSelection(selection,filterType){
	filterType = filterType || 'before';

	if (filterType == 'before'){
		barsData = barsOriginal.filter(function(d){return d.played == true && d3.timeParse(d.endTime) <= d3.timeParse("2019-01-12 23:00") ;});
	} else {
		barsData = barsOriginal.filter(function(d){return d.played == true && d3.timeParse(d.endTime) > d3.timeParse("2019-01-12 23:00");});
		console.log(barsData)
	} 


	barsY.domain([0, d3.max(barsData, function(d){
		return d[selection];})]);

	barsX.domain(barsData.map(function(d){ return d.trackName;}))

	barsYaxis.scale(barsY);
	barsXaxis.scale(barsX);

	svg2.selectAll(".barsYaxis")
		.transition()
			.call(barsYaxis);

	svg2.selectAll(".barsXaxis")
		.transition()
			.call(barsXaxis)
			.selectAll("text")
			.style("font-size", "8px")
			  .style("text-anchor", "end")
			  .attr("dx", "-.8em")
			  .attr("dy", "-.55em")
			  .attr("transform", "rotate(-90)" );;

	svg2.selectAll(".rectangle")
		.data(barsData)
		.join('rect')
		.attr("class","rectangle")
		.attr('fill','#c87d55')
		// .style("pointer-events", "all")
		.transition()
		.delay((d,i) => 5*i)
		.duration(500)
		.attr('opacity',1)
		.attr("width", width/barsData.length)
		.attr("height", function(d){
			return height - barsY(d[selection]);
		})
		.attr("x", function(d, i){
			return (width / barsData.length) * i ;
		})
		.attr("y", function(d){
			return barsY(d[selection]);
		})
		.ease(d3.easeBack);
                   
};

function filterSong(songname){
	svg2.selectAll(".rectangle")
	.data(barsData)
	.join('rect')
	.attr("class","rectangle")
	.attr('fill','#c87d55')
	.attr('opacity',1)
	.transition()
	.duration(500)
	.attr('fill','#98f0e2') //d => d.trackName == songname ? '#98f0e2' : '#c87d55'
	.attr('opacity',d => d.trackName == songname ? 1 : 0.2)
	.attr("width", width/barsData.length)
	.attr("height", function(d){
		return height - barsY(d[selection]);
	})
	.attr("x", function(d, i){
		return (width / barsData.length) * i ;
	})
	.attr("y", function(d){
		return barsY(d[selection]);
	})
	.ease(d3.easeBack);
}