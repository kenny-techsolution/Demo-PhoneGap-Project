/**
* This main function does two things:
* 1. create all collections and models needed for the entire app.
* 2. initialize the main navigation controller then start the history.
 *
* @author: Kenny Chung 2013
*/
define([
    'jquery',
    'underscore',
	'Backbone',
    'mocks/mockSetup',
    'navigations/phoneNavigationController',
    'models/locationHistoryModel',
    'util/cpCollectionModelFactory',
    'collections/locationHistoryCollection',
    'collections/resultPaginatedCollection',
    'routers/phoneRouter',
    'util/historyStackManager',
    'pubsub',
    'jqueryMobile',
    'localstorageCache',
    'pep'
    ],function($ , _, Backbone, mockSetup,phoneNavigationController, locationHistoryModel, cpCollectionModelFactory, locationHistoryCollection, resultPaginatedCollection, phoneRouter, historyStackManager, pubsub){

    return function(){

        //mock setup is used to provide fake ajax response for development purpose.
        mockSetup();

        var startApp = function() {
            App.mainNavigationController = new phoneNavigationController({resultCollection: App.Collections.resultPaginatedCollection});
            //render the navigation controller's layout.
            $("body").prepend(App.mainNavigationController.render().el).each(function(){
                //called when the Dom has been rendered.
                $(this).trigger("create");
                pubsub.publish("initialDOM:Loaded");
            });
            //manually calling jqm's page enhencement after the Dom is inserted.
            $.mobile.initializePage();
            App.historyStackManager = new historyStackManager();
            App.Routers.phoneRouter = new phoneRouter();
            Backbone.history.start();
            if(App.environment.isMobileDevice){
                navigator.splashscreen.hide();
            }
        };

        //create global namespaces for Models, Collections, and Routers.
        App.Models = App.Models || {};
        App.Collections = App.Collections || {};
        App.Routers = App.Routers || {};
        
        //initialize necessary models and collections here for the entire app.
        App.Collections.locationHistoryCollection = new locationHistoryCollection([new locationHistoryModel()]);
        //cpCollectionModelFactory class is a convinient class that allows you to create collection by configuring model on runtime.
        App.Collections.autocompleteCollection = new cpCollectionModelFactory({defaults: {keyword: ""}});
        App.Collections.resultPaginatedCollection = new resultPaginatedCollection();

        startApp();

    };
});