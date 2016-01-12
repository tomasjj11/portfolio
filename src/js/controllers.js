// App Config. Instantiate App module.
var portfolioApp = angular.module('portfolioApp', []);

// Setup variables in $rootScope
portfolioApp.controller('GlobalController', function($rootScope) {

    //Navigation Links
    $(document).on("scroll", onScroll);

    $('#menu li>a').click(function(e){
        console.log('1');
        e.preventDefault();
        $(this).parent('li').toggleClass('active').siblings('li.active').toggleClass('active');

        $rootScope.scrollTo($(this).attr('href'));
    });

    $rootScope.scrollTo = function(selector) {
        if ( selector == '#introduction' ){
            //#introduction's top is not 0 because it is fixed so we need to make it so!
            var top = 0;
        }

        $('html, body').delay(250).animate({
            scrollTop: typeof top != 'undefined' ? top : $(selector).offset().top
        }, 500);
    };

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

});

// Controller for setting up the Navigation. Handles the GitHub integration
portfolioApp.controller('NavigationController', function($scope, $rootScope){
    var gitHubUser = new Gh3.User('tomasjj11');
    var repo = new Gh3.Repository('portfolio', gitHubUser);

    repo.fetch(function (err, res){

        if (err) throw err.message;

        var lastUpdatedDate = new Date(repo.updated_at);
        $('#portrait').attr('src',repo.owner.avatar_url);
        $('#lastUpdated').html("<a href='https://github.com/tomasjj11/portfolio/commits/master'>" + lastUpdatedDate.getDate() +'/'+ ('0'+(lastUpdatedDate.getMonth()+1)).slice(-2) +'/'+ lastUpdatedDate.getFullYear()+"</a>");

    });

    $scope.menuItems = {
        introduction: 'Introductions',
        about: 'Who I am',
        skills: 'What I do',
        portfolio: 'Previous work',
        contact: 'Contact me',
    };

    $scope.active = 'introduction';
    $scope.menuClick = function(item){
        $scope.active = item;
        $rootScope.scrollTo('#'+item);
    };
});

portfolioApp.controller('IntroductionController', function($scope){
    // Trianglify Intro background
    function addTriangleTo(target) {
        var dimensions = target.getClientRects()[0];
        var pattern = Trianglify({
            width: dimensions.width,
            height: dimensions.height,
            x_colors: ['#BBB','#DDD','#FFF','#DDD','#BBB'],
            y_colors: ['#AAA','#CCC','#EEE','#CCC','#AAA'],
            cell_size:90
        });
        target.style['background-image'] = 'url(' + pattern.png() + ')';
    }
    addTriangleTo(document.getElementById('introduction'));
});