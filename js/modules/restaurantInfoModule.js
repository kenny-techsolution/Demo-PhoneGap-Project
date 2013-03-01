/**
 * restaurant Info module is a reusable module that render restaurant information.
 * [Depended Model/Collection]
 * 1.restaurantDetailModel.
 *
 * @author: Kenny Chung
 */
define([
    'jquery',
    'underscore',
    'cpView',
    'text!templates/restaurantInfoTemplate.html'
],function($,_,cpView,restaurantInfoTemplate) {
    return cpView.extend({
        template: _.template(restaurantInfoTemplate),
        dom: {},
        events: {},
        initialize: function() {
            _.bindAll(this, 'renderOnModelReset');
            this.model.bind("change",this.renderOnModelReset);
        },
        render: function(){
            this.$el.empty();
            return this;
        },
        //this module only render view when it's notified that restaurant detail model's data is returned.
        renderOnModelReset: function() {
            this.$el.empty().html(this.template({item:this.model.toJSON()}));
            return this;
        }
    });
});