/**
 * menu model presents menu data object
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
        urlRoot: "http://ramin.prod.thankyoumenu.com:3080/v1/menu/",
        defaults: {
            "active" : "2",
            "created_at" : "0000-00-00 00:00:00",
            "deleted_at" : null,
            "description" : "Lunch Special",
            "id" : "1241243",
            "name" : "test menu 1",
            "position" : "1",
            "restaurant_id" : "1",
            "sections" : [],
            "updated_at" : "0000-00-00 00:00:00"
        }
    });
});