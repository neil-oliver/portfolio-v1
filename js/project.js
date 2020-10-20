// load the protfolio json
$.getJSON('./data/portfolio.json', function(data) {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');
    var project = data[projectId]
    $('#title').text(project.title);
    $('#main').append(`<h2>${project.tagline}</h2>`)
    for (i in project.description){
        $('#main').append(project.description[i])
    }

    $('#main').append("<h2>Data Source</h2>")
    for (i in project.datasource){
        if (project.datasource[i].link != ""){
            $('#main').append(`<a href="${project.datasource[i].link}">${project.datasource[i].description}</a>`)
        } else {
        $('#main').append(`<p>${project.datasource[i].description}</p>`)
        }
    }
    $('#main').append("<h2>Tools</h2>")
    for (i in project.tools){
        $('#main').append(`<img src="./images/tools/${project.tools[i]}.svg" alt="${project.tools[i]}" height="50px">`);
    }

    $('#main').append(`<img src="./images/${project.images.main}" alt="${project.title}" height="100%" width="100%">`);
    $('#main').append(`<img src="./images/${project.images.alt}" alt="${project.title}" height="100%" width="100%">`);

    if (project.images.gifs){
        for (i in project.images.gifs){
            $('#main').append(`<img src="./images/${project.images.gifs[i]}" alt="${project.title}" height="100%" width="100%">`);

        }
    }
    for (i in project.images.development){
        $('#main').append(`<img src="./images/${project.images.development[i]}" alt="${project.title}" height="100%" width="100%">`);

    }

});

