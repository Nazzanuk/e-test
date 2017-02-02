app.component('mediaItem', {
    templateUrl: 'media.html',
    controllerAs: 'media',
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
