/**
 * search sort module is a reusable module that contains everything needed to provide sort bar's UI and controller logic.
 * [Depended Model/Collection]
 * 1.App.Collections.resultPaginatedCollection: store the paginated result from search API.
 *
 * @author: Kenny Chung 2013
 */
define([
    'jquery',
    'underscore',
    'cpView',
    'text!templates/searchSortTemplate.html'
],function($,_,cpView,searchSortTemplate) {
    return cpView.extend({
        template: _.template(searchSortTemplate),
        dom: {},
        //TODO: to add more.
        events: {
            'tap .rating': 'sortByRating'
        },
        //TODO: should be moved to utility class.
        _delay: (function() {
            var timer = 0;
            return function(callback, ms){
                clearTimeout (timer);
                timer = setTimeout(callback, ms);
            };
        })(),
        initialize: function() {
            _.bindAll(this, 'render');
            this.collection = this.options.collection;
        },
        render: function() {
            this.$el.html(this.template);
            return this;
        },
        sortByRating: function(){
            this.collection.setSort("restaurantRating", "desc");
        }
    });
});