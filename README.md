# Portfolio Website
[View it on GitHub.io](https://neil-oliver.github.io/WebAdvanced_Spring2020_olivn897/portfolio/)

## Initial Design Concept
A portfolio website to display personal data visualization projects, social media links and resume.
The main focus of the site is to immediately capture the audiences attention and allow easy access to view the live project and the documentation. Each project should display an overview image, and links to the both the project and documentation.
While the initial impression must have a wow factor, it must not impede people easily accessing project links; these are high priority. For many people this may be the first impression when considering working with me and will be used as part of job applications.  

The project should function without an additional framework (such as React), however additional projects should be added without changing the HTML or javascript code. Storing project information and the resume in a JSON structure will allow for the JSON files to be stored and easily updated via GitHub while having the remainder of the website hosted elsewhere, for speed of loading and server side actions (if needed at a later date).

## Wireframes
![](../images/portfolio-design-1.png)
![](../images/portfolio-design-2.png)

## Changes to Initial Design
A lot of the colors used in the projects were similar to each other and quite muted. The design was adapted to use a CSS 3D design to draw the users eye into the project and keep their interest. The overlapping text design was inspired by the [Spotify 2018 Wrapped Project](https://www.behance.net/gallery/75636503/Spotify-2018-Wrapped). The text can be slightly difficult to read in places however does not hinder the general understanding of the project and also draws the users eye to the screenshot. 

## Final Design
### Homepage
![](../images/homepage.png)
### Resume
![](../images/resume.png)

## Data Strucutres
Both the resume and projects were stored in a JSON object, allowing for easy manipulation of their stylings and input into the HTML and reuse across different pages.

### Example Project entry
```javascript
{
    "title" : "MET Stories",
    "tagline" : "A story told through time, space and context using artworks from The MET collection.",
    "description" : ["Building on 'A Story of The MET Collection', MET Stories goes one step further to allow a story to be told about a specific topic, and visualize how the story is jumping through time. Once the user enters a keyword, a timeline is produced showing all of the artworks related to that word and a story of how they link togther. The artworks are displayed as a group but can be singled out to focus on the part is plays in the story, or switch to fullscreen mode to view them in all of their glory. Bored on the train and need something quick to read? MET Stories is the perfect quick read with its responsive design including a mobile friendly version."],
    "images" : {
        "main" : "edits/timeline-crop.png",
        "alt" : "timeline-2.png",
        "gifs" : ["timeline-video-1.gif","timeline-video-2.gif","timeline-mobile-video-1.png"],
        "details" : ["timeline-fullscreen.png","timeline-hover.png","timeline-mobile-1.png","timeline-mobile-2.png"],
        "development" : []
    },
    "project-link" : "https://neil-oliver.github.io/Major-Studio-1/New-Context/",
    "github-link" : "https://github.com/neil-oliver/Major-Studio-1/tree/master/New-Context/",
    "datasource" : [{
        "type" : "API",
        "description" : "The MET API",
        "link" : "https://metmuseum.github.io"
    }],
    "tools" : ["Node","JavaScript","D3"],
    "colors" : {
        "background" : ["#3a7bd5", "#7fcdbb"]
    }
}
```

## Information Loading
jQuery is used to load each of the projects in from the JSON and insert the information into the HTML.

```javascript
// load the portfolio json
$.getJSON('./data/portfolio.json', function(data) {
    //for each project
    for (i in data){
        var project = data[i]
        var list = document.createElement( "li" )
        
        //create gradient background using colors from JSON
        $(list)
        .css('background-image', 'linear-gradient(45deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)), url(' + `./images/${project.images.main}` + ')')
        .append(`<span class="s"></span>`);

        var grid = document.createElement( "ul" )
        $(grid)
        .attr('class', 'grid')
        .append(list);
        
        // add links
        var links = document.createElement( "div" )
        $(links)
        .attr('class', 'links')
        .append(`<a href="${project['project-link']}" target="_blank">Project</a>`)
        .append(`<a href="${project['github-link']}" target="_blank">Documentation</a>`);
        
        //create DIV to hold all of the information, add title & links
        // load with hidden class for entry animation
        
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
```

## Adaptations for Mobile Viewing
Media queries were used to change the size of the fonts, and trasform image locations for mobile device viewing. To allow for quicker loading and a cleaner viewing experience, some of the loading animations are disabled on a mobile device.

## References
Initial graphic created in D3 with the help of the starter code [here](https://bl.ocks.org/basilesimon/f164aec5758d16d51d248e41af5428e4). 

[Scroll Reveal](https://scrollrevealjs.org) used for the entrance animations.  
[Scroll Magic](https://scrollmagic.io) used scroll based triggers on the ```Spotify.html``` page.  
[Greensock Animation Platform]() used for color background color changes and animations on ```Spotify.html``` page.  
Additional references are included in the comments section of each javascript file where appropriate.

## Challenges
The 3D CSS transformations of images were difficult to place and had to be manually transformed to sit in the correct location. Due to the rotation the transformations act on a diagonal basis so they took a lot of trial and error. Additional transformations were needed in the media queries for mobile devices.

## Additional
The Spotify page (accessible by the Spotify icon on the side of the page as it is only designed for a specific audience) was created for use as part of an application for a data visualization position at Spotify. The page is still currently under construction with issues when used in safari and replaying animations when scrolling back to the start.  

## Next Steps
The next step would be to build a template for each of the indivdual projects to display more information and additional images. The javascript structure and HTML pages already in place to implement this but more time is required to gather all of the information on each project.  
The Spotify page may be expanded to use a framework to allow for a larger range of data to be used and add user interaction with the visualizations (allowing them to select different parties throughout the year).
