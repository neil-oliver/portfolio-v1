var n = 40,
        lines = 5,
        random = d3.randomNormal(0, .2),
        data = d3.range(lines).map(d => d3.range(n).map(random));

    var svg = d3.select("#waves").append("svg").attr('width',window.innerWidth).attr('height',window.innerWidth/2),
        margin = { top: 10, right: 10, bottom: 10, left: 10 },
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    var x = d3.scaleLinear()
        .domain([0, n - 1])
        .range([0, width]);
    var y = d3.scaleLinear()
        .domain([-1, 1])
        .range([height, 0]);
    var line = d3.line()
        .x(function (d, i) { return x(i); })
        .y(function (d, i) { return y(d); })
        .curve(d3.curveCardinal);

    g.append("defs").append("clipPath")
        .attr("id", "clip")
        .append("rect")
        .attr("width", width)
        .attr("height", height);

    function draw(i,speed,color){
        g.append("g")
        .attr("clip-path", "url(#clip)")
        .append("path")
        .datum(data[i])
        .attr("class", "line")
        .attr("stroke",color(Math.random() / 2))
        .transition()
        .duration(speed)
        .ease(d3.easeLinear)
        .on("start", tick);

        function tick() {
            // Push a new data point onto the back.
            data[i].push(random());
            // Redraw the line.
            d3.select(this)
                .attr("d", line)
                .attr("transform", null);
            // Slide it to the left.
            d3.active(this)
                .attr("transform", "translate(" + x(-1) + ",0)")
                .transition()
                .on("start", tick);
            // Pop the old data point off the front.
            data[i].shift();
        }
    }

    for (let i=0;i<lines;i++){
        draw(i,Math.floor(Math.random() * 300)+100,d3.interpolateCool)
    }