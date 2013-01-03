//------------------------------config.js
  /*
  alert("oh ya", isMobileDevice);
  var initApp = function() {
    if ((isDeviceReady && isJqmMobileInit) || (isJqmMobileInit && !isMobileDevice)) {
      $('body').css('visibility','visible');
      main();
    }
  };
*/
  

  //$(document).bind("deviceready", onDeviceReady, false);
  //$(document).bind('mobileinit', onMobileInit);


  //$('body').css('visibility','visible');
  //main();




  //initialize the app based on the type of browser.
  /*
  if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
    $(document).bind("deviceready", onDeviceReady, false);
    //document.addEventListener("deviceready", onDeviceReady, false);
  } else {
    onDeviceReady(); //this is the browser
  }
  $(document).bind('mobileinit', onMobileInit);
*/


  //$(document).bind('mobileinit', onMobileInit).bind("deviceready", onDeviceReady, false);
  //document.addEventListener("deviceready", onDeviceReady, false);

  //---------------main.js

        //create global namespaces for Models and Collections.
        var Models = window.Models = window.Models||{};
        var Collections = window.Collections = window.Collections||{};
        
        window.Models.autocomplete = new autocompleteModel();
        //views.searchForm = new searchFormView({autocompleteModel:models.autocomplete});
        //$("#search-page .content").append(views.searchForm.render().el);
        
        window.Collections.restaurantCollection = new restaurantCollection([new restaurant()]);
        window.Models.searchModel = new searchModel({collection: window.Collections.restaurantCollection});
        window.Models.restaurantPageModel = new restaurantPageModel();
        
        window.Routers = window.Routers||{};
        window.Routers.appRouter = new appRouter();
   
        Backbone.history.start();