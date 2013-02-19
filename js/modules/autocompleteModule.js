/**
 * AutocompleteModule is a reusable module that contains everything needed to provide autocomplete's view
 * and functionality.
 * [Depended Model/Collection]
 * 1.App.Collections.autocompleteCollection: store the autocomplete string collection.
 *
 * @author: Kenny Chung 2013
 */
define([
    'jquery',
    'underscore',
    'util/cpCollectionViewClass',
    'text!templates/autocompleteTemplate.html'
],function($,_,cpCollectionView,itemViewTemplate){
    return cpCollectionView.extend({
        tagName: "div",
        className: "b-autocomplete",
        dom: {},
        events: {
            "tap a":"pickKeyword"
        },
        initialize: function () {
            _.bindAll(this, 'render','renderItem','show','hide','pickKeyword');
            this.hide();
            this.collection = this.options.collection;
            this.collection.bind("reset",this.render);
            //must call this to set ItemView class.
            this.createItemViewClass({
                tagName:"div",
                className:"autocomplete-item",
                template: itemViewTemplate
            });
            this.pubsub.subscribe("searchControl:showLocationHistory", this.hide);
            this.pubsub.subscribe("searchControl:showAutocomplete", this.show);
            this.pubsub.subscribe("searchControl:updateAutocomplete", this.render);
        },
        render: function () {
            var that = this;
            this.$el.empty();
            this.removeAllModules();
            _.each(this.collection.models, function(model){
                that.renderItem(that.itemView, model);
            });
            return this;
        },
        renderItem: function(view, model){
            var ItemView = new view({
                model:model
            });
            this.addModule(ItemView);
            this.$el.append(ItemView.render().el);
        },
        show: function() {
            this.$el.removeClass("hide");
        },
        hide: function() {
            this.$el.addClass("hide");
        },
        pickKeyword: function(e) {
            e.preventDefault();
            $('.search-text').val($(e.target).html());
        }
    });
});