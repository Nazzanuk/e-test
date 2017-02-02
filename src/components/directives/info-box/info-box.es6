app.component('infoBoxItem', {
    templateUrl: 'info-box.html',
    controllerAs: "$ctrl",
    bindings: {
        id: '=',
        serviceUrl: '='
    },
    controller: function ($element, $timeout, API) {

        const init = () => {
            console.log('infoBoxItem', this);
        };

        init();

        _.extend(this, {});
    }
});
