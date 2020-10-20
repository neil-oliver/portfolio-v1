// load the protfolio json
$.getJSON('./data/portfolio.json', function(data) {
    //for each project
    for (i in data){
        var project = data[i]

        /////////////

        var list = document.createElement( "li" )
        $(list)
        .css('background-image', 'linear-gradient(45deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)), url(' + `./images/${project.images.main}` + ')')
        .append(`<span class="s"></span>`);

        var grid = document.createElement( "ul" )
        $(grid)
        .attr('class', 'grid')
        .append(list);

        var links = document.createElement( "div" )
        $(links)
        .attr('class', 'links')
        .append(`<a href="${project['project-link']}" target="_blank">Project</a>`)
        .append(`<a href="${project['github-link']}" target="_blank">Documentation</a>`);

        var box = document.createElement( "div" )
        $(box)
        .attr('id', 'project'+i)
        .attr('class', 'box load-hidden')
        .css('background-image',`linear-gradient(to bottom right, ${project.colors.background[0]}, ${project.colors.background[1]})`)
        .append(`<h3>${project.title}</h3>`)
        .append(grid)
        .append(`<h3 class="top">${project.title}</h3>`)
        .append(links);

        
        $(".container").append(box)

    }

});



var typed = new Typed('#title', {
    strings: ["I am a Web Developer", "I am an Information Designer", " I am Neil Oliver."],
    stringsElement: null,
    typeSpeed: 20,
    showCursor: true,
    cursorChar: "|",
    autoInsertCss: true,
    attr: null,
    onDestroy: function(self) { console.log('onDestroy ' + self) }
});

////////////////
// orignal code from https://bl.ocks.org/basilesimon/f164aec5758d16d51d248e41af5428e4

var lines = 5
var speed = 1000
var delay = speed*0.1

var w = window.innerWidth;
var h = 600;

var svg = d3.select("#background-vis")
  .append("svg")
  .attr("width", w)
  .attr("height", h)
  .attr("id", "visualization");


let waves = Math.floor(window.innerWidth / 200) + 2

var x = d3.scaleLinear().domain([0, waves]).range([0, w]);
var y = d3.scaleLinear().domain([0, waves]).range([h*0.9, 0]);

var line = d3.line()
  .x(function(d,i) {return x(i);})
  .y(function(d) {return y(d);})
  .curve(d3.curveNatural)


// data is created inside the function so it is always unique
let repeat = (speed) => {
  var data = d3.range(waves).map(function(i){return Math.random()*(waves-(i*0.8))})
  data.push(0)

  var color = d3.interpolateWarm(Math.random())

  var path = svg.append("path")
    .attr("d", line(data))
    .attr("stroke", color)
    .attr("stroke-width", "2")
    .attr("fill", "none");

  var totalLength = path.node().getTotalLength();

  path
    .attr("stroke-dasharray", totalLength + " " + totalLength)
    .attr("stroke-dashoffset", totalLength)
    .transition()
      .duration(speed)
      .ease(d3.easeLinear)
      .attr("stroke-dashoffset", 0)

    setTimeout(function(){ 
    svg.selectAll('dot')
        .data(data)
        .join('circle')
        .attr('cx', function(d,i) {return x(i);})
        .attr('cy', function(d) {return y(d);})
        .attr('r', 4)
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("opacity",0)
        .transition()
        .duration(speed/2)
        .ease(d3.easeLinear)
        .attr("opacity",1)
    },delay*lines)

};

setTimeout(function(){
    for (let i=0; i<lines; i++){
        setTimeout(function(){ repeat(speed-(delay*i)); }, delay*i);
    }
    var slideUp = {
        distance: '150%',
        origin: 'bottom',
        opacity: null,
    };
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      $(".box").removeClass('load-hidden')
      $("ul").removeClass('load-hidden')
      $('#socialmedia').removeClass('load-hidden')

    } else {
      slideUp.delay = 300;
      ScrollReveal().reveal('.box', slideUp);
      slideUp.delay = 200;
      ScrollReveal().reveal('ul', slideUp);
      slideUp.origin = 'right'
      slideUp.delay = 1000;
      ScrollReveal().reveal('#socialmedia', slideUp);
     }

},3700)