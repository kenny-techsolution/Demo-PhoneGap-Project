//NOT USED YET.
define([
    'jquery',
	'underscore',
	'Backbone'
	],function($,_,Backbone){
    var dishModel = Backbone.Model.extend({
        idAttribute: "_id",
        defaults: function () {
            return {
                dish: "taco",
                rating: 0,
                calories: "N/A",
                price: 10.0,
                category: "appertizer"
            };
        }
    });
    
    return dishModel;
});