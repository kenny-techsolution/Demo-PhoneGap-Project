/**
 * restaurant detail collection stores restaurant detail model.
 *
 * @author: Kenny Chung
 */
define([
    'jquery',
    'underscore',
    'Backbone',
    'models/restaurantDetailModel'
],function($,_,Backbone,restaurantDetailModel){
    return Backbone.Collection.extend({

        model: restaurantDetailModel
    });
});