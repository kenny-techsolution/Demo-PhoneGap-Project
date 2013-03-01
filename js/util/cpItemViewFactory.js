/**
 * cpViewFactory allows for creating cpView subClass on the fly with just configuration instead of
 * predefined model object.
 *
 * @author: Kenny Chung
 */
define([
    'jquery',
    'underscore',
    'Backbone'
],function($,_,Backbone){
    return function(initObj){
        var template = _.template(initObj.template);
        return Backbone.View.extend({
            tagName: initObj.tagName,
            className: initObj.className,
            dom: {},
            template: template,
            events: initObj.events,
            initialize: function() {
                _.bindAll(this, 'render');
            },
            render: function() {
                this.$el.html(this.template({ item: this.model.toJSON()}));
                return this;
            }
        });
    };
});