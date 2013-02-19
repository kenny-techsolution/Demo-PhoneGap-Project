/**
 * searchResultListModule is a reusable module that contains everything needed to provide search result list's view
 * and functionality.
 * [Depended Model/Collection]
 * 1.App.Collections.searchPaginatedCollection: store the search result, calling our search API.
 *
 * @author: Kenny Chung 2013
 */
define([
    'jquery',
    'underscore',
    'util/cpCollectionViewClass',
    'text!templates/searchResultListItemTemplate.html'
],function($,_,cpCollectionView, searchResultListItemTemplate){
    return cpCollectionView.extend({
        dom: {},
        events: {
             'tap .result-item': 'viewRestaurant'
        },
        initialize: function () {
            _.bindAll(this, 'render','renderItem','show','hide');

            this.collection = this.options.collection;
            this.collection.bind("add",this.render);
            this.collection.bind("reset",this.render);
            //must call this to set ItemView class.
            this.createItemViewClass({
                tagName:"div",
                className:"result-item",
                template: searchResultListItemTemplate
            });
        },
        render: function () {
            var that = this;
            this.$el.empty();
            this.removeAllModules();
            _.each(this.collection.models, function(model){
                that.renderItem(that.itemView, model);
            });
            this.pubsub.publish("searchResultLoader:completed");
            this.pubsub.publish("searchResultList:Updated");
            return this;
        },
        renderItem: function(view, model){
            var searchResultListItemView = new view({
                model:model
            });
            this.addModule(searchResultListItemView);
            this.$el.append(searchResultListItemView.render().el);
        },
        show: function() {
            this.$el.removeClass("hide");
        },
        hide: function() {
            this.$el.addClass("hide");
        },
        viewRestaurant: function(e){
            var id=$(e.target).closest(".data-attribute").data("restaurantid");
            //navigate to restaurant page with the restaurant id.
            this.pubsub.publish("historyStack:navigateTo",{url: "#restaurant-page/"+id});
        }
    });
});