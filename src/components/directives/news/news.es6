app.component('newsItem', {
    templateUrl: 'news.html',
    controllerAs: 'news',
    bindings: {
        img: '@',
        heading: '@'
    },
    controller: function ($element, $timeout) {

        var init = () => {};

        init();

        _.extend(this, {});
    }
});
