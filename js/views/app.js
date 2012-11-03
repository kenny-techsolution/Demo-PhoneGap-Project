define([
    'jquery',
	'underscore',
	'Backbone',
    'views/restaurantListItem',
    'jqueryMobile',
    'iscroll'
	],function($,_,Backbone,restaurantView){
    var AppView = Backbone.View.extend({
        el: $("#home"),

        listCreated: false,

        events: {
            "click button#search-button": "showRestaurantList"
        },
        
        initialize: function () {
            $("#back-to-home").on("click", function () {
                $.mobile.changePage("#home", {transition: "turn",reverse: true,changeHash: false});
            });
            $("#back-to-result").on("click", function () {
                $.mobile.changePage("#result", {transition: "slide",reverse: true,changeHash: false
                });
            });
        },

        showRestaurantList: function () {
            if (this.listCreated == false) {
                var markup;
                var menu = this.options.menu;

                _.each(this.options.restaurantCollection.models, function (r) {
                    var rv = new restaurantView({
                        model: r,
                        menu: menu
                    });
                    $("#list-container").append(rv.render().el);
                });

                $('#result').live('pageinit', function (event) {
                    $("#result").trigger("create");
                });
                this.listCreated = true;
            }
            $.mobile.changePage("#result", {transition: "turn",reverse: false,changeHash: false});
        }
    });
    return AppView;
});

