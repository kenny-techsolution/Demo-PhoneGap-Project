/**
 * history stack manager manages a history stack. and allows for history stack reset. and call the history.navigate
 * to move to pages. This will allows customized history routes. which is suitable for mobile phone navigation.
 * Depended Model/Collection:
 *
 * @author: Kenny Chung
 */
define([
    'jquery',
    'underscore',
    'cpView',
    'customJquery'
],function($,_,cpView){
    return cpView.extend({
        historyStack: ["#home"],
        initialize: function () {
            _.bindAll(this, 'addToStack','popFromStack');
            this.pubsub.subscribe("historyStack:navigateTo",this.addToStack);
            this.pubsub.subscribe("historyStack:back",this.popFromStack);
            this.pubsub.subscribe("historyStack:main",this.clearStack);
        },
        addToStack: function(msg,data){
            var url = data.url;
            this.historyStack.push(url);
            Backbone.history.navigate(url,{trigger: true});
        },
        popFromStack: function(){
            var url = this.historyStack.pop();
            Backbone.history.navigate(url,{trigger: true});
        },
        clearStack: function(msg,data){
            this.historyStack= ["#home"];
            Backbone.history.navigate(data.url,{trigger: true});
        }
    });
});