var jqm_mobile_init = false;

require.config({
  baseUrl:'../www/js',
  paths: {
    jquery: 'libs/jquery/jquery',
    jqueryMobileConfig: 'libs/jmobile/jquery.mobile-config',
    jqueryMobile: 'libs/jmobile/jquery.mobile',
    underscore: 'libs/underscore/underscore',
    Backbone: 'libs/backbone/backbone',
    text: 'libs/require/text',
    domReady:'libs/require/domReady',
    models: 'models',
    views: 'views',
    collections: 'collections',
    templates: 'templates'
  },
  text: {
    useXhr: function (url, protocol, hostname, port) {
      // allow cross-domain requests
      // remote server allows CORS
      return true;
    }
  },
  shim:{
    Backbone:{
        deps:['underscore', 'jquery'],
        exports:'Backbone'
    },
    underscore:{
        exports:'_'
    },
    jqueryMobile: ['jquery','jqueryMobileConfig']
   }
   
});

require(['jquery','main'],function($,main){
  var device_ready = false;
  
  var initApp = function() {
    if ((device_ready && jqm_mobile_init) || (jqm_mobile_init && !mobile_system)) {      
      $('body').css('visibility','visible');
      main();
    }
  };

  var onDeviceReady = function() {
    device_ready = true;
    initApp();
  };

  /*
  var onMobileInit = function() {
    $.support.cors = true;
    $.mobile.allowCrossDomainPages = true;
    jqm_mobile_init = true;
    initApp();
  };

  $(document).bind('mobileinit', onMobileInit);
  */
  
  document.addEventListener("deviceready", onDeviceReady, false);
});