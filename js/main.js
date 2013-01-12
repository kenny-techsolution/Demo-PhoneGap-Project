/**
* This module does two things:
* 1. setup basic app frame interaction.
* 2. create all collections and models needed for the entire app.
* (c) 2012 Kenny Chung
*/
define([
    'jquery',
	'underscore',
	'Backbone',
    'models/search',
    'models/filter',
    'models/autocomplete',
    'models/restaurant',
    'collections/restaurant',
    'models/restaurantPage',
    'routers/app',
    'jqueryMobile',
    'pep'
    ],function($ , _, Backbone, searchModel, filterModel, autocompleteModel, restaurant, restaurantCollection, restaurantPageModel, appRouter){

    return function(){

        //TODO: just a temporary solution before we make it into a view.
        //this function activate the tap to slide and tap to close for the sidebar menu.
        var setupSideBarMenuControl = function() {
            var isSidebarOpen;
         
            $("a.sidebar-link").click(function(e) {
                e.preventDefault();
                if (isSidebarOpen !== true) {
                    $(".b-top-container").animate({
                        left: "277px"
                    }, 100, "swing", function() {
                        isSidebarOpen = true;
                        $.pep.toggleAll(true);
                    });
                }
                return false;
            });

            $('.b-top-container').pep({
                                axis:'x',
                                constrainToParent: true,
                                stop: function(e,obj) {
                                    $(obj.el).animate({
                                        left: "0px"
                                    }, 10, "swing", function() {
                                        isSidebarOpen = false;
                                        $.pep.toggleAll(false);
                                    });
                                }
                                });
            $.pep.toggleAll(false);

            
            $('div[data-role="page"]').live('pagebeforeshow', function(e) {
                isSidebarOpen = false;
                $(".b-top-container").animate({
                                        left: "0px"
                                    }, 100, "swing", function () {
                                        isSidebarOpen = false;
                                        $.pep.toggleAll(false);
                                    });
            });
        };

        //TODO: just a temporary solution before we make it into a view.
        //this function activate popover control.
        var setUpPopOvers = function() {
            $(".icon.incomplete-order").on("click",function(event){
                event.preventDefault();
               $(".b-popover.incomplete-order").toggle();
            });
        };

        var startApp = function() {
            App.Routers.appRouter = new appRouter();
            Backbone.history.start();
        };

        setupSideBarMenuControl();
        setUpPopOvers();

        //create global namespaces for Models, Collections, and Routers.
        App.Models = App.Models || {};
        App.Collections = App.Collections || {};
        App.Routers = App.Routers || {};
        
        //initialize all models and collections here for the entire app.
        App.Collections.restaurantCollection = new restaurantCollection([new restaurant()]);
        App.Models.searchModel = new searchModel({collection: App.Collections.restaurantCollection});
        App.Models.filterModel = new filterModel({});
        App.Models.autocomplete = new autocompleteModel();

        App.Models.restaurantPageModel = new restaurantPageModel();

        //TODO: to be fixed-quirk in phonegap that pageinit is not triggered.
        if(!App.environment.isMobileDevice){
            $(document).on("pageinit",function() {
                $(document).off("pageinit");
                startApp();
            });
        } else {
            startApp();
            navigator.splashscreen.hide();
        }
    };
});