/**
 * Search Control is a reusable module that contains search form including a keyword text input
 * , location text input, submit button and other search navigation buttons. It notify locationHistoryModule and
 * autocompleteModule about when to show and hide.
 * [Depended Model/Collection]
 * 1.App.Collections.autocompleteCollection: store the autocomplete collection.
 * 1.App.Collections.locationHistoryCollection: store the location history collection.
 *
 * @author: Kenny Chung 2013
 */
define([
    'jquery',
    'underscore',
    'cpView',
    'text!templates/searchControlTemplate.html'
],function($ , _, cpView, searchControlTemplate) {
    return cpView.extend({
        template: _.template(searchControlTemplate),
        dom: {},
        events: {
            'focus .search-text' : 'showAutocomplete',
            'focus .location-text' : 'showLocationHistory',
            'keyup .search-text' : 'updateAutocomplete',
            'click #search-submit' : 'submitSearch'
        },
        //TODO: should be moved to utility class.
        _delay: (function() {
            var timer = 0;
            return function(callback, ms){
                clearTimeout (timer);
                timer = setTimeout(callback, ms);
            };
        })(),
        initialize: function() {
            _.bindAll(this, 'render', 'showLocationFilter','hideLocationFilter','showAutocomplete', 'updateAutocomplete', 'showLocationHistory', 'submitSearch');

            this.locationHistoryCollection = this.options.locationHistoryCollection;
            this.autocompleteCollection = this.options.autocompleteCollection;
        },
        render: function() {
            this.$el.html(this.template);
            return this;
        },
        showLocationFilter: function(callback) {
            this.$(".location-box, .b-filter-button").fadeIn(50,callback);
        },
        hideLocationFilter: function(callback) {
            this.$(".location-box, .b-filter-button").fadeOut(50,callback).hide();
        },
        showAutocomplete: function() {
            this.pubsub.publish("searchControl:showAutocomplete");
        },
        updateAutocomplete: function() {
            var keyword = this.$(".search-text").val();
            that = this;
            this._delay(function() {
                //TODO: should call ajax that get response for autocomplete API.
                var mockResponse = [
                    {keyword: keyword + "auto1"},
                    {keyword: keyword + "auto2"},
                    {keyword: keyword + "auto3"},
                    {keyword: keyword + "auto4"}
                ];
                that.autocompleteCollection.reset(mockResponse);
            },300);
        },
        showLocationHistory: function() {
            this.pubsub.publish("searchControl:showLocationHistory");
        },
        submitSearch: function() {
            var keyword = $(".search-text").val().trim();
            var address = $(".location-text").val().trim();

            var query = this.generateSearchQuery(keyword, address);
            if(query){
                //send the search.
                var mockQuery = {
                    'query': 'burger',
                    'limit': function() { return this.perPage },
                    'offset': function() { return (this.currentPage - 1) * this.perPage },
                    'sort': 'price',
                    'filter': 'spicy',
                    'distance': 10
                };
                this.pubsub.publish("search:submitted",mockQuery);
            }
        },
        //generate the search query ready to be appended to the ajax url.
        generateSearchQuery: function (keyword, address) {
            var geocode = this.getGeocode(address);//retrieve geocode.
            return (this.isValidKeyword(keyword) && geocode!=false) ? "this is the search query" : false;
        },
        //figure out the geocode for a given address.
        getGeocode: function(address) {
            var storedLocation = this.locationHistoryCollection.where({lowercaseAddress:address.toLowerCase()});
            var geocode;
            if(storedLocation.length==0){
                //TODO: this is mock geocode. please put the real geocode retrieval code here
                geocode = { longitude: Math.floor(Math.random()*1001), latitude: Math.floor(Math.random()*1001)};
                if(geocode!={}){
                    this.storeLocation(geocode);
                    return geocode;
                }else{
                    return false;//case for invalid address
                }
            } else {
                var locationJson = storedLocation[0].toJSON();
                geocode = {longitude: locationJson.longitude, latitude: locationJson.latitude};
                return geocode;
            }
        },
        //store the address for the future retrival.
        storeLocation: function(geocode) {
            var storedLocation = this.locationHistoryCollection.where({longitude:geocode.longitude,latitude:geocode.latitude});
            if(storedLocation.length==0){
                this.locationHistoryCollection.add({
                    displayAddress: this.$(".location-text").val(),
                    longitude: geocode.longitude,
                    latitude: geocode.latitude
                });
            }
        },
        //TODO:determine whether a keyword is valid.
        isValidKeyword: function(keyword) {
            return true;
        }
    });
});