/**
 * Search Result Container contains all modules related to search result functionality.
 * Depended Modules:
 * 1.searchSortModule.
 * 2.searchResultListModule.
 *
 * @author: Kenny Chung
 */
define([
    'jquery',
    'underscore',
    'cpView',
    'text!templates/searchResultContainerTemplate.html',
    'modules/searchSortModule',
    'modules/searchResultListModule',
    'iscroll'
],function($,_,cpView,searchResultContainerTemplate, searchSortModule, searchResultListModule){
    return cpView.extend({
        tagName: "div",
        id: "result-page",
        className: "pages",
        attributes:{"data-role":"page"},
        dom: {},
        template: _.template(searchResultContainerTemplate),
        events: {},
        initialize: function () {
            _.bindAll(this,"postDomOperation","updateScroller",'updateResultSummary');

            this.searchSortModule = new searchSortModule({collection: App.Collections.resultPaginatedCollection});
            this.addModule(this.searchSortModule);

            this.searchResultListModule = new searchResultListModule({collection: App.Collections.resultPaginatedCollection});
            this.addModule(this.searchResultListModule);

            //listen to this collecion's reset event, which happens when data is returned from server.
            App.Collections.resultPaginatedCollection.bind("reset",this.updateResultSummary);

            this.pubsub.subscribe("initialDOM:Loaded",this.postDomOperation);
            this.pubsub.subscribe("searchResultList:Updated",this.updateScroller);
            this.pubsub.subscribe("resultPage:displayed",this.updateScroller);
        },
        render: function () {
            this.$el.html(this.template);
            this.dom.sortContainer = this.$('.b-sort-container');
            this.dom.resultListContainer = this.$('.b-result-list-container #scroller');

            this.searchSortModule.renderIn(this.dom.sortContainer);
            this.searchResultListModule.renderIn(this.dom.resultListContainer);

            return this;
        },
        //this function is needed because iscroll plugin doesn't work until the dom is rendered.
        postDomOperation:function(){
            var that = this;
            setTimeout(function(){
                that.scroll = new iScroll( "wrapper",{
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
            },0);

        },
        //iscroll needs to be updated whenever the dom's content changes.
        updateScroller: function(){
            var that = this;
            setTimeout(function(){
                if(that.scroll){
                    that.scroll.refresh();
                }
            },50);
        },
        //render the information for the summary section.
        updateResultSummary:function(){
            this.$(".b-result-summary .info").empty().html("Restaurants Found:" + App.Collections.resultPaginatedCollection.totalRecords);
        }
    });
});