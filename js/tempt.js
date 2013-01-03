
        var D1 = new dish({
            dish: "orange chicken",
            price: 20.0
        });
        var D2 = new dish({
            dish: "orange chicken",
            price: 10.0
        });
        var D3 = new dish({
            dish: "orange chicken",
            price: 5.0
        });

        var D4 = new dish({});
        var D5 = new dish({});
        var D6 = new dish({});
        var D7 = new dish({});
        var D8 = new dish({});
        var D9 = new dish({});
        var D10 = new dish({});
        var D11 = new dish({});

        var menu = new dishCollection([D1, D2, D3, D4, D5, D6, D7, D8, D9, D10, D11]);

        var R1 = new restaurant({});
        var R2 = new restaurant({});
        var R3 = new restaurant({});
        var R4 = new restaurant({});
        var R5 = new restaurant({});
        var R6 = new restaurant({});
        var R7 = new restaurant({});
        var R8 = new restaurant({});
        var R9 = new restaurant({});
        var R10 = new restaurant({});
        var R11 = new restaurant({});

        var restaurants = new restaurantCollection([R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11]);

        $('#menu').live('pageinit', function (event) {
            $("#restaurant-name").trigger("create");
            $("#restaurant-name").trigger("refresh");
        });

        $('#dragger-bottom').on('tap',function(){
                $('div#wrapperparent').animate({
                    height: '374px'
                  },0,function(){
                  $('#dragger-top').fadeIn(500).slideDown();
                  $('#restaurant-info').slideUp(100,"swing");
                  myScroll.refresh();
              });
        });
        $('#dragger-top').on('tap',function(){
                $('#restaurant-info').slideDown(100,"swing",function(){
                     $('div#wrapperparent').animate({
                        height: '224px'
                      },10,function(){
                        myScroll.refresh();
                      });
                      
                });
        });
       
        $('.menu-category').bind("collapse",function(){
            //alert("test");
            //$("#wrapperparent").css("height",$("#scroller").css("height"));
            setTimeout(function(){
                console.log($("#scroller").height());
                if(myScroll){
                    myScroll.refresh();
                }
            },50);
        });
        $('.menu-category').bind("expand",function(){
            //alert("test");
            //$("#wrapperparent").css("height",$("#scroller").css("height"));
            setTimeout(function(){
                console.log($("#scroller").height());
                    if(myScroll){
                        myScroll.refresh();
                    }
            },50);
        });
       
        //main frame motion
        var distance="0px";
        $("#main-frame").bind("click", function(event){
            distance = (distance==="280px")?"0px":"280px";
            $("#main-frame").animate({left:distance,opacity: 1},100);
        });
       
        //dish-detail swiping effect
        $("#dish-detail").bind("swiperight", function(event){
            $("#dish-detail").animate({right:"-85%",opacity: 0},150);
        });
       
        $("#scroller div li").bind("tap", function(){
            $("#dish-detail").animate({right:"0%",opacity: 1},230);
        });
       
        $('.menu-category').collapsible({
            expand: function(event, ui){myScroll.refresh();}
        });
        $('#setting-link').on('tap',function(){
            $('#setting-menu').toggle(0);
        });
        
        /*test swipe menu*/
        var menuStatus;
 
        $("a.showMenu").click(function(){
            if(menuStatus != true){
            $(".ui-page-active").animate({
                marginLeft: "165px",
              }, 300, function(){menuStatus = true});
              return false;
              } else {
                $(".ui-page-active").animate({
                marginLeft: "0px",
              }, 300, function(){menuStatus = false});
                return false;
              }
        });
 
        $('.pages').live("swipeleft", function(){
            if (menuStatus){
            $(".ui-page-active").animate({
                marginLeft: "0px",
              }, 300, function(){menuStatus = false});
              }
        });
 
        $('.pages').live("swiperight", function(){
            if (!menuStatus){
            $(".ui-page-active").animate({
                marginLeft: "165px",
              }, 300, function(){menuStatus = true});
              }
        });
 
        $("#menu li a").click(function(){
            var p = $(this).parent();
            if($(p).hasClass('active')){
                $("#menu li").removeClass('active');
            } else {
                $("#menu li").removeClass('active');
                $(p).addClass('active');
            }
        });
                
        window.App = new appView({restaurantCollection: restaurants, menu: menu}); 


        
//------------------------------old-------------------

            //insert INFO

            //this.$('#restaurant-info-section').append("<p>Restaurant Info</p>");
            //init Menu (collection of menuCategory)
            
            //render Menu
            /*
            function loaded(){
            console.log("iscroll");
            console.log(iScroll);
            myScroll= new iScroll('wrapper',{
                  //snap: 'li',     // Would snap logically
                  // Snaps to each "P" tag
                  momentum: true,
                  hScrollbar: false,
                  vScrollbar: true,
                  hideScrollbar:false
                });
                console.log(myScroll);
            }
            loaded();
            document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
           */