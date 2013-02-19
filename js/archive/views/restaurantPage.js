//restaurant page contains multiple menu
define([
    'jquery',
	'underscore',
	'Backbone',
    'pubsub',
    'text!templates/restaurantPage.html',
    'jqueryMobile',
    'iscroll',
    'pep'
	],function($,_,Backbone,ps,restaurantTemplate){
    var restaurantPageView = Backbone.View.extend({
        tagName: "div",
        template: _.template(restaurantTemplate),
        events: {
            'tap .title':'toggleSection',
            'tap .back':'backHistory',
            'tap li' : 'openDishView'
        },
        initialize: function () {
            _.bindAll(this,'render','renderTest');
            this.model= this.options.model;
            this.model.bind("change", this.renderTest);

            //init for the dish view list
            var that = this;
            setTimeout(function(){
                that.scroll = new iScroll('wrapper2',{
                    momentum: true,
                    hScrollbar: false,
                    vScrollbar: true,
                    hideScrollbar: true,
                    fadeScrollbar: true,
                    bounce: true,
                    fixedScrollbar: false
                });
                
                document.addEventListener('touchmove', function (e) {
                    e.preventDefault();
                }, false);

            },500);
            
        },
        renderTest: function(){
            console.log("test render");
            console.log(this.model.get("sections"));
        },
        render: function(){
            $(this.el).empty();
            //$(this.el).html(this.template({name:this.model.get("name"),menus:this.model.get("menus")}));
            console.log("AAAAAAA",this.model.get("description"));
            Backbone.history.navigate("#restaurant",{trigger: true});
            return this;
        },
        toggleSection:function(event){
            var $currentNode = $(event.target);
            if($currentNode.hasClass("expanded")){
                $currentNode.removeClass("expanded").next().hide(100);
            } else {
                $currentNode.addClass("expanded").next().show(100);
            }
        },
        backHistory: function(e){
            e.preventDefault();
            $.mobile.changePage( "#result-page" , { transition: "slide", reverse:true, changeHash: true});
        },
        openDishView: function(e){
            e.preventDefault();
            console.log("open ya");
            $(".b-pep-container").animate({
                        left: "20px"
                    }, 100, "swing", function() {
                        console.log("should move");
                        $.pep.toggleById(true,1);
                    });
            var that= this;
            setTimeout(function(){
               that.scroll.refresh();
            },100);
            ps.publish("testyo");
        }
    });
    return restaurantPageView;
});