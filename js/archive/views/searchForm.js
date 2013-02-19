define([
    'jquery',
	'underscore',
	'Backbone',
	'text!templates/searchForm.html',
    'collections/location',
    'models/location',
    'views/locationHistory',
    'models/search',
    'jqueryMobile',
    'customJquery'
	],function($,_,Backbone,searchFormTemplate,locationCollection, locationModel, locationView, searchModel){
    var searchFormView = Backbone.View.extend({
        tagName: "div",
        className: "b-search-form",
        template: _.template(searchFormTemplate),
        events: {
            'keyup .search-text':'getAutocomplete',
            'focus .location-text':'showLocationHistory',
            'click #search-submit':'setupSearchQuery',
            'click .cancel': 'backHistory'
        },
        seachModel: {},
        currentLocation: {},
        searchString: "",
        address: "",
        phoneLatitude: 0,
        phoneLongitude: 0,
        initialize: function () {
            _.bindAll(this, 'render','getAutocomplete','renderAutocompleteList','setupSearchQuery','submitSearchQuery','storePhoneGeoLocation');
            autocompleteModel = this.options.autocompleteModel;
            autocompleteModel.bind('change',this.renderAutocompleteList);
            //initialized search model
            this.searchModel = this.options.searchModel;
            //initialize location
            this.initLocation();


        },
        render: function () {
            $(this.el).html(this.template({}));
            return this;
        },
        delay: (function() {
            var timer = 0;
            return function(callback, ms){
                clearTimeout (timer);
                timer = setTimeout(callback, ms);
            };
        })(),
        getAutocomplete: function() {
            var inputValue = this.$(".search-text").val();
            this.delay(function() {
                //console.log(inputValue);
                autocompleteModel.updateByPrefix(inputValue);
            },300);
        },
        renderAutocompleteList: function() {
            var markup = '<ul class="general-list">';
            console.log("renderview");
            console.log(autocompleteModel.toJSON().resultList);
            $.each(autocompleteModel.toJSON().resultList,function(index, value){
                markup += "<li>"+value+"</li>";
            });
            markup += "</ul>";
            this.$(".result-list").empty().append(markup);
        },
        getLocationInput: function() {
            var inputValue = this.$(".location-text").val();
            
        },
        showLocationHistory: function() {
            $('.result-list').empty().append(this.locationView.render().el);
        },
        setupSearchQuery: function(e) {
            e.preventDefault();
            this.searchString = $.trim(this.$(".search-text").val());
            this.address = $.trim(this.$(".location-text").val());

            //TODO: put validation logic here later.
            if(this.searchString!=="" && this.address!=="" ){
                var that= this;
                if(this.address=="Current Location"){
                    this.submitSearchQuery(this.searchString,this.phoneLatitude,this.phoneLongitude);
                }else{
                    /*
                    window.geocoder.geocode( { 'address': this.address},function(results, status){
                        var lat = results[0].geometry.location.Ya;
                        var lng = results[0].geometry.location.Za;
                        that.storeAddressGeoCode(lat,lng);
                    });
                    */
                     that.storeAddressGeoCode(1300,1300);
                }
            }
        },
        initLocation: function(){
            //initialized location view
            this.locationCollection = new locationCollection();
            this.locationView = new locationView({collection: this.locationCollection});
            navigator.geolocation.getCurrentPosition(this.storePhoneGeoLocation);
        },
        storePhoneGeoLocation: function(position){
            this.phoneLatitude = position.coords.latitude;
            this.phoneLongitude = position.coords.longitude;
            this.currentLocation = new locationModel({
                address:"Current Location",
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
            this.locationCollection.add([this.currentLocation]);
        },
        storeAddressGeoCode: function(lat, lng){
            var existLocation = this.locationCollection.where({latitude: lat, longitude: lng});
            if(existLocation.length === 0) {
                this.currentLocation = new locationModel({address:this.address,latitude: lat, longitude: lng});
                this.locationCollection.add([this.currentLocation]);
            }
            this.submitSearchQuery(this.searchString,lat,lng);
        },
        submitSearchQuery:function(searchString, lat, lng){
            this.searchModel.findBy(searchString, lat, lng);
            Backbone.history.navigate("#result",{trigger: true});
        },
        backHistory: function(e) {
            e.preventDefault();
            window.history.back();
        }
    });
    
    return searchFormView;
});