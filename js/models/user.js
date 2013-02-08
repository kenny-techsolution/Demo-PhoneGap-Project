define([
    'jquery',
	'underscore',
	'Backbone'
	],function($,_,Backbone){
    var userModel = Backbone.Model.extend({
        idAttribute: "id",
        defaults: function () {
            return {
                //order: Restaurants.nextOrder(),
                name: 0,
                sessionID:''
            };
        }
    });
    
    return userModel;
});