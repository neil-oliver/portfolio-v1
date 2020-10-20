
$(function() {
    // init controller
    var controller = new ScrollMagic.Controller();

    var colorBlue = new TweenMax.to('body', 1.5, {
        backgroundColor: '#509cf5',
        color: '#ffc864'
    });

    var colorGrey = new TweenMax.to('body', 1.5, {
        backgroundColor: '#303030',
        color: '#fff',
        stroke: "none"
    });

    var colorYellow = new TweenMax.to('body', 1.5, {
        backgroundColor: '#fbe62d',
        color: '#f56ea1'

    });
    var colorBlack = new TweenMax.to('body', 1.5, {
        backgroundColor: '#000',
        color:'#98f0e2'
    });

    var colorOrange = new TweenMax.to('body', 1.5, {
        backgroundColor: '#ff6535',
        color: '#fdcdd0'
    });

    var colorGreen = new TweenMax.to('body', 1.5, {
        backgroundColor: '#006450',
        color: '#ffccd4'
    });

    // var grow = new TimelineMax();
    // grow.to('#rect', 1.5, {
    //     height: "400px"
    // },'grow');
    // grow.to('body', 1.5, {
    //     backgroundColor: '#000'
    // },'grow');

    var tl = new TimelineMax();
    tl.to('body', 1.5, { backgroundColor: '#f238a6'},'text')
    tl.to('body', 1.5, { color: '#fbe62d'},'text');
    tl.from("#twostart", 0.5, { x: -300 }, "text");
    tl.from("#twoend", 0.5, { x: 300 }, "text");
    tl.from("#life", 0.5, { opacity: 0, y: 1000 }, "text");
    tl.from("#soul", 0.5, { opacity: 0, y: -1000 }, "text");

    var mamamia = new TimelineMax();
    mamamia.to('body', 1.5, { backgroundColor: '#8b1a33'},'text')
    mamamia.to('body', 1.5, { color: '#ffc765'},'text');
    mamamia.from("#left", 0.5, { opacity: 0, x: -1000 }, "text");
    mamamia.from("#right", 0.5, { delay:0.2, opacity: 0, x: 1000 }, "text");
    mamamia.from("#letmego", 0.5, { delay:0.2, x: 300 }, "text");

    new ScrollMagic.Scene({
        triggerElement: '#two',
    })
    .setTween(tl)
    .addTo(controller);


    new ScrollMagic.Scene({
        triggerElement: '#three'
    })
    .setTween(colorGrey)
    .addTo(controller);

    new ScrollMagic.Scene({
        triggerElement: '#five'
    })
    .setTween(colorYellow)
    .addTo(controller);

    new ScrollMagic.Scene({
        triggerElement: '#seven'
    })
    .setTween(colorBlue)
    .addTo(controller);

    new ScrollMagic.Scene({
        triggerElement: '#eight'
    })
    .setTween(colorBlack)
    .addTo(controller);

    // new ScrollMagic.Scene({
    //     triggerElement: '#eight-2'
    // })
    // .setTween(grow)
    // .addTo(controller);

    new ScrollMagic.Scene({
        triggerElement: '#nine'
    })
    .setTween(mamamia)
    .addTo(controller);

    new ScrollMagic.Scene({
        triggerElement: '#eleven'
    })
    .setTween(colorGreen)
    .addTo(controller);

    new ScrollMagic.Scene({
        triggerElement: '#twelve'
    })
    .setTween(colorOrange)
    .addTo(controller);

    new ScrollMagic.Scene({
        triggerElement: '#six'
    })
    .on('start', function () {
        updateBubbles(true,false,false);
    })
    .addTo(controller);

    new ScrollMagic.Scene({
        triggerElement: '#bubbles-1'
    })
    .on('start', function () {
        // splitBubbles('all');
        updateBubbles(true,false,false);
    })
    .addTo(controller);

    new ScrollMagic.Scene({
        triggerElement: '#bubbles-2'
    })
    .on('start', function () {
        splitBubbles('genre');
    })
    .addTo(controller);

    new ScrollMagic.Scene({
        triggerElement: '#bubbles-3'
    })
    .on('start', function () {
        // splitBubbles('all');
        updateBubbles(true,true,true);

    })
    .addTo(controller);

    new ScrollMagic.Scene({
        triggerElement: '#bubbles-4'
    })
    .on('start', function () {
        updateBubbles(false,true,true);
    })
    .addTo(controller);

    new ScrollMagic.Scene({
        triggerElement: '#bars-2'
    })
    .on('start', function () {
        $('#bar-title-1').text('Danceability')
        changeSelection('danceability')
    })
    .addTo(controller);

    new ScrollMagic.Scene({
        triggerElement: '#bars-3'
    })
    .on('start', function () {
        $('#bar-title-1').text('Energy')
        changeSelection('energy')
    })
    .addTo(controller);

    new ScrollMagic.Scene({
        triggerElement: '#bars-4'
    })
    .on('start', function () {
        $('#bar-title-1').text('Queen!')
        filterSong('Bohemian Rhapsody - 2011 Mix')
    })
    .addTo(controller);

    new ScrollMagic.Scene({
        triggerElement: '#bars-4-2'
    })
    .on('start', function () {
        $('#bar-title-1').text('')
    })
    .addTo(controller);

    new ScrollMagic.Scene({
        triggerElement: '#bars-5'
    })
    .on('start', function () {
        changeSelection('default','after')
    })
    .addTo(controller);

    new ScrollMagic.Scene({
        triggerElement: '#bars-6'
    })
    .on('start', function () {
        $('#bar-title-2').text('Emotion')
        changeSelection('valence','after')
    })
    .addTo(controller);

    new ScrollMagic.Scene({
        triggerElement: '#bars-7'
    })
    .on('start', function () {
        $('#bar-title-2').text('Tempo')
        changeSelection('tempo','after')
    })
    .addTo(controller);

    new ScrollMagic.Scene({
        triggerElement: '#bars-8'
    })
    .on('start', function () {
        $('#bar-title-2').text('Whigfield - Saturday Night')
        filterSong('Saturday Night - Radio Mix')
    })
    .addTo(controller);

    new ScrollMagic.Scene({
        triggerElement: '#bars-9'
    })
    .on('start', function () {
        $('#bar-title-2').text('Pharrell Williams - Get Lucky')
        filterSong("Get Lucky (feat. Pharrell Williams & Nile Rodgers) - Radio Edit")
    })
    .addTo(controller);

    new ScrollMagic.Scene({
        triggerElement: '#bars-10'
    })
    .on('start', function () {
        $('#bar-title-2').text('')
    })
    .addTo(controller);

    new ScrollMagic.Scene({
        triggerElement: '#waves3'
    })
    .on('start', function () {
        console.log('fading')
        fade = true;
    })
    .addTo(controller);

});