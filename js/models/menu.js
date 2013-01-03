//NOT USED YET.
define([
    'jquery',
	'underscore',
	'Backbone'
	],function($,_,Backbone){
    var menuModel = Backbone.Model.extend({
        idAttribute: "_id",
        defaults:{
            section:"Dinner",
            dishArray:[
                {
                    name: "orange chicken",
                    price: "$100",
                    calories: 500,
                    rating: 5.5
                },
                {
                    name: "apple pie",
                    price: "$10",
                    calories: 360,
                    rating: 3
                },
                {
                    name: "apple pie",
                    price: "$10",
                    calories: 360,
                    rating: 3
                }
            ]
        }
    });
    
    return menuModel;
});