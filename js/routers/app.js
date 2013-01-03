/**
* This is the main router for the app.
* (c) 2012 Kenny Chung
*/
define([
    'jquery',
	'underscore',
	'Backbone',
    'views/searchForm',
    'views/searchResults',
    'views/restaurantPage',
    'jqueryMobile',
    'async!http://maps.googleapis.com/maps/api/js?key=AIzaSyAm6QQX3Gx-Lg3efcgiUPGlbbklIaUBozA&sensor=false'
	],function($, _, Backbone, searchFormView, searchResultsView, restaurantPageView){
    var appRouter = Backbone.Router.extend({
        routes: {
            '': 'home',
            'search': 'search',
            'result' : 'result',
            'restaurant': 'restaurant'
        },
        initialize: function() {
            //init search form view.
            this.searchFormView = new searchFormView({
                autocompleteModel: App.Models.autocomplete,
                searchModel: App.Models.searchModel
            });
            $("#search-page .content").append(this.searchFormView.render().el);
            
            //init search result view.
            this.searchResultsView = new searchResultsView({
                collection: App.Collections.restaurantCollection,
                searchModel: App.Models.searchModel
            });
            $("#result-page .content").append(this.searchResultsView.render().el);

            //TODO: init the geocoder and map, should be moved to somewhere more appropriate.
            App.geocoder = new google.maps.Geocoder() || {};
            $('#result-page').live('pagecreate', function () {
                $(this).die();
                var mapOptions = {
                    zoom: 11,
                    center: new google.maps.LatLng(40.006187,-83.017134),
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                App.map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions)||{};
            });

            //init restaurant page view.
            this.restaurantPageView = new restaurantPageView({model: App.Models.restaurantPageModel});
            $("#restaurant-page .content").append(this.restaurantPageView.render().el);

            $('#search-page').live('pageshow', function () {
                //alert("test");
                $(".search-text").focus().select();
            });
            this.initRestaurantModelFomAPI();
        },
        home: function() {
            $(".b-header-control").show();
            $.mobile.changePage( "#home" , { transition: "none", reverse:false, changeHash: false});
        },
        search: function() {
            $(".b-header-control").hide();
            $.mobile.changePage( "#search-page" , { transition: "none", reverse:false, changeHash: false});

        },
        result: function(){
            $(".b-header-control").show();
            $.mobile.changePage( "#result-page" , { transition: "none", reverse:false, changeHash: false});
        },
        restaurant: function(){
            $(".b-header-control").show();
            $.mobile.changePage( "#restaurant-page" , { transition: "slide", reverse:false, changeHash: false});
        },
        //For testing only
        initRestaurantModelFomAPI: function() {
            $.ajax({
              url: 'http://api.thankyoumenu.com:3080/index.php/api/v1/menus/1',
                success: function(data) {
                console.log(data);
              }
            });
        }
    });
    
    return appRouter;
});