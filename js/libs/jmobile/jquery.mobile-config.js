define(['jquery'], function ($) {
      $(document).on("mobileinit", function () {
            $.mobile.ajaxEnabled = false;
            $.mobile.linkBindingEnabled = false;
            $.mobile.hashListeningEnabled = false;
            $.mobile.pushStateEnabled = true;
              
            //from the bootstrap file.
            $.support.cors = true;
            $.mobile.allowCrossDomainPages = true;
            isMobileinit = true;
      });
});
