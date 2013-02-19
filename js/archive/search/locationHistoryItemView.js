define([
    'jquery',
    'underscore',
    'cpView',
    'text!libs/templates/locationHistoryItemTemplate.html'
],function($,_,cpView,locationHistoryItemTemplate){
    return cpView.extend({
        tagName: "div",
        className: "location-item",
        dom: {},
        template: _.template(locationHistoryItemTemplate),
        events: {
        },
        initialize: function () {
            _.bindAll(this, 'render');
        },
        render: function () {
            this.$el.html(this.template({ item: this.model.toJSON().displayAddress}));
            return this;
        }
    });
});