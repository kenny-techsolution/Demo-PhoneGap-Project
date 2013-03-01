/**
 * location History Model is responsible for storing address information including address string,
 * also in lowercase for search hit purpose. it also stores latitude and longtitude information.
 *
 * @author: Kenny Chung 2013
 */

define([
    'jquery',
    'underscore',
    'Backbone'
],function($,_,Backbone){
    return Backbone.Model.extend({
        defaults:{
            displayAddress:"Current Location",
            lowercaseAddress: "",
            latitude: 103,
            longitude: 203
        },
        initialize: function() {
            this.set("lowercaseAddress",this.get("displayAddress").toLowerCase());
        }
    });
});