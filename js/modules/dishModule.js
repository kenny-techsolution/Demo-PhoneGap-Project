/**
 * dish Module is a reusable module that contains the view and control for a given dish model.
 * [Depended Model/Collection]
 * 1.dishModel.
 *
 * @author: Kenny Chung
 */
define([
    'jquery',
    'underscore',
    'cpView',
    'text!templates/dishTemplate.html'
],function($,_,cpView,dishTemplate) {
    return cpView.extend({
        tagName: "div",
        className: "b-dish-view",
        template: _.template(dishTemplate),
        dom: {},
        events: {},
        initialize: function() {
            _.bindAll(this, 'render', 'hide','show');
            this.hide();
            this.model = this.options.model;
            this.model.bind("change",this.render);
        },
        render: function() {
            this.$el.empty().html(this.template({item:this.model.toJSON()}));
            return this;
        },
        show: function(){
            this.$el.show();
        },
        hide: function(){
            this.$el.hide();
        }
    });
});