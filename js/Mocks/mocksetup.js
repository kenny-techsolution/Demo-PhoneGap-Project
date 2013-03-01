//detail explanation refers to https://github.com/appendto/jquery-mockjax
define(['jquery','mockjax'], function($) {
    return function(){
        $.mockjax({
            url: 'http://ramin.prod.thankyoumenu.com:3080/v1/menus/1',
            responseTime: 0,
            contentType: 'text/json',
            proxy: 'js/mocks/json/get_menu_1593522.json'
        });
        $.mockjax({
            url: 'http://ramin.prod.thankyoumenu.com:3080/v1/search*',
            responseTime: 1000,
            contentType: 'text/json',
            data: "query=burger&limit=10&offset=0&sort=price&filter=spicy&distance=10",
            proxy: 'js/mocks/json/get_search_default_p1.json'
        });
        $.mockjax({
            url: 'http://ramin.prod.thankyoumenu.com:3080/v1/restaurant/123',
            responseTime: 400,
            contentType: 'text/json',
            proxy: 'js/mocks/json/get_restaurant_123.json'
        });
        $.mockjax({
            url: 'http://ramin.prod.thankyoumenu.com:3080/v1/menu/1593522',
            responseTime: 200,
            contentType: 'text/json',
            proxy: 'js/mocks/json/get_menu_1593522.json'
        });
        $.mockjax({
            url: 'http://ramin.prod.thankyoumenu.com:3080/v1/menu/1241243',
            responseTime: 200,
            contentType: 'text/json',
            proxy: 'js/mocks/json/get_menu_1241243.json'
        });
        $.mockjax({
            url: 'http://ramin.prod.thankyoumenu.com:3080/v1/menu/3513535',
            responseTime: 200,
            contentType: 'text/json',
            proxy: 'js/mocks/json/get_menu_3513535.json'
        });
    };
});