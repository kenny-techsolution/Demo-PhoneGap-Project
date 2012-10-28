define(['jquery'], function ($) {
      $(document).on("mobileinit", function () {
            $.mobile.ajaxEnabled = false;
            $.mobile.linkBindingEnabled = false;
            $.mobile.hashListeningEnabled = false;
            $.mobile.pushStateEnabled = false;
              
            //from the bootstrap file.
            $.support.cors = true;
            $.mobile.allowCrossDomainPages = true;
            jqm_mobile_init = true;
      });
});
