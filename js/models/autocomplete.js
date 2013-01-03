define([
    'jquery',
	'underscore',
	'Backbone'
	],function($,_,Backbone){
    var autocompleteModel = Backbone.Model.extend({
        defaults:{
            resultList: new Object()
        },
        cache: [],
        reset: function() {
            this.cache = [];
        },
        xhr: {},
        cacheNum: 0,
        updateByPrefix: function(prefix){
            if(this.cacheNum > 0){
                if(!this.cache[prefix]) {
                    this.getResultsFromAjax(prefix);
                }else{
                    var cachedResults = this.cache[prefix];
                    console.log("cache result",prefix);
                    this.storeModelAttributes(prefix, cachedResults);
                }
            } else {
                this.getResultsFromAjax(prefix);
            }
        },
        getResultsFromAjax: function(prefix){
            var fakeAjaxArray = [],len=6;
            for (var i = 0; i < len; i++) {
                fakeAjaxArray.push(i+prefix);
            }
            this.storeModelAttributes(prefix, fakeAjaxArray);

            /* this will replace the above code.
            if(this.xhr!={}){
                this.xhr.abort();
            }
            this.xhr = $.ajax({
                url: "api/search",
                data: {prefix: prefix},
                dataType: "json"
            }).done(function(data){
                this.storeModelAttributes(data);
            });
            */
        },
        storeModelAttributes: function(prefix, attributes){
            this.set({resultList:attributes});
            if(this.cacheNum==30){
                this.cache.shift();
            }
            this.cache[prefix]=attributes;
            this.cacheNum++;
        }
    });
    
    return autocompleteModel;
});