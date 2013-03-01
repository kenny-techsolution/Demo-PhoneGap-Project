/**
 * restaurant model presents restaurant data object
 *
 * @author: Kenny Chung
 */
define([
    'jquery',
	'underscore',
	'Backbone'
	],function($,_,Backbone){
    return Backbone.Model.extend({
        idAttribute: "_id",
        defaults: {
            restaurantId: 1324,
            restaurantName: "The Farm House",
            restaurantAddress: "6261 W 5th Street Banning, CA 92220",
            restaurantPhone: "(951) 845-2027",
            restaurantRating: 4.5,
            matchedItemCount: 2,
            matchedItem: []
        }
    });
});