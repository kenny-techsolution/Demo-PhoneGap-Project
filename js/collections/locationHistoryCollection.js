/**
 * location history collection stores location history model.
 *
 * @author: Kenny Chung
 */
define([
    'jquery',
    'underscore',
    'Backbone',
    'models/locationHistoryModel'
],function($,_,Backbone,location){
    return locationCollection = Backbone.Collection.extend({
        model: location
    });
});