define([
    'jquery',
	'underscore',
	'Backbone',
    'models/menuCategory'
	],function($,_,Backbone,menuCategory){
    var menuCollection = Backbone.Collection.extend({
        model: menuCategory
    });
    return menuCategoryCollection;
});