define([
    'jquery',
	'underscore',
	'Backbone',
    'models/menu'
	],function($,_,Backbone,dish){
    var menuCollection = Backbone.Collection.extend({
        model: menu
    });
    return menuCollection;
});