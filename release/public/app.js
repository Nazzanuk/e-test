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

app.service('API', function ($state, $stateParams, $timeout, $http) {

    var API = "/";

    var getReq = function getReq(url, data) {
        var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'get';

        return $http[type](url, { params: data }).then(function (response) {
            console.log('req response', response);
            return response.data;
        }, function (err) {
            console.error(err);
            return $q.reject();
        });
    };

    var load = function load(url, data) {
        return getReq(API + url, data);
    };

    var loadNewsCard = function loadNewsCard(data) {
        return getReq(API + "public/json/news-card.json", data);
    };

    var init = function init() {};

    init();

    return {
        load: load,
        loadNewsCard: loadNewsCard
    };
});

app.service('DOMUpdate', function ($state, $stateParams, $timeout, $http, $rootScope, $compile, $interval) {

    var list = [];

    var add = function add(directiveName) {
        if (_.includes(list, directiveName)) return;

        list.push(directiveName);

        $timeout(function () {
            $(directiveName).attr('rendered', '');
            watch(directiveName);
        });
    };

    var watch = function watch(directiveName) {
        $interval(function () {
            $('body ' + directiveName + ':not([rendered])').each(function () {
                $(this).attr('rendered', '');
                render($(this));
            });
        }, 500);
    };

    var render = function render($el) {
        var $newElement = $compile($el)($rootScope);
        console.log('$el', $el);
        console.log('outerHTML', $el[0].outerHTML);
        $el.replaceWith($newElement);
    };

    var init = function init() {};

    init();

    return {
        add: add
    };
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

app.component('infoBoxItem', {
    templateUrl: 'info-box.html',
    controllerAs: "$ctrl",
    bindings: {
        id: '=',
        serviceUrl: '='
    },
    controller: function controller($element, $timeout, API, DOMUpdate) {
        var _this = this;

        var init = function init() {
            console.log('infoBoxItem', _this);
            DOMUpdate.add('info-box-item');
        };

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

app.component('newsCardItem', {
    templateUrl: 'news-card.html',
    controllerAs: "$ctrl",
    bindings: {
        id: '=',
        serviceUrl: '='
    },
    controller: function controller($element, $timeout, API, DOMUpdate) {
        var _this2 = this;

        this.isReady = false;
        this.newsCard = {};

        var init = function init() {
            console.log('newsCardItem', _this2);
            DOMUpdate.add('news-card-item');

            API.load(_this2.serviceUrl, { id: _this2.id }).then(function (response) {
                _this2.newsCard = response[0];
                _this2.isReady = true;
            });
        };

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

app.controller('AboutScreen', function ($element, $timeout, $scope) {

    var init = function init() {
        //$timeout(() => $element.find('[screen]').addClass('active'), 50);
    };

    init();

    _.extend($scope, {});
});

app.controller('DemoScreen', function ($element, $timeout, $scope) {

    var init = function init() {};

    init();

    _.extend($scope, {});
});

app.controller('HomeScreen', function ($element, $timeout, $interval, $scope, $rootScope, $compile) {

    var init = function init() {
        $timeout(function () {
            $('body').append('<news-card-item id="1" service-url="\'public/json/news-card.json\'"></news-card-item>');
        }, 500);
    };

    init();

    _.extend($scope, {});
});