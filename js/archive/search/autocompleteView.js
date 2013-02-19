define([
    'jquery',
    'underscore',
    'util/cpCollectionViewClass',
    'text!libs/templates/autocompleteTemplate.html'
],function($,_,cpCollectionView,itemViewTemplate){
    return cpCollectionView.extend({
        tagName: "div",
        className: "b-autocomplete",
        dom: {},
        events: {
        },
        initialize: function () {
            _.bindAll(this, 'render','renderItem','show','hide');
            this.hide();
            this.pubsub.subscribe("searchControl:showLocationHistory", this.hide);
            this.pubsub.subscribe("searchControl:showAutocomplete", this.show);
            this.pubsub.subscribe("searchControl:updateAutocomplete", this.render);
            this.collection = this.options.collection;
            this.collection.bind("reset",this.render);
            //must call this to set ItemView class.
            this.createItemViewClass({
                tagName:"div",
                className:"autocomplete-item",
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
        }
    });
});