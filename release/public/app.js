'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var app = angular.module('app', ['ui.router']);

app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind('keypress', function (event) {
            if (event.which !== 13) return;
            scope.$apply(function () {
                return scope.$eval(attrs.ngEnter, { $event: event });
            });
            event.preventDefault();
        });
    };
});

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

    //this controls the animations for each transition
    var resolve = {
        timeout: function timeout($timeout) {
            $('[screen]').removeClass('active');
            $timeout(function () {
                return $('[screen]').addClass('active');
            }, 350);
            return $timeout(300);
        }
    };

    // For any unmatched url, redirect to /
    $urlRouterProvider.otherwise("/");

    // Now set up the states
    $stateProvider.state(new Route('home', "/", resolve)).state(new Route('about', "/about", resolve));

    //use real urls instead of hashes
    //$locationProvider.html5Mode(true);
});

var Route = function Route(name, url, resolve) {
    _classCallCheck(this, Route);

    _.extend(this, {
        name: name,
        url: url,
        templateUrl: _.kebabCase(name) + '-screen.html',
        controller: _.upperFirst(_.camelCase(name + 'Screen')),
        resolve: resolve
    });
};

app.service('API', function ($state, $stateParams, $timeout) {

    var serviceUrl = "";

    var init = function init() {};

    init();

    return {};
});

app.service('Menu', function ($state, $stateParams, $timeout) {

    var currentPage,
        pages = [{ name: "Home", slug: "home" }, { name: "About", slug: "about" }];

    var setPage = function setPage(slug) {
        currentPage = slug;
        $state.go(slug);
    };

    var isCurrentPage = function isCurrentPage(slug) {
        return slug == (currentPage || $state.current.name);
    };

    var init = function init() {
        console.log($state);
        console.log('$state.get()', $state.get());
    };

    init();

    return {
        getPages: function getPages() {
            return pages;
        },
        setPage: setPage,
        isCurrentPage: isCurrentPage
    };
});

app.component('contentItem', {
    templateUrl: 'content.html',
    controllerAs: 'content',
    transclude: {
        content: '?content'
    },
    bindings: {},
    controller: function controller($element, $timeout) {

        var init = function init() {};

        init();

        _.extend(this, {});
    }
});

app.component('eventsItem', {
    templateUrl: 'events.html',
    controllerAs: 'events',
    bindings: {
        img: '@',
        heading: '@'
    },
    controller: function controller($element, $timeout) {

        var init = function init() {};

        init();

        _.extend(this, {});
    }
});

app.component('headerItem', {
    templateUrl: 'header.html',
    controllerAs: 'header',
    bindings: {
        img: '@'
    },
    controller: function controller(Menu) {

        var init = function init() {};

        init();

        _.extend(this, {
            getPages: Menu.getPages,
            setPage: Menu.setPage,
            isCurrentPage: Menu.isCurrentPage
        });
    }
});

app.component('heroItem', {
    templateUrl: 'hero.html',
    controllerAs: 'hero',
    bindings: {
        img: '@',
        heading: '@'
    },
    controller: function controller($element, $timeout) {

        var init = function init() {};

        init();

        _.extend(this, {});
    }
});

app.component('linksItem', {
    templateUrl: 'links.html',
    controllerAs: 'links',
    bindings: {
        img: '@',
        heading: '@'
    },
    controller: function controller($element, $timeout) {

        var init = function init() {};

        init();

        _.extend(this, {});
    }
});

app.component('mediaItem', {
    templateUrl: 'media.html',
    controllerAs: 'media',
    bindings: {
        img: '@',
        heading: '@'
    },
    controller: function controller($element, $timeout) {

        var init = function init() {};

        init();

        _.extend(this, {});
    }
});

app.component('newsItem', {
    templateUrl: 'news.html',
    controllerAs: 'news',
    bindings: {
        img: '@',
        heading: '@'
    },
    controller: function controller($element, $timeout) {

        var init = function init() {};

        init();

        _.extend(this, {});
    }
});

app.component('newsCardItem', {
    templateUrl: 'news-card.html',
    controllerAs: 'newsCard',
    bindings: {
        id: '@'
    },
    controller: function controller($element, $timeout) {

        var init = function init() {};

        init();

        _.extend(this, {});
    }
});

app.component('servicesItem', {
    templateUrl: 'services.html',
    controllerAs: 'services',
    bindings: {
        img: '@',
        heading: '@'
    },
    controller: function controller($element, $timeout) {

        var init = function init() {};

        init();

        _.extend(this, {});
    }
});

app.component('twitterItem', {
    templateUrl: 'twitter.html',
    controllerAs: 'twitter',
    bindings: {
        img: '@',
        heading: '@'
    },
    controller: function controller($element, $timeout) {

        var init = function init() {};

        init();

        _.extend(this, {});
    }
});

app.controller('DemoScreen', function ($element, $timeout, $scope) {

    var init = function init() {};

    init();

    _.extend($scope, {});
});

app.controller('AboutScreen', function ($element, $timeout, $scope) {

    var init = function init() {
        //$timeout(() => $element.find('[screen]').addClass('active'), 50);
    };

    init();

    _.extend($scope, {});
});

app.controller('HomeScreen', function ($element, $timeout, $scope) {

    var init = function init() {
        //$timeout(() => $element.find('[screen]').addClass('active'), 50);
    };

    init();

    _.extend($scope, {});
});