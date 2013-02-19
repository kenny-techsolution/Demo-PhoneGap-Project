/**
 * Search model stores the various search params, including query, filters, and location, and manages
 * all the search related operation. When making a search request, the model has to coordinate with location model
 * to retrieve the geocode for the entered address.
 * (c) 2012 Kenny Chung
 */
define([
    'jquery',
    'underscore',
    'Backbone',
    'collections/restaurantResultList',
    'models/restaurant'
    ],function($,_,Backbone,restaurantResultList,restaurant){
    var searchModel = Backbone.Model.extend({
        defaults:{
            numRemoteResults: 0,
            numLocalResults: 0,
            numPages: 0,
            numLoadedPages: 0,
            fullLoad: false,
            filteredFullLoad: false,
            remoteFilter: false,
            collection: {}
        },
        cache: [],
        xhr:{},
        longtitude: 0,
        latitude: 0,
        query: "",
        searchResultsView: {},
        initialize: function(){
            //this.numRemoteResults = this.options.numRemoteResults;
            //this.numLocalResults = this.options.numLocalResults;
            //this.numPages = this.options.numPages;
            //this.numLoadedPages = this.options.numLoadedPages;
            //this.fullLoad = this.options.fullLoad;
            //this.filteredFullLoad = this.options.filteredFullLoad;
            //this.remoteFilter = this.options.remoteFilter;
            
            //initialized collection.
            
            this.set({'collection': App.Collections.restaurantCollection});
        },
        reset: function() {
            
        },
        findBy: function (query, longitude, latitude){
            this.set({"longitude": longitude});
            this.set({"latitude":latitude});
            this.set({"query": query});
            this.getFromAjax(query, longitude, latitude);
            //console.log("trigger view rendering", query, longitude,latitude);
            this.trigger("find");
        },
        sortBy: function(sortType){
            //console.log("sort by sort by la");
            var collection = this.get("collection");
            //console.log(App.Collections.restaurantCollection.toJSON());
            App.Collections.restaurantCollection.comparator = function(item){
                return item.get(sortType);
            };
            App.Collections.restaurantCollection.sort();
            //console.log(App.Collections.restaurantCollection.toJSON());
            /*
            if(this.get("fullLoad") ===true && this.get("remoteFilter")===false){
                //local sort on unfiltered collection.
                console.log("local sort on unfiltered collection");
            } else if(this.get("filteredFullLoad")===true && this.get("remoteFilter") ===true){
                //local sort on filtered collection.
                console.log("local sort on filtered collection");
            } else {
                //remote sort
                console.log("remote sort");
            }
            */
        },
        filterBy: function(params){
            if(this.get("fullLoad")===true && this.get("remoteFilter")===false){
                //local filter on unfiltered collection.
                //console.log("filter with local filter");
            } else if(this.get("fullLoad") ===false){
                //remote filter
                this.remoteFilter = true;
                //this.getFromAjax(params);
                //console.log("filter with remote filter");
            }
        },
        getFromAjax: function(query, setting){

            var item1 = new restaurant({
                name: "Super Pho restaurant",
                lat:39.972164,
                lng:-82.913401,
                distance: 2,
                price: 14,
                rating: 3.5
            });
            var item2 = new restaurant({
                name: "Banjo French Bistro",
                lat:39.995309,
                lng:-83.007307,
                distance: 5.3,
                price: 6,
                rating: 3
            });
            var item3 = new restaurant({
                name: "5 Guys Burger",
                lat:40.011332,
                lng:-83.010897,
                distance: 3.2,
                price: 8,
                rating: 4.5
            });
            var item4 = new restaurant({
                name: "Tansuki Japnese",
                lat:40.006153,
                lng:-83.012216,
                distance: 9,
                price: 21,
                rating: 3.5
            });
            var item5 = new restaurant({
                name: "Panera",
                lat:40.006364,
                lng:-83.021006,
                distance: 6,
                price: 13,
                rating: 5
            });
            var item6 = new restaurant({
                name: "Super Pho restaurant",
                lat:39.972164,
                lng:-82.913401,
                distance: 2,
                price: 14,
                rating: 3.5
            });
            var item7 = new restaurant({
                name: "Banjo French Bistro",
                lat:39.995309,
                lng:-83.007307,
                distance: 5.3,
                price: 6,
                rating: 3
            });
            var item8 = new restaurant({
                name: "5 Guys Burger",
                lat:40.011332,
                lng:-83.010897,
                distance: 3.2,
                price: 8,
                rating: 4.5
            });
            var item9 = new restaurant({
                name: "Tansuki Japnese",
                lat:40.006153,
                lng:-83.012216,
                distance: 9,
                price: 21,
                rating: 3.5
            });
            var item10 = new restaurant({
                name: "Panera",
                lat:40.006364,
                lng:-83.021006,
                distance: 6,
                price: 13,
                rating: 5
            });
            var that  = this;
            var collection= this.get("collection");
            //console.log(collection.toJSON());
            setTimeout(function(){
                //console.log("lla");
                collection.add([item1, item2, item3, item4, item5, item6, item7, item8, item9, item10]);
            },500);

            //response will reset numRemotResult and numPages.
            //insert model into collection

            /* the following code needs to be changed.
            if(this.xhr!={}){
                this.xhr.abort();
            }
            this.xhr = $.ajax({
                url: "api/search",
                data: {query: query, setting: setting},
                dataType: "json"
            }).done(function(data){
                
            });*/
        },
        nextPage: function(){
            /*
            this.fullLoad = (this.numPages === this.numLoadedPages)? true : false;
            if(this.fullLoad){
                return false;
            } else {
                this.numLoadedPages++;
                var query = "page="+this.numLoadedPages;
                this.getFromAjax(query);
            }
            */
        },
        resetLocalCounter: function(){
            /*
            this.numLoadedPages = 0;
            this.fullLoad = false;
            */
        }
    });
    
    return searchModel;
});