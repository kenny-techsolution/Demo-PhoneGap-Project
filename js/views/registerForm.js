define(['jquery', 'underscore', 'Backbone', 'text!templates/registerForm.html', 'jqueryMobile', 'customJquery'], function($, _, Backbone, registerFormTemplate) {
    var registerFormView = Backbone.View.extend({
        tagName: "div",
        className: "register-form",
        template: _.template(registerFormTemplate),
        events: {
            'click .basic-register': 'basicRegister'
        },
        initialize: function() {
            _.bindAll(this, 'render');


        },
        render: function() {
            $(this.el).html(this.template({}));
            return this;
        },
        basicRegister: function(e) {
            e.preventDefault();
            var email = this.$el.find('input[name=email]').val(),
                password = this.$el.find('input[name=password]').val(),
                password_repeat = this.$el.find('input[name=password_repeat]').val();

                

            if(password == '' || email == '') {
                alert('Please enter email , password and repeat password');
                return;
            }
            if(password!=password_repeat){
                alert('Password and repeat password must be same');
                return;
            }
            $.post('http://ramin.prod.thankyoumenu.com:3080/v1/users', {
                json: JSON.stringify({
                    email:email,
                    password:password,
                    password_repeat:password_repeat

                })
            }).done(function(data) {
                if(data=='OK'){
                    alert('Successfully register - please login');
                     Backbone.history.navigate("#home",{trigger: true});
                }
                else{
                    alert("Failed to register");
                }

            }).fail(function(request) {
                if(request.status==400){
                    var json = JSON.parse(request.responseText),
                        error=[];
                    for(var i in json){
                        error.push(json[i]);
                    }
                    alert(error.join("\n"));
                }
                else{
                    alert("Failed to register - server not response");
                }
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

    return registerFormView;
});