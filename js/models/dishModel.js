/**
 * dish model presents dish data object
 *
 * @author: Kenny Chung
 */
define([
    'jquery',
    'underscore',
    'Backbone'
],function($,_,Backbone){
    return Backbone.Model.extend({
        //idAttribute: "_id",
        //initialize: {}
        defaults: {
            "calories" : "2250",
            "description" : "we have to eat this thing",
            "id" : 1,
            "ingredients" : [ { "calories_max" : "2000",
                "calories_min" : "1000",
                "description" : "1500",
                "item_id" : "2",
                "name" : "test ingredient 1",
                "unit_name" : "percentage",
                "unit_value" : "20"
            }],
            "item_name" : "Carrat Cake",
            "main_item" : "1",
            "options" : [  ],
            "price" : "15.00",
            "rating" : [  ],
            "salty_rating" : "30",
            "sections_id" : "1",
            "sourness_rating" : null,
            "spicy_rating" : "30",
            "sweetness_rating" : "1",
            "types" : [ { "description" : "delicious burgers",
                "id" : "1",
                "name" : "burger"
            }],
            "umami_rating" : "12"
        }
    });
});