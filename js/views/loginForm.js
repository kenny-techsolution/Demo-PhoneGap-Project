define(['jquery', 'underscore', 'Backbone', 'text!templates/loginForm.html', 'jqueryMobile', 'customJquery'], function($, _, Backbone, loginFormTemplate) {
    var loginFormView = Backbone.View.extend({
        tagName: "div",
        className: "login-form",
        template: _.template(loginFormTemplate),
        events: {
            'click .facebook-login': 'facebookLogin',
            'click .basic-login': 'basicLogin'
        },
        initialize: function() {
            _.bindAll(this, 'render');

            this.userModel = this.options.userModel;

        },
        render: function() {
            $(this.el).html(this.template({}));
            return this;
        },
        basicLogin: function(e) {
            e.preventDefault();
            var email = this.$el.find('input[name=email]').val(),
                password = this.$el.find('input[name=password]').val();

            if(password == '' || email == '') {
                alert('Please enter email and password');
                return;
            }
            $.post('http://ramin.prod.thankyoumenu.com:3080/v1/users/login', {
                json: JSON.stringify({
                    email:email,
                    password:password
                })
            }).done(function(data) {
                var json = JSON.parse(data);
                if(json.sessionID) {
                    App.Models.user.set('name', json.name)
                    App.Models.user.set('sessionID', json.sessionID);
                    Backbone.history.navigate("#home", {
                        trigger: true
                    });
                } else {
                    alert("Failed to login");
                }

            }).fail(function(response) {
                if(response.status==401){
                    alert(response.responseText);
                }
                else{
                    alert("Failed to login");
                }
                
            });
            
        },
        facebookLogin: function(e) {
            e.preventDefault();
            FB.login(

            function(response) {

                console.log(JSON.stringify(response.authResponse));
                if(response.authResponse.userId) {
                    $.post('http://ramin.prod.thankyoumenu.com:3080/v1/users/login/service/facebook', {
                        json: JSON.stringify(response.authResponse)
                    }).done(function(data) {
                       var json = JSON.parse(data);
                        if(json.sessionID) {
                            App.Models.user.set('name', json.name)
                            App.Models.user.set('sessionID', json.sessionID);
                            Backbone.history.navigate("#home", {
                                trigger: true
                            });
                        } else {
                            alert("Failed to login");
                        }
                    }).fail(function() {
                        alert("Failed to login");
                    });
                } else {
                    alert('Failed login from facebook');
                }
            }, {
                scope: "email"
            });
        },
        delay: (function() {
            var timer = 0;
            return function(callback, ms) {
                clearTimeout(timer);
                timer = setTimeout(callback, ms);
            };
        })(),
    });

    return loginFormView;
});