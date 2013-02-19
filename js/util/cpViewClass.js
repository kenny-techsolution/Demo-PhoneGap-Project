/**
 * cpView implement composite pattern that manages sub modules lifecycle. and provides several useful methods.
 *
 * @author: Kenny Chung
 */
define([
    'jquery',
    'underscore',
    'Backbone',
    'pubsub'
],function($,_,Backbone,pubsub) {
    return Backbone.View.extend({
        children: {},
        counter: 0,
        pubsub: pubsub,
        initialize: function() {},
        addModule: function(module) {
            this.children[module.cid] = module;
        },
        removeModule: function(module) {
            module.remove();
            module.unbind();
            if(module){
                module.model.unbind();
            }
            module = null;
        },
        removeModuleByCid: function(cid) {
            var selectedModule = this.children[module.cid];
            this.removeModule(selectedModule);
        },
        removeAllModules: function() {
            var that = this;
            _.each(this.children, function(child){
                that.removeModule(child);
            });
            this.children = {};
        },
        appendTo: function(node){
            node.append(this.render().el);
        },
        renderIn: function(node) {
            this.setElement(node).render();
        },
        attachEl: function(node){
            node.append(this.el);
        },
        close: function() {
            for(var index in this.children) {
                this.removeModule(index);
            }
            this.remove();
        }
    });
});