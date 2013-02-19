/**
 * menu Module is a reusable module that contains the view and control for a given menu model.
 * [Depended Model/Collection]
 * 1.menuModel:store the complete data for one particular menu.
 * 2.dishCollection: the collection that stores all the loaded dishes.
 *
 * @author: Kenny Chung 2013
 */
define([
    'jquery',
    'underscore',
    'cpView',
    'modules/loaderModule',
    'text!templates/menuTemplate.html'
],function($, _, cpView, loaderModule, menuTemplate) {
    return cpView.extend({
        tagName: "div",
        template: _.template(menuTemplate),
        dom: {},
        events: {
            'tap .title' : 'toggleSection',
            'tap .dish-item' : 'onDishTapHandler'
        },
        dataLoaded: false,
        initialize: function() {
            _.bindAll(this, 'render','onDataLoad','switchMenu');

            this.model = this.options.model;
            this.$el.hide().addClass("before-load");

            this.loaderModule = new loaderModule({instanceName: this.cid + "loader"});
            this.loaderModule.setNode(this.$el);
            this.addModule(this.loaderModule);

            this.dishCollection = this.options.dishCollection;

            this.model.bind("change",this.onDataLoad);
            this.pubsub.subscribe("restaurantContainer:switchMenu",this.switchMenu);
        },
        onDataLoad: function() {
            var that = this;
            this.dataLoaded = true;
            _.each(this.model.toJSON().sections,function(section){
                that.dishCollection.add(section.items);
            });
            this.pubsub.publish(this.cid + "loader:completed");
            this.render();
        },
        render: function() {
            this.$el.removeClass("before-load");
            this.$el.attr("id",this.model.id).empty().html(this.template({sections:this.model.toJSON().sections}));
            return this;
        },
        toggleSection:function(e){
            var node = $(e.target);
            if(node.hasClass("expanded")){
                node.removeClass("expanded").next().hide(50);
            } else {
                node.addClass("expanded").next().show(50);
            }
        },
        onDishTapHandler: function(e){
            var id = $(e.target).closest(".dish-item").data("dishid");
            this.pubsub.publish("menuModule:dishItemClicked",{id: id});
        },
        switchMenu: function(msg, data){
            if(data.menu==this.model.id){
                if(this.dataLoaded==false){
                    this.pubsub.publish(this.cid + "loader:started",{time:4000});
                    this.model.fetch();
                }
                this.$el.show();
            }else{
                this.$el.hide();
            }
        }
    });
});