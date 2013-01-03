define([
    'jquery',
	'underscore',
	'Backbone',
    'text!templates/searchResults.html',
    'views/resultList',
    'jqueryMobile',
    'customJquery'
	],function($,_,Backbone,searchResultsTemplate,resultListView){
    var searchResultsView = Backbone.View.extend({
        tagName: "div",
        className: "search-result",
        template: _.template(searchResultsTemplate),
        events: {
            'click .map': 'switchToMap',
            'click .list':'switchToList',
            'click .distance':'sortByDistance',
            'click .price':'sortByPrice',
            'click .rating':'sortByRating'
        },
        resultListView: {},
        initialize: function () {
            _.bindAll(this,'render','showloading','setMarkersOnMap');
            this.collection = this.options.collection;
            this.searchModel = this.options.searchModel;
            this.searchModel.bind('find',this.showloading);
            this.collection.bind("add",this.setMarkersOnMap);
            this.resultListView = new resultListView({collection: this.collection, parentNode: $(this.el)});
            $("#result-page .content").append(this.render().el).trigger('create');
        },
        render: function() {
            $(this.el).html(this.template({}));
            this.delegateEvents();
            return this;
        },
        showloading:function() {
            $("#result-page").addLoadingSpinner();
        },
        switchToMap: function() {
            this.$(".map-container, .list, ").removeClass("hide");
            this.$(".b-result-list, .map, .b-sort-bar").addClass("hide");
        },
        switchToList: function() {
            this.$(".map-container, .list, ").addClass("hide");
            this.$(".b-result-list, .map, .b-sort-bar").removeClass("hide");
        },
        setMarkersOnMap: function() {
            this.collection.each(function(item){
                var myLatlng = new google.maps.LatLng(item.get("lat"),item.get("lng"));
                var marker = new google.maps.Marker({
                    position: myLatlng,
                    title: item.get("name")
                });
                marker.setMap(App.map);
            });
        },
        sortByDistance: function() {
            $("#result-page").addLoadingSpinner();
            this.searchModel.sortBy('distance');
            this.$('.distance').addClass("selected");
            this.$('.price, .rating').removeClass("selected");
        },
        sortByPrice: function() {
            $("#result-page").addLoadingSpinner();
            this.searchModel.sortBy('price');
            this.$('.distance, .rating').removeClass("selected");
            this.$('.price').addClass("selected");
        },
        sortByRating: function() {
            $("#result-page").addLoadingSpinner();
            this.searchModel.sortBy('rating');
            this.$('.distance, .price').removeClass("selected");
            this.$('.rating').addClass("selected");
        }
    });
    return searchResultsView;
});