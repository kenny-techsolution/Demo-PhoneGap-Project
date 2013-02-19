define([
    'jquery',
	'underscore',
	'Backbone',
	'text!templates/locationHistory.html',
    'jqueryMobile'
	],function($,_,Backbone,locationHistoryTemplate){
    var locationHistoryView = Backbone.View.extend({
        tagName: "div",
        className: "location-history",
        template: _.template(locationHistoryTemplate),
        events: {
            'click ul':'selectAddress'
        },
        initialize: function () {
            _.bindAll(this, 'render');
            this.collection.bind('add',this.render);
        },
        render: function () {
            $(this.el).html(this.template({locations:this.collection.toJSON()}));
            this.delegateEvents();
            return this;
        },
        selectAddress: function(event){
            event.preventDefault();
            $('.location-text').val($(event.target).html());
        }
    });
    
    return locationHistoryView;
});