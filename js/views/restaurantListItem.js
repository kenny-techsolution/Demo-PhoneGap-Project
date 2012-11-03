var myScroll;
define([
    'jquery',
    'underscore',
	'Backbone',
    'views/menuListItem',
	'text!templates/restaurantRow.html',
    'jqueryMobile',
    'iscroll'
	],function($,_,Backbone,dishView,restaurantRowTemplate){
    var restaurantListItemView = Backbone.View.extend({
        tagName: "li",
        className: "restaurant-row",
        attributes: {
            "data-corners": 'false'
        },
        listCreated: false,
        template: _.template(restaurantRowTemplate),
        events: {
            "click": "showMenu"
        },
        menu:{},
        initialize: function () {},
        render: function () {
            $(this.el).html(this.template(this.model.attributes));
            return this;
        },
        showMenu: function (event) {
            $("#menu-container").html("");
            _.each(this.options.menu.models, function (r) {
                var rv = new dishView({
                    model: r
                });
                $("#menu-container").append(rv.render().el);
            });
            this.listCreated=true;

            $('#menu').live('pageinit', function (event) {
                $("#menu-container").trigger("create");
            });
            $.mobile.changePage("#menu", {transition: "slide",reverse: false,changeHash: false});
            //setTimeout(function(){myScroll.refresh()},100);
            function loaded(){
            console.log("iscroll");
            console.log(iScroll);
                  myScroll= new iScroll('wrapper',{
                  //snap: 'li',     // Would snap logically
                  // Snaps to each "P" tag
                  momentum: true,
                  hScrollbar: false,
                  vScrollbar: true,
                  hideScrollbar:false
                });
                console.log(myScroll);
            }
            loaded();
            document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
            
            //document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);
        }
    });
    
    return restaurantListItemView;
});

