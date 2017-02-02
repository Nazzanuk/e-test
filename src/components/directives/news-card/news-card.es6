app.component('newsCardItem', {
    templateUrl: 'news-card.html',
    controllerAs: "$ctrl",
    bindings: {
        id: '=',
        serviceUrl: '='
    },
    controller: function ($element, $timeout, API) {
        this.isReady = false;
        this.newsCard = {};

        const init = () => {
            console.log('newsCardItem', this);
            API.load(this.serviceUrl, {id:this.id}).then(response => {
                this.newsCard = response[0];
                this.isReady = true;
            });
        };

        init();

        _.extend(this, {});
    }
});
