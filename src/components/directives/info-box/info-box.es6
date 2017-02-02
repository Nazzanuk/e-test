app.component('infoBoxItem', {
    templateUrl: 'info-box.html',
    controllerAs: "$ctrl",
    bindings: {
        id: '=',
        serviceUrl: '='
    },
    controller: function ($element, $timeout, API, DOMUpdate) {

        const init = () => {
            console.log('infoBoxItem', this);
            DOMUpdate.add('info-box-item');
        };

        init();

        _.extend(this, {});
    }
});
