/**
 * locationHistory is a reusable module that contains everything needed to provide location history's view
 * and functionality.
 * [Depended Model/Collection]
 * 1.App.Collections.locationHistoryCollection: store the location history collection.
 *
 * @author: Kenny Chung 2013
 */
define([
    'jquery',
    'underscore',
    'util/cpCollectionViewClass',
    'text!templates/locationHistoryItemTemplate.html'
],function($,_,cpCollectionView,itemViewTemplate){
    return cpCollectionView.extend({
        tagName: "div",
        className: "b-location-history",
        dom: {},
        events: {
            "tap a":"pickAddress"
        },
        initialize: function () {
            _.bindAll(this, 'render','renderItem','show','hide','pickAddress');

            //hide itself onLoad.
            this.hide();

            this.collection = this.options.collection;
            this.collection.bind("add",this.render);

            //must call this to set ItemView class. This is the convenient way to setup item view class within
            //cpCollectionView class.
            this.createItemViewClass({
                tagName:"div",
                className:"location-item",
                template: itemViewTemplate
            });

            this.pubsub.subscribe("searchControl:showLocationHistory", this.show);
            this.pubsub.subscribe("searchControl:showAutocomplete", this.hide);
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
            var locationHistoryItemView = new view({
                model:model
            });
            this.addModule(locationHistoryItemView);
            this.$el.append(locationHistoryItemView.render().el);
        },
        show: function() {
            this.$el.removeClass("hide");
        },
        hide: function() {
            this.$el.addClass("hide");
        },
        pickAddress: function(e) {
            e.preventDefault();
            $('.location-text').val($(e.target).html());
        }
    });
});