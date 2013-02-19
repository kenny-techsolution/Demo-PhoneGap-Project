define([
    'jquery',
	'underscore',
	'Backbone'
	],function($,_,Backbone){
    var locationModel = Backbone.Model.extend({
        defaults:{
            address:"Current Location",
            latitude: 103,
            longitude: 203 
        },
        initialize: function() {
            _.bindAll(this, 'geoLocationOnSuccess','setCurrentLocation');
            //console.log('before geocoding',this.get("address"));
            /*
            var that = this;
            window.geocoder.geocode( { 'address': this.get("address")},function(results, status){
                that.set({"latitude":results[0].geometry.location.Ya});
                that.set({"longitude":results[0].geometry.location.Za});
            });*/
        },
        radius: 10,
        getGeoCode: function () {
            return {latitude: this.latitude, longitude: this.longitude};
        },
        setRadius: function (miles) {

        },
        getLocationParams: function () {

        },
        geoLocationOnSuccess: function(position){
            this.setCurrentLocation(position.coords.latitiude, position.coords.longitude);
        },
        setCurrentLocation: function (latitude,longitude) {
            this.latitiude = latitude;
            this.longitude = longitude;
        } 
    });
    
    return locationModel;
});