define([
    'jquery',
    'underscore',
    'cpView',
    'search/locationHistoryItemView'
],function($,_,cpView,locationHistoryItemView){
    return cpView.extend({
        tagName: "div",
        className: "b-location-history",
        dom: {},
        events: {
        },
        initialize: function () {
            _.bindAll(this, 'render','renderItem','show','hide');
            this.hide();
            this.pubsub.subscribe("searchForm:showLocationHistory", this.show);
            this.pubsub.subscribe("searchForm:showAutocomplete", this.hide);
            this.collection = this.options.collection;
            this.collection.bind("add",this.render);
        },
        render: function () {
            this.$el.empty();
            var that = this;
            _.each(this.collection.models, function(model){
                that.renderItem(locationHistoryItemView, model);
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