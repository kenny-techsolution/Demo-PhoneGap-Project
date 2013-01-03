//restaurant page contains multiple menu
define([
    'jquery',
	'underscore',
	'Backbone',
    'text!templates/restaurantPage.html',
    'jqueryMobile',
    'iscroll'
	],function($,_,Backbone,restaurantTemplate){
    var restaurantPageView = Backbone.View.extend({
        tagName: "div",
        template: _.template(restaurantTemplate),
        events: {
            'tap .title':'toggleSection', 
            'tap .back':'backHistory'
        },
        initialize: function () {
            _.bindAll(this,'render');
            this.model= this.options.model;
            this.model.bind("change", this.render);
        },
        render: function(){
            $(this.el).empty();
            $(this.el).html(this.template({name:this.model.get("name"),menus:this.model.get("menus")}));
            Backbone.history.navigate("#restaurant",{trigger: true});
            return this;
        },
        toggleSection:function(event){
            var $currentNode = $(event.target);
            if($currentNode.hasClass("expanded")){
                $currentNode.removeClass("expanded").next().hide(100);
            } else {
                $currentNode.addClass("expanded").next().show(100);
            }
        },
        backHistory: function(e){
            e.preventDefault();
            $.mobile.changePage( "#result-page" , { transition: "slide", reverse:true, changeHash: true});
        }
    });
    return restaurantPageView;
});