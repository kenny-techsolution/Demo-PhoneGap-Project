/**
 * cpCollectionModelFactory allows for creating collection on the fly with just configuration instead of
 * predefined model object.
 *
 * @author: Kenny Chung
 */
define([
    'jquery',
    'underscore',
    'Backbone'
],function($,_,Backbone){
    return function(initObj) {
        var model = Backbone.Model.extend(initObj);
        var collection = Backbone.Collection.extend({
            model: model
        });
        return new collection();
    };
});