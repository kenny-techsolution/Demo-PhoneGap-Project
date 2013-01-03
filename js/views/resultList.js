define([
    'jquery',
	'underscore',
	'Backbone',
    'text!templates/resultList.html',
    'jqueryMobile',
    'customJquery'
	],function($,_,Backbone,resultListTemplate){
    var resultListView = Backbone.View.extend({
        tagName: "ul",
        template: _.template(resultListTemplate),
        events: {
            'click li':'selectRestaurant'
        },
        selectedRestaurant: "",
        initialize: function () {
            _.bindAll(this,'render','updateResult');
            this.restaurantPageModel = App.Models.restaurantPageModel;
            this.collection = this.options.collection;
            this.parentNode = this.options.parentNode;
            this.collection.bind('add', this.updateResult);
            this.collection.bind('reset', this.updateResult);
            this.render();
        },
        render: function() {
            $(this.el).empty().html(this.template({results:this.collection.toJSON()}));
            this.parentNode.find(".b-result-list").append(this.el);
            this.delegateEvents();
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