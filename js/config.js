/**
* This module triggers main program with preemptive setup.
* (c) 2012 Kenny Chung
*/
require.config({
  baseUrl:'../www/js',
  paths: {
    jquery: 'libs/jquery/jquery',
    customJquery: 'util/customJquery',
    jqueryMobileConfig: 'libs/jmobile/jquery.mobile-config',
    jqueryMobile: 'libs/jmobile/jquery.mobile',
    underscore: 'libs/underscore/underscore',
    Backbone: 'libs/backbone/backbone',
    iscroll: 'libs/iscroll/iscroll',
    pep: 'libs/pep/jquery.pep.min',
    text: 'libs/require/text',
    domReady:'libs/require/domReady',
    models: 'models',
    views: 'views',
    collections: 'collections',
    templates: 'templates',
    //create alias to requirejs plugins
    async: 'libs/requirejsPlugins/async',
    depend: 'libs/requirejsPlugins/depend',
    font: 'libs/requirejsPlugins/font',
    goog: 'libs/requirejsPlugins/goog',
    image: 'libs/requirejsPlugins/image',
    json: 'libs/requirejsPlugins/json',
    noext: 'libs/requirejsPlugins/noext',
    mdown: 'libs/requirejsPlugins/mdown',
    propertyParser : 'libs/requirejsPlugins/propertyParser',
    markdownConverter : 'libs/requirejsPlugins/Markdown.Converter'
  },
  text: {
    useXhr: function (url, protocol, hostname, port) {
      // allow cross-domain requests. remote server allows CORS
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
    jqueryMobile: ['jquery','jqueryMobileConfig'],
    customJquery: ['jquery'],
    pep: ['jquery']
   }
});

//init app based on type of device. 
require(['main'], function(main) {
  var isDeviceReady = false,
      App = window.App = window.App || {};

  App.environment = { isMobileDevice: (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) ? true : false }|| {};
  
  //any necessary setup logic before calling main() goes here.
  var onDeviceReady = function() {
    main();
  };

  if(App.environment.isMobileDevice) {
    document.addEventListener("deviceready", onDeviceReady); 
  } else {
    onDeviceReady();
  }
});