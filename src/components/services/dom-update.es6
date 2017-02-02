app.service('DOMUpdate', ($state, $stateParams, $timeout, $http, $rootScope, $compile, $interval) => {

    const list = [];

    const add = (directiveName) => {
        if (_.includes(list, directiveName)) return;

        list.push(directiveName);

        $timeout(() => {
            $(directiveName).attr('rendered', '');
            watch(directiveName)
        });
    };

    const watch = (directiveName) => {
        $interval(() => {
            $(`body ${directiveName}:not([rendered])`).each(function () {
                $(this).attr('rendered', '');
                render($(this))
            });
        }, 500);
    };

    const render = ($el) => {
        const $newElement = $compile($el)($rootScope);
        $el.replaceWith($newElement);
    };

    const init = () => {

    };

    init();

    return {
        add
    };
});

