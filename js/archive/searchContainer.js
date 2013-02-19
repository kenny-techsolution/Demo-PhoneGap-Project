/**
* Search Container contains all modules related to search functionality.
* Depended Modules:
* 1.searchControlModule: including search control and search form.
* 2.locationHistoryModule: view that store all the entered address with valid geocode.
* 3.autocompleteModule: handle autocomplete view and functionality.
* @author: Kenny Chung
*/
define([
    'jquery',
    'underscore',
    'cpView',
    'text!libs/templates/searchContainerTemplate.html',
    'modules/searchControlModule',
    'modules/locationHistoryModule',
    'modules/autocompleteModule'
],function($,_,cpView,searchCompositeTemplate, searchControlModule, locationHistoryModule, autocompleteModule){
    return cpView.extend({
        tagName: "div",
        className: "b-search-container",
        dom: {},
        template: _.template(searchCompositeTemplate),
        events: {
        },
        initialize: function () {
            this.searchControlModule = new searchControlModule({
                locationHistoryCollection: App.Collections.locationHistoryCollection,
                autocompleteCollection: App.Collections.autocompleteCollection
            });
            this.addModule(this.searchControlModule);

            this.locationHistoryModule = new locationHistoryModule({collection: App.Collections.locationHistoryCollection});
            this.addModule(this.searchControlModule);

            this.autocompleteModule = new autocompleteModule({collection: App.Collections.autocompleteCollection});
            this.addModule(this.autocompleteModule);
        },
        render: function () {
            this.$el.html(this.template);
            this.dom.searchControlFrame = this.$('.b-search-control');
            this.dom.searchFeedbackFrame = this.$('.b-search-feedback');

            this.searchControlModule.renderIn(this.dom.searchControlFrame);
            this.locationHistoryModule.appendTo(this.dom.searchFeedbackFrame);
            this.autocompleteModule.appendTo(this.dom.searchFeedbackFrame);
            return this;
        }
    });
});