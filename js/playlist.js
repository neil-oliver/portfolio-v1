//adapted from https://bl.ocks.org/SpaceActuary/d6b5ca8e5fb17842d652d0de21e88a05
var w = (window.innerWidth/2), h = window.innerHeight;

var radius = 20;
var color = d3.interpolateRdYlBu
var centerScale = d3.scalePoint().padding(1).range([50, w-50]);
var forceStrength = 0.1;

// globals
var circles;
var circleData;
var circleEnter;
var circleJson;
let bubbleFilter = () => true

var svg = d3.select("#visone").append("svg")
    .attr("width", w)
    .attr("height", h)

var simulation = d3.forceSimulation()
        .force("collide",d3.forceCollide().radius(d => bubbleFilter(d) ? radius*1.1 : 0).iterations(12))
        .force("charge", d3.forceManyBody())
        .force("y", d3.forceY().y(h / 2))
        .force("x", d3.forceX().x(w / 2));

var formatTrackLength = d3.timeFormat("%M:%S")

// Define the div for the tooltip
var div = d3.select("#tooltip")

d3.json("/data/final.json").then(function(json){
    
    json.forEach(function(d){
        d.x = w / 2;
        d.y = h / 2;
    })

    circleData = json

    bubbleFilter = (d) => d.playlist == true
           
    circles = svg.selectAll("circle")
        .data(circleData)
        .join("circle")
        .attr("r", function(d){ return bubbleFilter(d) ? radius : 0; })
        .attr("cx", function(d, i){ return 175 + 25 * i + 2 * i ** 2; })
        .attr("cy", function(d, i){ return 250; })
        .style("fill", function(d, i){ return '#509cf5'; })
        .on("mouseover", function(d) {	
            d3.select(this).attr("r", function(d, i){ return radius*1.2; })
	
            div.transition()		
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
            .attr('src',d.albumImages[1].url);

        })					
        .on("mouseout", function(d) {
            d3.select(this).attr("r", function(d, i){ return radius; })

            div.transition()		
                .duration(500)		
                .style("opacity", 0)
        })
        .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended))

    simulation
        .nodes(circleData)
        .on("tick", ticked);
})
    
    function ticked() {
        circles
            .attr("cx", function(d){ return d.x; })
            .attr("cy", function(d){ return d.y; });
    }   

    
    function dragstarted(d,i) {
        if (!d3.event.active) simulation.alpha(1).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(d,i) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    function dragended(d,i) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
        var me = d3.select(this)
        console.log(me.classed("selected"))
        me.classed("selected", !me.classed("selected"))    
    } 

    function updateBubbles(playlist,played,highlight){
        forceStrength = 0.1

        bubbleFilter = (d) => true

        if (playlist && played){
            forceStrength = 0.2
            bubbleFilter = (d) => d.playlist == true && d.played == true
        } else if (playlist){
            bubbleFilter = (d) => d.playlist == true
        } else if (played){
            bubbleFilter = (d) => d.played == true
        }

        let colorSelection = (d) => {
            return d.playlist ? '#faf8c1' : '#f56ea1'
        }

        radius = 20

        circles
            .transition()
                .duration(500)
                .attr("r", function(d){ return bubbleFilter(d) ? radius : 0; })
                .style('fill', d => highlight ? colorSelection(d) : '#509cf5');

        simulation
            .nodes(circleData)
            .on("tick", ticked);

        simulation.restart()

        simulation.force("y", d3.forceY().strength(forceStrength).y(h / 2))
        simulation.force("x", d3.forceX().strength(forceStrength).x(w / 2));

        simulation.alpha(1).restart();

    }
        
    function splitBubbles(byVar) {

        bubbleFilter = (d) => true

        centerScale.domain(circleData.map(function(d){ return d[byVar]; }));
        
        if(byVar == "all"){
            hideTitles()
            radius = 20
            forceStrength = 0.05

            circles
                .transition()
                .duration(200)
                .attr("r", function(d){ return bubbleFilter(d) ? radius : 0; })
                .style('fill', '#509cf5')
                .attr('r', radius)
        } else {
            radius = 10
            forceStrength = 0.3
            bubbleFilter = (d) => d.playlist == true

            circles
            .data(circleData)
            .join("circle")
            .filter(bubbleFilter)
                    .transition()
                    .duration(500)
                    .attr("r", function(d){ return bubbleFilter(d) ? radius : 0; })
                    .style('fill', '#509cf5')

            showTitles(byVar, centerScale);
        }

        simulation
            .nodes(circleData)
            .on("tick", ticked);
        
        simulation.force('x', d3.forceX().strength(forceStrength).x(function(d){ 
            return centerScale(d[byVar]);
        }));

        simulation.alpha(2).restart();
    }
    
    function hideTitles() {
        svg.selectAll('.title').remove();
    }

    function showTitles(byVar, scale) {

        var titles = svg.selectAll('.title')
            .data(scale.domain());
        
        titles.enter().append('text')
            .attr('class', 'title')
            .merge(titles)
            .attr('x', function (d) { return scale(d); })
            .attr('y', height*0.2)
            .attr('font-size','15px')
            .attr('fill','#f56ea1')
            .attr('text-anchor', 'middle')
            .text(function (d) { return d; });
        
        titles.exit().remove() 
    }
