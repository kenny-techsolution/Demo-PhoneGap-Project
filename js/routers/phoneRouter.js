/**
 * This is the main router for the app.
 * @ Kenny Chung 2013
 */
define([
    'jquery',
    'underscore',
    'Backbone',
    'pubsub'
    //'async!http://maps.googleapis.com/maps/api/js?key=AIzaSyAm6QQX3Gx-Lg3efcgiUPGlbbklIaUBozA&sensor=true'
],function($, _, Backbone, pubsub){
    return Backbone.Router.extend({
        routes: {
            'home' : 'home',
            'search' : 'search',
            'result-page' : 'result',
            'restaurant-page/:id' : 'restaurant',
            'plateList-page' : 'plateList',
            'freebies-page' : 'freebies',
            'account-setting-page' : 'accountSetting',
            'bookmark-page' : 'bookmark'
        },
        initialize: function() {
        },
        home: function() {
            pubsub.publish("navigate:displaySidebarButton");
            $.mobile.changePage( "#home" , { transition: "fade", reverse:false, changeHash: false});
        },
        result: function(){
            pubsub.publish("navigate:displaySidebarButton");
            $.mobile.changePage( "#result-page" , { transition: "fade", reverse:false, changeHash: false});
        },
        restaurant: function(id){
            pubsub.publish("router:switchToRestaurantWithId",{id:id});
            pubsub.publish("navigate:displayBackButton");
            $.mobile.changePage( "#restaurant-page" , { transition: "fade", reverse:false, changeHash: false});
        },
        //below are the standard way to create page transition. just to give some examples.
        plateList: function(){
            pubsub.publish("navigate:displaySidebarButton");
            $.mobile.changePage( "#plateList-page" , { transition: "fade", reverse:false, changeHash: false});
        },
        freebies: function(){
            pubsub.publish("navigate:displaySidebarButton");
            $.mobile.changePage( "#freebies-page" , { transition: "fade", reverse:false, changeHash: false});
        },
        accountSetting: function(){
            pubsub.publish("navigate:displaySidebarButton");
            $.mobile.changePage( "#account-setting-page" , { transition: "fade", reverse:false, changeHash: false});
        },
        bookmark: function(){
            pubsub.publish("navigate:displaySidebarButton");
            $.mobile.changePage( "#bookmark-page" , { transition: "fade", reverse:false, changeHash: false});
        }
    });
});