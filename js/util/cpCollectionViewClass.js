/**
 * cpCollectionViewClass provides convenient way to create collecion that includes a simple item view object.
 * it implements template pattern.
 *
 * @author: Kenny Chung
 */
define([
    'jquery',
    'underscore',
    'cpView',
    'util/cpItemViewFactory',
    'pubsub'
],function($,_,cpView,cpItemViewFactory,pubsub) {
    return cpView.extend({
        children: {},
        counter: 0,
        pubsub: pubsub,
        initialize: function() {
            _.bindAll(this,'render');
        },
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
        close: function() {
            for(var index in this.children) {
                this.removeModule(index);
            }
            this.remove();
        },
        createItemViewClass:function(initObj){
            this.itemView = cpItemViewFactory(initObj);
        }
    });
});