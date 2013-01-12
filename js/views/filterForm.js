define([
    'jquery',
	'underscore',
	'Backbone',
	'text!templates/filterForm.html',
    'collections/location',
    'models/location',
    'views/locationHistory',
    'models/filter',
    'jqueryMobile',
    'customJquery'
	],function($,_,Backbone,filterFormTemplate,locationCollection, locationModel, locationView, filterModel){
    var filterFormView = Backbone.View.extend({
        tagName: "div",
        className: "b-search-form",
        template: _.template(filterFormTemplate),
        events: {
            'click #filter-submit':'setupFilterQuery',
            'click .cancel': 'backHistory'
        },
        seachModel: {},
        currentLocation: {},
        filterString: "",
        address: "",
        phoneLatitude: 0,
        phoneLongitude: 0,
        initialize: function () {
            _.bindAll(this, 'render','setupFilterQuery','submitFilterQuery');
            

            //initialized filter model
            this.filterModel = this.options.filterModel;

        },
        render: function () {
            var $el=$(this.el);
            $(this.el).html(this.template(this.filterModel.toJSON()));
            
            //delay to  render slider
            this.delay(function(){
                $el.find('#price_min').on('change',function() {
                var min = parseFloat($(this).val());
                var max = parseFloat($el.find('#price_max').val());
                
                if(min > max) {
                  $el.find('#price_max').val(min);
                  $el.find('#price_max').slider('refresh');  
                }
            });
            
            $el.find('#price_max').change(function() {
                var min = parseFloat($el.find('#price_min').val());
                var max = parseFloat($(this).val());
                if(min > max) {
                  $el.find('#price_min').val(max);
                  $el.find('#price_min').slider('refresh');  
                }
            });

        },500);
            

            return this;
        },
        delay: (function() {
            var timer = 0;
            return function(callback, ms){
                clearTimeout (timer);
                timer = setTimeout(callback, ms);
            };
        })(),
        setupFilterQuery: function(e) {
            e.preventDefault();
            var me=this,values=$(me.el).find('form:first-child').serializeArray();
            _.each(values,function(val){
                    me.filterModel.set(val.name,val.value)
            })
            this.submitFilterQuery();

        },
        
        submitFilterQuery:function(filterString, lat, lng){
            //TODO filter collection
            
            Backbone.history.navigate("#result",{trigger: true});
        },
        backHistory: function(e) {
            e.preventDefault();
            Backbone.history.navigate("#result",{trigger: true});
        }
    });
    
    return filterFormView;
});