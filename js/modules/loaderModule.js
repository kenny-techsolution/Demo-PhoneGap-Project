/**
 * loaderModule is a reusable module that generate loading spinner within the given el. It contains a timer that
 * is configured through the broadcast call. When the loading spinner has not been notified beyond the time set.
 * it will trigger the errorHandler.
 * instanceName is a unique name that identify the particular loader object. this is needed to respond to broadcast
 * from different modules with different target loader object.
 *
 * @author: Kenny Chung 2013
 */
define([
    'jquery',
    'underscore',
    'cpView',
    'customJquery'
],function($,_,cpView){
    return cpView.extend({
        setNode: function(el){
            this.$el= el;
        },
        initialize: function () {
            _.bindAll(this, 'render','load','unload','handleError');
            this.instanceName = this.options.instanceName;
            this.pubsub.subscribe(this.instanceName + ":started", this.load);
            this.pubsub.subscribe(this.instanceName + ":stopped", this.unload);
            this.pubsub.subscribe(this.instanceName + ":completed", this.unload);
        },
        load: function(msg, data){
            var that = this;
            this.$el.addLoadingSpinner();

            this.time = data.time;
            if(this.timer){
                clearTimeout(this.timer);
                this.timer ={};
            }

            this.timer = setTimeout(function(){
                that.handleError();
            },this.time);
        },
        unload: function(){
            if(this.timer){
                clearTimeout(this.timer);
                this.timer ={};
            }
            this.$el.removeLoadingSpinner();
        },
        handleError: function(){
            this.$el.removeLoadingSpinner();
            console.log(this.instanceName + "loading takes too long");
            //TODO: do something here for error handler
        }
    });
});