define([
    'jquery',
	'underscore',
	'Backbone'
	],function($,_,Backbone){
    var restaurantModel = Backbone.Model.extend({
        idAttribute: "_id",
        defaults: function () {
            return {
                //order: Restaurants.nextOrder(),
                img: 'img/icon.jpg',
                name: 'Taste Good Bistro',
                distance: '5 miles',
                rating: 5,
                calories: "200-250",
                price: 3.50
            };
        }
    });
    
    return restaurantModel;
});