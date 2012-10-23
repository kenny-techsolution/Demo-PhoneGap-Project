define([
    'jquery',
	'underscore',
	'Backbone',
    'models/dish'
	],function($,_,Backbone,dish){
    var dishCollection = Backbone.Collection.extend({
        model: dish
    });
    return dishCollection;
});