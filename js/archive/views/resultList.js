define([
    'jquery',
	'underscore',
	'Backbone',
    'text!templates/resultList.html',
    'iscroll',
    'jqueryMobile',
    'customJquery'
	],function($,_,Backbone,resultListTemplate){
    var resultListView = Backbone.View.extend({
        tagName: "ul",
        template: _.template(resultListTemplate),
        events: {
            'tap li':'selectRestaurant'
        },
        selectedRestaurant: "",
        initialize: function () {
            //console.log("result length",$("#b-result-wrapper").length, iScroll);
            
            setTimeout(function(){
                this.scroll = new iScroll('wrapper',{
                    momentum: true,
                    hScrollbar: false,
                    vScrollbar: true,
                    hideScrollbar: true,
                    fadeScrollbar: true,
                    bounce: true,
                    fixedScrollbar: false
                });
                document.addEventListener('touchmove', function (e) {
                    e.preventDefault();
                }, false);
            },0);

            _.bindAll(this,'render','updateResult');
            this.restaurantPageModel = App.Models.restaurantPageModel;
            this.collection = this.options.collection;
            this.parentNode = this.options.parentNode;
            this.scroll = this.options.scroll;
            this.collection.bind('add', this.updateResult);
            this.collection.bind('reset', this.updateResult);
            
            this.render();
        },
        render: function() {
            $(this.el).empty().html(this.template({results:this.collection.toJSON()}));
            this.parentNode.find("#scroller").append(this.el).trigger("create");
            this.delegateEvents();
            setTimeout(function(){
                this.scroll.refresh();
            },0);
            return this;
        },
        updateResult:function(){
            $("#result-page").removeLoadingSpinner();
            this.render();
        },
        selectRestaurant: function(e){
            var name = $(e.target).closest("li").data("name");
            if(this.selectedRestaurant!== name){
                this.restaurantPageModel.set({"name":name});
                this.selectedRestaurant = name;
            }else {
                Backbone.history.navigate("#restaurant",{trigger: true});
            }
        }
    });
    return resultListView;
});