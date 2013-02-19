define([
    'jquery',
    'underscore',
    'cpView',
    'text!libs/templates/searchContainerTemplate.html',
    'search/searchControlView',
    'search/locationHistoryView',
    'search/autocompleteView'
],function($,_,cpView,searchCompositeTemplate, searchControlView, locationHistoryView, autocompleteView){
    return cpView.extend({
        tagName: "div",
        className: "b-search-composite-view",
        dom: {},
        template: _.template(searchCompositeTemplate),
        events: {
        },
        initialize: function () {
            this.searchControlView = new searchControlView({
                locationHistoryCollection: App.Collections.locationHistoryCollection,
                autocompleteCollection: App.Collections.autocompleteCollection
            });
            this.addModule(this.searchControlView);
            this.locationHistoryView = new locationHistoryView({collection: App.Collections.locationHistoryCollection});
            this.addModule(this.searchControlView);

            this.autocompleteView = new autocompleteView({collection: App.Collections.autocompleteCollection});
            this.addModule(this.autocompleteView);
        },
        render: function () {
            this.$el.html(this.template);
            this.dom.searchControlFrame = this.$('.b-search-control');
            this.dom.searchFeedbackFrame = this.$('.b-search-feedback');

            this.searchControlView.renderIn(this.dom.searchControlFrame);
            this.locationHistoryView.appendTo(this.dom.searchFeedbackFrame);
            this.autocompleteView.appendTo(this.dom.searchFeedbackFrame);
            return this;
        }
    });
});