/**
 * result paginated collection is a subclass of Backbone.Paginator class.
 * it provides functionality of sort, filter, paging for the search API.
 * for detail explanation, refers to https://github.com/addyosmani/backbone.paginator
 *
 * @author: Kenny Chung 2013
 */
define([
    'jquery',
    'underscore',
    'paginator',
    'models/restaurantModel'
],function($,_,paginator,result){
    return Backbone.Paginator.requestPager.extend({
        model: result,
        paginator_core: {
            type: 'GET',
            dataType: 'json',
            url: 'http://ramin.prod.thankyoumenu.com:3080/v1/search?'
        },
        paginator_ui: {
            // the lowest page index your API allows to be accessed
            firstPage: 1,

            // which page should the paginator start from
            // (also, the actual page the paginator is on)
            currentPage: 1,

            // how many items per page should be shown
            perPage: 10,

            // a default number of total pages to query in case the API or
            // service you are using does not support providing the total
            // number of pages for us.
            // 10 as a default in case your service doesn't return the total
            totalPages: 10
        },
        server_api: {
            // the query field in the request
            'query': 'burger',
            // number of items to return per request/page
            'limit': function() { return this.perPage },

            // how many results the request should skip ahead to
            // customize as needed. For the Netflix API, skipping ahead based on
            // page * number of results per page was necessary.
            'offset': function() { return (this.currentPage - 1) * this.perPage },
            'sort': 'price',
            'filter': 'spicy',
            'distance': 10
        },
        parse: function (response) {
            var tags = response.results;
            this.totalPages = response.pageCount;
            this.totalRecords = response.count;
            return tags;
        }
    });
});