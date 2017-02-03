app.controller('HomeScreen', ($element, $timeout, $interval, $scope, $rootScope, $compile) => {

    var init = () => {
        $timeout(() => {
            $('body').append(`<news-card-item id="1" service-url="'public/json/news-card.json'"></news-card-item>`)
        }, 500)

    };

    init();

    _.extend($scope, {});
});



