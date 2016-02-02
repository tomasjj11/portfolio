// App Config. Instantiate App module.
var portfolioApp = angular.module('portfolioApp', []);

// Setup variables in $rootScope
portfolioApp.controller('GlobalController', function($rootScope) {

    $rootScope.scrollTo = function(selector) {
        if ( selector == '#introduction' ){
            //#introduction's top is not 0 because it is fixed so we need to make it so!
            var top = 0;
        }

        $('html, body').delay(250).animate({
            scrollTop: typeof top != 'undefined' ? top : $(selector).offset().top
        }, 500);
    };
    // On load make sure we are back at the top of the page
    $rootScope.scrollTo('#introduction');

    window.scrollReveal = ScrollReveal().reveal('.reveal', {
        origin      : 'bottom',
        duration    : 1000,
        delay       : 450,
        useDelay    : 'always',
        viewFactor  : 0.6,
    });
    scrollReveal.reveal('.reveal.reveal-5', {delay:500}).reveal('.reveal.reveal-6', {delay:600})
        .reveal('.reveal.reveal-7', {delay:700}).reveal('.reveal.reveal-8', {delay:800})
        .reveal('.reveal.reveal-9', {delay:900}).reveal('.reveal.reveal-10', {delay:1000});

});

// Controller for setting up the Navigation. Handles the GitHub integration
portfolioApp.controller('NavigationController', function($scope, $rootScope){
    var gitHubUser = new Gh3.User('tomasjj11');
    var repo = new Gh3.Repository('portfolio', gitHubUser);

    repo.fetch(function (err, res){

        if (err) throw err.message;

        var lastUpdatedDate = new Date(repo.updated_at);
        $scope.$apply( function() {
            $scope.portraitUrl = repo.owner.avatar_url;
            $scope.repo = {
                fullPath : 'https://github.com/tomasjj11/portfolio/commits/master',
                updatedDate : lastUpdatedDate
            };
        });

    });

    $scope.menuItems = {
        introduction: 'Introductions',
        about: 'Who I am',
        skills: 'What I do',
        portfolio: 'Previous work',
        contact: 'Contact me',
    };

    $scope.menuClick = function(item){
        $scope.menuActive = item;
        $rootScope.scrollTo('#'+item);
    };

    $scope.menuActive = 'introduction';

    //Navigation Links
    $(document).on("scroll", function(event){
        $('#content').find('section').each(function () {
            var id = $(this).attr('id');

            // If we are looping through the "active" link don't bother
            if (id === $scope.menuActive) {
                return;
            }

            // If the about section is the active link and gets to certain place in the screen set introduction to active
            if ($scope.menuActive == 'about' && ($('#about').offset().top - $(window).scrollTop()) > (window.innerHeight / 3)) {
                $scope.$apply(function () {
                    $scope.menuActive = 'introduction';
                });
            }
            if(($(this).offset().top - $(window).scrollTop()) < (window.innerHeight / 3)) {
                $scope.$apply(function () {
                    $scope.menuActive = id;
                });
            }
        });
    });
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

    $("span.role").typed({
        strings: ['software engineer','web designer','web developer.'],
        typeSpeed: 70,
        startDelay: 2000,
        backSpeed: 10,
        stopNum: 3
        //stringsElement: $('h2 div#typed-strings')
    });
});

portfolioApp.controller('ContactController', function($scope, $http){
    $scope.contact = {
        'name': {
            'placeholder': 'Name *',
            'value': ''
        },
        'email': {
            'placeholder': 'E-mail Address *',
            'value': ''
        },
        'phone': {
            'placeholder': 'Telephone Number',
            'value': ''
        },
        'body': {
            'placeholder': 'Message *',
            'value': ''
        },
    };

    $scope.sendContact = function () {

        if($scope.contactForm.gotcha){
            return;
        }

        $http({
            method: 'POST',
            url: '//formspree.io/tomasjj11@gmail.com',
            data: $.param({
                _replyto: $scope.contact.email.value,
                _subject: 'Portfolio Contact form submission from ' + $scope.contact.name.value,
                message: $scope.contact.body.value,
                name: $scope.contact.name.value,
                email: $scope.contact.email.value,
                phone: $scope.contact.phone.value
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(
            function successCallback(success){
                $scope.contactForm.success = true;
            },
            function errorCallback(error){
                $scope.contactForm.error = error.statusText;
            }
        );
    };
});