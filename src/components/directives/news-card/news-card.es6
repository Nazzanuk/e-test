app.component('newsCardItem', {
    templateUrl: 'news-card.html',
    controllerAs: "$ctrl",
    bindings: {
        id: '=',
        serviceUrl: '='
    },
    controller: function ($element, $timeout, API, DOMUpdate) {
        this.isReady = false;
        this.newsCard = {};

        const init = () => {
            console.log('newsCardItem', this);
            DOMUpdate.add('news-card-item');

            API.load(this.serviceUrl, {id:this.id}).then(response => {
                this.newsCard = response[0];
                this.isReady = true;
            });
        };

        init();

        _.extend(this, {});
    }
});
