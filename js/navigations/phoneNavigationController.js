/**
 * This navigation controller is for phone device's screen size.
 * 1. it provides foundation html layout with navigation buttons that binds the corresponding functions.
 * 2. it creates and manages all the container controller.
 * 3. search related modules are tightly integrated in the navigation controller as seen in the header control.
 *
 * @author: Kenny Chung 2013
 */
define([
    'jquery',
    'underscore',
    'cpView',
    'text!templates/phoneNavigationTemplate.html',
    'modules/searchControlModule',
    'modules/locationHistoryModule',
    'modules/autocompleteModule',
    'modules/searchResultListModule',
    'modules/loaderModule',
    'containers/searchResultContainer',
    'containers/restaurantContainer',
    'customJquery'
],function($ , _, cpView, phoneNavigationTemplate, searchControlModule, locationHistoryModule, autocompleteModule, searchResultListModule , loaderModule, searchResultContainer, restaurantContainer){
    return cpView.extend({
        tagName: "div",
        className: "b-main-container",
        dom: {},
        template: _.template(phoneNavigationTemplate),
        events: {
            'tap .sidebar-link' : 'toggleSideBar',
            'tap .drawer': 'toggleToolBar',
            'focus input.search-text' : 'expandSearch',
            'tap .cancel': 'collapseSearch',
            'tap .b-filter-button' : 'openfilter',
            'tap .back': 'backHandler',
            'tap .home-button': 'homeButtonHandler',
            'tap .plateList-button': 'plateListButtonHandler',
            'tap .freebies-button': 'freebiesButtonHandler',
            'tap .bookmark-link': 'bookmarkLinkHandler',
            'tap .account-setting-link':'accountSettingLinkHandler'
        },
        isSidebarOpen : false,
        isToolbarOpen : false,
        initialize: function() {
            //here it binds all the functions of this object to the this variable, that can be called anywhere in this file.
            _.bindAll(this,'render','submitSearch','enableBackButton','enableSidebarButton','toggleSideBar');

            //initialize this object's variables with the passed in options variables.
            this.resultCollection = this.options.resultCollection;

            this.searchControlModule = new searchControlModule({
                locationHistoryCollection: App.Collections.locationHistoryCollection,
                autocompleteCollection: App.Collections.autocompleteCollection
            });
            this.addModule(this.searchControlModule);

            this.locationHistoryModule = new locationHistoryModule({collection: App.Collections.locationHistoryCollection});
            this.addModule(this.searchControlModule);

            this.autocompleteModule = new autocompleteModule({collection: App.Collections.autocompleteCollection});
            this.addModule(this.autocompleteModule);

            this.searchResultContainer = new searchResultContainer();
            this.addModule(this.searchResultContainer);

            this.restaurantContainer = new restaurantContainer();
            this.addModule(this.restaurantContainer);

            this.loaderModule = new loaderModule({instanceName:"searchResultLoader"});
            this.addModule(this.loaderModule);

            this.pubsub.subscribe("search:submitted",this.submitSearch);
            this.pubsub.subscribe("navigate:displayBackButton",this.enableBackButton);
            this.pubsub.subscribe("navigate:displaySidebarButton",this.enableSidebarButton);
        },
        render: function() {
            $(this.el).html(this.template({}));

            //cache the dom node here for reuse.
            this.dom.right = this.$('.right');
            this.dom.bInnerScreen = this.$('.b-inner-screen');
            this.dom.bPageContainer = this.$('.b-page-container');
            this.dom.bCancel = this.$('.icon.cancel');

            this.searchControlModule.renderIn(this.dom.right);
            this.locationHistoryModule.appendTo(this.dom.bInnerScreen);
            this.autocompleteModule.appendTo(this.dom.bInnerScreen);

            this.searchResultContainer.appendTo(this.dom.bPageContainer);
            this.restaurantContainer.appendTo(this.dom.bPageContainer);

            this.loaderModule.setNode(this.dom.bPageContainer);
            this.dom.bCancel.hide();
            this.searchControlModule.hideLocationFilter();

            //reapply the event delegation if view is rerendered.
            this.delegateEvents();
            return this;
        },
        toggleSideBar: function(e) {
            var that = this;
            e.preventDefault();
            e.stopPropagation();
            var position = (this.isSidebarOpen) ? "0px" : "277px";
            this.$("#b-top-container").animate({
                left: position
            }, 100, "swing", function() {
                that.isSidebarOpen = !that.isSidebarOpen;
            });
        },
        toggleToolBar: function(e) {
            var that = this;
            e.preventDefault();
            e.stopPropagation();
            var position = (this.isToolbarOpen) ? "0px" : "-55px";
            this.$(".b-toolbar").animate({
                bottom: position
            }, 100, "swing", function() {
                that.isToolbarOpen = !that.isToolbarOpen;
            });
        },
        expandSearch: function(){
            var that= this;
            this.$(".icon.active").hide(0,function() {
                that.$(".icon.cancel").show(10);
            });
            this.$(".b-header-control").animate({
                height: "84px"
            }, 100, "swing", function() {
                that.searchControlModule.showLocationFilter();
                that.$(".b-inner-screen").animate({opacity: 1, "z-index":2000},0);
            });
        },
        collapseSearch: function(){
            if(e){
                e.preventDefault();
                e.stopPropagation();
            }
            var that = this;
            this.$(".b-inner-screen").animate({opacity: 0, "z-index":0},100);
            this.searchControlModule.hideLocationFilter(function(){
                that.$(".b-header-control").animate({
                    height: "42px"
                }, 100, "swing", function(){
                    that.$(".icon.cancel").hide(0,function(){
                        that.$(".icon.active").show(10);
                    });
                });
            });
        },
        openfilter: function(e){
            //TODO: slide in the filter's el into the view. integrate Vahid's filter module here.
        },
        submitSearch: function(msg, data) {
            this.collapseSearch();
            this.resultCollection.server_api = data;
            this.resultCollection.pager();
            //start the loading spinner
            this.pubsub.publish("searchResultLoader:started", {time:4000});
            //navigate to the result-page.
            this.pubsub.publish("historyStack:navigateTo",{url: "#result-page"});
        },
        enableBackButton: function(){
            var that = this;
            if(this.$(".sidebar-link").hasClass("active")){
                this.$(".sidebar-link").removeClass("active").fadeOut(100,function(){
                    that.$(".back").fadeIn(100).addClass("active");
                });
            }
        },
        enableSidebarButton: function(){
            var that = this;
            if(this.$(".back").hasClass("active")){
                this.$(".back").removeClass("active").fadeOut(100,function(){
                    that.$(".sidebar-link").fadeIn(100).addClass("active");
                });
            }
        },
        //Below are all button or link handlers.
        backHandler: function(e){
            e.preventDefault();
            this.pubsub.publish("historyStack:back");
        },
        homeButtonHandler: function(e){
            e.preventDefault();
            this.pubsub.publish("historyStack:main",{url: "#home"});
        },
        plateListButtonHandler: function(e){
            e.preventDefault();
            this.pubsub.publish("historyStack:main",{url: "#plateList-page"});
        },
        freebiesButtonHandler: function(e){
            e.preventDefault();
            this.pubsub.publish("historyStack:main",{url: "#freebies-page"});
        },
        bookmarkLinkHandler: function(e){
            e.preventDefault();
            this.toggleSideBar(e);
            this.pubsub.publish("historyStack:main",{url: "#bookmark-page"});
        },
        accountSettingLinkHandler: function(e){
            e.preventDefault();
            this.toggleSideBar(e);
            this.pubsub.publish("historyStack:main",{url: "#account-setting-page"});
        }
    });
});