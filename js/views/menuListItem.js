define([
    'jquery',
	'underscore',
	'Backbone',
	'text!templates/menuRow.html',
    'jqueryMobile'
	],function($,_,Backbone,menuRowTemplate){
    var MenuListItemView = Backbone.View.extend({
        tagName: "li",
        className: "restaurant-row",
        attributes: {
            "data-corners": 'false'
        },
        template: _.template(menuRowTemplate),
        initialize: function () {},
        render: function () {
            $(this.el).html(this.template(this.model.attributes));
            return this;
        }
    });
    
    return MenuListItemView;
});