/**
 * restaurant Container contains all modules related to restaurant page functionality, including restaurant info
 * restaurant menus, and dish detail view.
 * [Manages Modules]
 * 1.dishModule
 * 2.menuModule.
 * 3.restaurantInfoModule.
 *
 * @author: Kenny Chung 2013
 */
define([
    'jquery',
    'underscore',
    'cpView',
    'text!templates/restaurantContainerTemplate.html',
    'models/restaurantDetailModel',
    'models/menuModel',
    'models/dishModel',
    'modules/restaurantInfoModule',
    'modules/menuModule',
    'modules/dishModule',
    'modules/loaderModule',
    'collections/dishCollection',
    'iscroll'
],function($, _, cpView, restaurantContainerTemplate, restaurantDetailModel, menuModel, dishModel, restaurantInfoModule, menuModule, dishModule, loaderModule, dishCollection){
    return cpView.extend({
        tagName: "div",
        id: "restaurant-page",
        className: "pages",
        attributes:{"data-role":"page"},
        dom: {},
        template: _.template(restaurantContainerTemplate),
        events: {
            'tap .menu': "tabHandler"
        },
        model:{},
        restaurantInfoModule: {},
        menuModules: [],
        initialize: function () {
            _.bindAll(this,"loadMenus","setupSwipeableControl",'switchMenu','tabHandler','openDishView','setRestaurantId','onRestaurantModelLoad');

            this.dishModel = new dishModel();
            this.dishCollection = new dishCollection();
            this.menuModel = menuModel;
            this.menuModule = menuModule;
            this.loaderModule = new loaderModule({instanceName:"restaurantResultLoader"});
            this.dishModule = new dishModule({model:this.dishModel});

            //this is how restaurant container knows which restaurant to load.
            this.pubsub.subscribe("router:switchToRestaurantWithId",this.setRestaurantId);
        },
        setRestaurantId: function(msg, data){
            this.pubsub.publish("restaurantResultLoader:started",{time:4000});
            this.model = new restaurantDetailModel()||{};
            this.model.id = data.id;

            this.restaurantInfoModule = new restaurantInfoModule({model:this.model})||{};
            this.addModule(this.restaurantInfoModule);

            this.model.bind("change",this.onRestaurantModelLoad);

            this.restaurantInfoModule.renderIn(this.dom.infoContainer);
            this.model.fetch();
        },
        onRestaurantModelLoad: function(){
            this.pubsub.publish("restaurantResultLoader:completed");
            this.loadMenus();
        },
        render: function () {
            this.$el.html(this.template);

            this.dishModule.appendTo(this.$(".pep-node"));
            this.loaderModule.setNode(this.$(".content"));
            this.dom.infoContainer = this.$('.b-info-container');
            this.setupSwipeableControl();

            return this;
        },
        //this function initialize the menu view and loads the default menu for the restaurant.
        loadMenus: function() {
            var that = this;
            var menuIDs = this.model.toJSON().menus;
            var defaultMenu = this.model.toJSON().defaultMenu;

            this.$(".b-content-group").empty();
            this.$(".b-tab-group").empty();
            _.each(that.menuModules, function(menuModule){
                that.removeModule(menuModule);
            });
            that.menuModules = [];
            _.each(menuIDs,function(id, index){
                var menuModel = new that.menuModel();
                menuModel.id = id;
                var menuModule = new that.menuModule({model:menuModel,dishCollection:that.dishCollection});
                that.addModule(menuModule);
                that.menuModules.push(menuModule);

                that.pubsub.subscribe("menuModule:dishItemClicked",that.openDishView);

                //render tabs.
                that.$(".b-tab-group").append('<div class="menu" data-menuId="'+id+'">' + "Menu " + index + '</div>');

                menuModule.attachEl(that.$(".b-content-group"));
                //fetch the default menu only.
                if(id==defaultMenu){
                    menuModel.fetch();
                }
            });
            this.switchMenu(that.menuModules[0].model.id);
        },
        //this function will enable user to swipe close the dish view.
        setupSwipeableControl: function(){
            var that = this;
            this.$('.pep-node').pep({
                axis:'x',
                constrainToParent: true,
                stop: function(e,obj) {
                    //close the dish view only when user drag over more than 20px.
                    if(obj.pos.x>20){
                        that.$('.b-pep-container').hide();
                        that.$('.b-pep-container').animate({
                            left: "320px"
                        }, 10, "swing", function() {
                            $.pep.toggleById(false,0);
                        });
                        $(obj.el).animate({
                            left: "0px"
                        }, 10, "swing", function() {
                            $.pep.toggleById(true,0);
                        });
                    }else {
                        $(obj.el).animate({
                            left: "0px"
                        }, 10, "swing", function() {
                            $.pep.toggleById(true,0);
                        });
                    }
                }
            });
        },
        tabHandler: function(e){
            var id = $(e.target).data("menuid");
            this.switchMenu(id);
        },
        switchMenu: function(id){
            $(".menu").removeClass("active");
            $('[data-menuid="'+id+'"]').addClass("active");
            this.pubsub.publish("restaurantContainer:switchMenu",{menu:id});
        },
        openDishView: function(msg,data){
            this.$('.b-pep-container').show().animate({
                left: "40px"
            }, 100, "swing", function() {
                $.pep.toggleById(true,0);
            });
            this.dishModel.clear();
            this.dishModel.set(this.dishCollection.get(data.id).toJSON());
            this.dishModule.show();
        }
    });
});