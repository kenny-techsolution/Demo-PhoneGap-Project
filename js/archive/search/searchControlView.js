define([
    'jquery',
    'underscore',
    'cpView',
    'text!libs/templates/searchControlTemplate.html'
],function($,_,cpView,searchControlTemplate) {
    return cpView.extend({
        template: _.template(searchControlTemplate),
        dom: {},
        events: {
            'focus .search-text': 'showAutocomplete',
            'focus .location-text':'showLocationHistory',
            'keyup .search-text':'updateAutocomplete',
            'click #search-submit':'submitSearch',
            'click .cancel': 'backHistory'
        },
        initialize: function() {
            this.locationHistoryCollection = this.options.locationHistoryCollection;
            this.autocompleteCollection = this.options.autocompleteCollection;
            _.bindAll(this, 'render', 'showAutocomplete', 'updateAutocomplete', 'showLocationHistory', 'submitSearch', 'backHistory');
        },
        render: function() {
            this.$el.html(this.template);
            return this;
        },
        showAutocomplete: function() {
            this.pubsub.publish("searchControl:showAutocomplete");
        },
        updateAutocomplete: function() {
            var keyword = this.$(".search-text").val();
            that = this;
            this._delay(function() {
                var mockResponse = [
                    {keyword: keyword + "auto1"},
                    {keyword: keyword + "auto2"},
                    {keyword: keyword + "auto3"},
                    {keyword: keyword + "auto4"}
                ];
                that.autocompleteCollection.reset(mockResponse);
            },300);
        },
        _delay: (function() {
            var timer = 0;
            return function(callback, ms){
                clearTimeout (timer);
                timer = setTimeout(callback, ms);
            };
        })(),
        showLocationHistory: function() {
            this.pubsub.publish("searchControl:showLocationHistory");
        },
        submitSearch: function() {
            var keyword = $(".search-text").val().trim();
            var address = $(".location-text").val().trim();

            var query = this._generateSearchQuery(keyword, address);
            if(query){
                //send the search.
                console.log("making ajax request");
            }
        },
        _generateSearchQuery: function (keyword, address) {
            var geocode = this._getGeocode(address);//retrieve geocode.
            return (this._isValidKeyword(keyword) && geocode!=false) ? "this is the search query" : false;
        },
        _getGeocode: function(address) {
            var storedLocation = this.locationHistoryCollection.where({lowercaseAddress:address.toLowerCase()});
            var geocode;
            if(storedLocation.length==0){
                //TODO: this is mock geocode. please put the real geocode retrieval code here
                geocode = { longitude: Math.floor(Math.random()*1001), latitude: Math.floor(Math.random()*1001)};
                if(geocode!={}){
                    this._storeLocation(geocode);
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
        _storeLocation: function(geocode) {
            var storedLocation = this.locationHistoryCollection.where({longitude:geocode.longitude,latitude:geocode.latitude});
            if(storedLocation.length==0){
                this.locationHistoryCollection.add({
                    displayAddress: this.$(".location-text").val(),
                    longitude: geocode.longitude,
                    latitude: geocode.latitude
                });
            }
        },
        _isValidKeyword: function(keyword) {
            return true;
        },
        backHistory: function() {

        }
    });
});