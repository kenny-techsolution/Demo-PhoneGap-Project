define([
	'jquery',
	'underscore',
	'Backbone',
    'models/restaurant'
	],function($,_,Backbone,restaurant){
    var restaurantCollection = Backbone.Collection.extend({
        model: restaurant
    });
    return restaurantCollection;
});