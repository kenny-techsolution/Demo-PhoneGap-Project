/**
 * Collection that stores dish model.
 *
 * @author: Kenny Chung 2013
 */
define([
    'jquery',
    'underscore',
    'Backbone',
    'models/dishModel'
],function($,_,Backbone,dish){
    return Backbone.Collection.extend({
        model: dish
    });
});