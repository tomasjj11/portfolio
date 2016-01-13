// App Config. Instantiate App module.
var portfolioApp = angular.module('portfolioApp', []);

// Setup variables in $rootScope
portfolioApp.controller('GlobalController', function($rootScope) {

    $rootScope.menuActive = 'introduction';

    //Navigation Links
    $(document).on("scroll", onScroll);

    function onScroll(event){
        $('#content').find('section').each(function () {

            // If we are looping through the "active" link don't bother
            if ($(this).attr('id') === $rootScope.menuActive) {
                return;
            }

            // If the about section is the active link and gets to certain place in the screen set introduction to active
            if ($rootScope.menuActive == 'about' && ($('#about').offset().top - $(window).scrollTop()) > (window.innerHeight / 3)) {
                $rootScope.$emit('menuUpdated', 'introduction')
            }
            if(($(this).offset().top - $(window).scrollTop()) < (window.innerHeight / 3)) {
                $rootScope.$emit('menuUpdated', $(this).attr('id'))
            }

        });
    }
    $rootScope.$on('menuUpdated',function(itemToActivate, arg){
        console.log(arg);
        $rootScope.menuActive = arg;
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

    $scope.menuClick = function(item){
        $rootScope.menuActive = item;
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