var gitHubUser = new Gh3.User('tomasjj11');
var repo = new Gh3.Repository('portfolio', gitHubUser);

repo.fetch(function (err, res){

    if (err) throw err.message;

    var lastUpdatedDate = new Date(repo.updated_at);
    $('#portrait').attr('src',repo.owner.avatar_url);
    $('#lastUpdated').html("<a href='https://github.com/tomasjj11/portfolio/commits/master'>" + lastUpdatedDate.getDate() +'/'+ ('0'+(lastUpdatedDate.getMonth()+1)).slice(-2) +'/'+ lastUpdatedDate.getFullYear()+"</a>");

});

window.sr = new scrollReveal();

var hammer = new Hammer.Manager(document.getElementById('body'));
var swipe = new Hammer.Swipe();
hammer.add(swipe);

hammer.on('swipe', function(event){
    if(event.direction === Hammer.DIRECTION_LEFT) {
        hideMenu();
    } else if (event.direction === Hammer.DIRECTION_RIGHT) {
        showMenu();
    }
});

$(document).ready(function(){
    // Display navigation
    $('.hamburger-menu, .hamburger-menu span').click(function (){
        showMenu();
    });
    $('nav .close, .site-overlay').click(function(e){
        hideMenu();
    });

    //Navigation Links
    $(document).on("scroll", onScroll);
    $('#menu').find('a').click(function(e){
        e.preventDefault();
        $(this).parent('li').toggleClass('active').siblings('li.active').toggleClass('active');
        hideMenu();

        scrollTo($(this).attr('href'));
    });

    // Scroll Hint
    $(window).scroll(function() {
        $('.scroll-hint').children().css({'opacity': ( 150 - $(window).scrollTop() ) / 100});
    });
    $('.scroll-hint').click(function(e){
        scrollTo('#about');
    });

});

function hideMenu () {
    if (!$('nav').hasClass('fadeOutLeft')) {
        $('nav').show().removeClass('fadeInLeft').addClass('fadeOutLeft');
        $('.site-overlay').fadeOut(500);
    }
}
function showMenu () {
    if (!$('nav').hasClass('fadeInLeft')) {
        $('nav').show().removeClass('fadeOutLeft').addClass('fadeInLeft');
        $('.site-overlay').fadeIn(500);
    }
}

function scrollTo (selector) {
    if ( selector == '#introduction' ){
        //#introduction's top is not 0 because it is fixed so we need to make it so!
        var top = 0;
    }

    $('html, body').delay(250).animate({
        scrollTop: typeof top != 'undefined' ? top : $(selector).offset().top
    }, 500);
}

function onScroll(event){
    var scrollPos = $(document).scrollTop();
    $('#content').find('section').each(function () {

        // Get the name of the "active" link.
        var activeMenuLink = $('#menu').find('li.active').children('a').attr('href').substring(1);

        // If we are looping through the "active" link don't bother
        if ($(this).attr('id') === activeMenuLink) {
            return;
        }

        // If the about section is the active link and gets to certain place in the screen set introduction to active
        if (activeMenuLink == 'about' && ($('#about').offset().top - $(window).scrollTop()) > (window.innerHeight / 3)) {
            $('#menu').find('li').removeClass('active');
            $('#menu').find('li a[href="#introduction"]').parent('li').addClass('active');
        }
        if(($(this).offset().top - $(window).scrollTop()) < (window.innerHeight / 3)) {
            $('#menu').find('li').removeClass('active');
            $('#menu').find('li a[href="#'+$(this).attr('id')+'"]').parent('li').addClass('active');
        }

    });
}