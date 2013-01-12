/**
* This is the main router for the app.
* (c) 2012 Kenny Chung
*/
define([
    'jquery',
	'underscore',
	'Backbone',
    'views/searchForm',
    'views/filterForm',
    'views/searchResults',
    'views/restaurantPage',
    'leaflet',
    'leafletGoogle',
    'leafletBing',
    'markerClusterGroup',
    'jqueryMobile',
    'async!http://maps.googleapis.com/maps/api/js?key=AIzaSyBMkuZ8BK3GRdnOL6sZNsEUg4Gk7IGp8Zk&sensor=false'
	],function($, _, Backbone, searchFormView,filterFormView, searchResultsView, restaurantPageView,L){
    var appRouter = Backbone.Router.extend({
        routes: {
            '': 'home',
            'search': 'search',
            'result' : 'result',
            'restaurant': 'restaurant',
            'filter-page':'filterPage',
            'filter-page&ui-state=dialog':'filterPageDailog'
        },
        initialize: function() {
            //init search form view.
            this.searchFormView = new searchFormView({
                autocompleteModel: App.Models.autocomplete,
                searchModel: App.Models.searchModel
            });
            $("#search-page .content").append(this.searchFormView.render().el);

            this.filterFormView = new filterFormView({
                filterModel: App.Models.filterModel
            });
            $("#filter-page .content").append(this.filterFormView.render().el);
            
            //init search result view.
            this.searchResultsView = new searchResultsView({
                collection: App.Collections.restaurantCollection,
                searchModel: App.Models.searchModel
            });
            $("#result-page .content").append(this.searchResultsView.render().el);

            //TODO: init the geocoder and map, should be moved to somewhere more appropriate.
            //what is this? dont use  in other code
            App.geocoder = new google.maps.Geocoder() || {};

            $('#result-page').live('pagecreate', function () {
                $(this).die();
                L.Icon.Default.imagePath="../www/css/images/"
                var mapOptions = {
                    zoom: 11,
                    center: new L.LatLng(40.006187,-83.017134),
                    zoom: 13,
                    zoomAnimation:true
                },  map = new L.Map(document.getElementById("map_canvas"), mapOptions),

                //add openstreetmap lauer
                    osm = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'),
                    googleSatellite = new L.Google('SATELLITE'),
                    googleHybrid = new L.Google('HYBRID'),
                    googleRoadMap = new L.Google('ROADMAP'),
                    mapQuest = new L.TileLayer('http://otile1.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png', {attribution:''}),
                    markers = new L.MarkerClusterGroup();

                //add bing- need to get api

                map.addLayer(googleRoadMap);
                map.addControl(new L.Control.Layers( {
                        'OSM':osm,
                        'Google Satellite':googleSatellite,
                        'Google Hybrid':googleHybrid,
                        'Google RoadMap':googleRoadMap,
                        'MapQuest':mapQuest
                    }, {}));

                map.addLayer(markers);

                App.map = map;
                App.markers=markers;
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
        filterPage : function() {
            $(".b-header-control").hide();
            $.mobile.changePage( "#filter-page" , { transition: "none", reverse:false, changeHash: false});
        },
        filterPageDailog : function(){
            $(".b-header-control").hide();
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