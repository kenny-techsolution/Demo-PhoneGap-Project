/**
* This module triggers main program with preemptive setup.
* @author: Kenny Chung 2013
*/
require.config({
  baseUrl:'../www/js',
  paths: {
    jquery: 'libs/jquery/jquery',
    customJquery: 'util/customJquery',
    jqueryMobileConfig: 'libs/jmobile/jquery.mobile-config',
    jqueryMobile: 'libs/jmobile/jquery.mobile',
    underscore: 'libs/underscore/underscore',
    Backbone: 'libs/backbone/backbone-latest',
    cpView: 'util/cpViewClass',
    util:'util',
    iscroll: 'libs/iscroll/iscroll',
    pep: 'libs/pep/jquery.pep.min',
    pubsub: 'libs/pubsubjs/pubsub',
    paginator: 'libs/paginator/backbone-paginator',
    mockjax: 'libs/mockjax/mockjax',
    modernizr: 'libs/modernizr/modernizr',
    localstorageCache: 'libs/localstorageCache/localstorageCache',
    text: 'libs/require/text',
    domReady:'libs/require/domReady',
    models: 'models',
    modules: 'modules',
    collections: 'collections',
    navigations: 'navigations',
    templates: 'templates',
    libs: 'libs',
    mocks:'mocks',
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
  //shim setep for library dependencies.
  shim:{
    Backbone:{
        deps:['underscore', 'jquery'],
        exports:'Backbone'
    },
    underscore:{
        exports:'_'
    },
    pubsub: {
        exports:'ps'
    },
    jqueryMobile: ['jquery','jqueryMobileConfig'],
    customJquery: ['jquery'],
    paginator: {
        deps:['Backbone'],
        exports:'Backbone.Paginator'
    },
    mockjax: ['jquery'],
    localstorageCache: ['jquery','modernizr'],
    pep: ['jquery']
   }
});

//init app based on type of device.
require(['main'], function(main) {
  var isDeviceReady = false,
      //App is the global namespace for our application.
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