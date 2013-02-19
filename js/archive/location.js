define([
    'jquery',
	'underscore',
	'Backbone',
    'models/location'
	],function($,_,Backbone,location){
    var locationCollection = Backbone.Collection.extend({
        model: location
    });
    return locationCollection;
});