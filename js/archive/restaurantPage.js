define([
    'jquery',
    'underscore',
    'Backbone'
    ],function($,_,Backbone){
    var restaurantPageModel = Backbone.Model.extend({
        urlRoot : 'http://ramin.prod.thankyoumenu.com:3080/v1/menus/',
        default: {
            "active" : "1",
            "created_at" : "",
            "deleted_at" : null,
            "description" : "",
            "id" : "1",
            "name" : "",
            "position" : "",
            "restaurant_id" : "",
            "sections" : [],
            "updated_at" : "0"
        },
        /*
        defaults:{
            name: "",
            menus: [
                { 
                    menuName: "Dinner",
                    sections: [
                        {
                            sectionName: "appertizer",
                            number: 3, 
                            items: [
                                {
                                    name: "cheese burger",
                                    price: 10,
                                    calories: 120
                                },
                                {
                                    name: "deluxe burger",
                                    price: 12,
                                    calories: 240
                                },
                                {
                                    name: "chicken sandwich",
                                    price: 14,
                                    calories: 130
                                }
                            ]
                        },
                        {
                            sectionName: "entree",
                            number: 3, 
                            items: [
                                {
                                    name: "new york strip",
                                    price: 25,
                                    calories: 120
                                },
                                {
                                    name: "roast primerib",
                                    price: 23,
                                    calories: 240
                                },
                                {
                                    name: "grilled salmon",
                                    price: 20,
                                    calories: 230
                                }
                            ]
                        }
                    ]
                }                         
            ]
        },
        */
        initialize: function(){
            

        }

    });
    
    return restaurantPageModel;
});