define([
    'jquery',
	'underscore',
	'Backbone',
    'models/dish',
    'collections/dish',
    'models/restaurant',
    'collections/restaurant',
    'views/app',
    'jqueryMobile'
    ],function($,_,Backbone,dish,dishCollection,restaurant,restaurantCollection,appView){

    return function(){
        var D1 = new dish({
            dish: "orange chicken",
            price: 20.0
        });
        var D2 = new dish({
            dish: "orange chicken",
            price: 10.0
        });
        var D3 = new dish({
            dish: "orange chicken",
            price: 5.0
        });

        var D4 = new dish({});
        var D5 = new dish({});
        var D6 = new dish({});
        var D7 = new dish({});
        var D8 = new dish({});
        var D9 = new dish({});
        var D10 = new dish({});
        var D11 = new dish({});

        var menu = new dishCollection([D1, D2, D3, D4, D5, D6, D7, D8, D9, D10, D11]);

        var R1 = new restaurant({});
        var R2 = new restaurant({});
        var R3 = new restaurant({});
        var R4 = new restaurant({});
        var R5 = new restaurant({});
        var R6 = new restaurant({});
        var R7 = new restaurant({});
        var R8 = new restaurant({});
        var R9 = new restaurant({});
        var R10 = new restaurant({});
        var R11 = new restaurant({});

        var restaurants = new restaurantCollection([R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11]);

        window.App = new appView({restaurantCollection: restaurants, menu: menu}); 
    }
});