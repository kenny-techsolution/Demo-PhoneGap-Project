define([
    'jquery',
    'underscore',
    'util/cpCollectionViewClass',
    'text!libs/templates/locationHistoryItemTemplate.html'
],function($,_,cpCollectionView,itemViewTemplate){
    return cpCollectionView.extend({
        tagName: "div",
        className: "b-location-history",
        dom: {},
        events: {
        },
        initialize: function () {
            _.bindAll(this, 'render','renderItem','show','hide');
            this.hide();
            this.pubsub.subscribe("searchControl:showLocationHistory", this.show);
            this.pubsub.subscribe("searchControl:showAutocomplete", this.hide);
            this.collection = this.options.collection;
            this.collection.bind("add",this.render);
            //must call this to set ItemView class.
            this.createItemViewClass({
                tagName:"div",
                className:"location-item",
                template: itemViewTemplate
            });
        },
        render: function () {
            this.$el.empty();
            var that = this;
            _.each(this.collection.models, function(model){
                that.renderItem(that.itemView, model);
            }, this);
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
        }
    });
});