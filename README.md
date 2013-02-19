#Castro-PhoneGap-Project
=======================

This is www root of the PhoneGap project. You can download the phonegap project and put the files under www folder to build in the xcode and test it in the simulator. To test in normal browser, you must start a local server with www as your root folder because we use AMD require.js to load js file asynchronously.

To built it on IOS: follow the instruction on phonegap. and replace wwww folder with our code except the corvodaXXXX.js. Then change the cordova version number in the index.html.then build it as instructed on phonegap website.

##Version 0.01
This iteration includes basic structure for non-restaurant user. It provides functionality for searching restaurant given keyword and address. The app will return the result and allow user to view it as a list or as a map. User can further explore the restaurant menu with the flow according to our UI design. 

##Completed:
<ul>
  <li>basic file structure setup</li>
  <li>basic config</li>
  <li>style sheet for iphone4 </li>
  <li>sidbar control </li>
  <li>header control</li>
  <li>app router</li>
  <li>search form view</li>
  <li>search result view</li>
  <li>restaurant view (partial)</li>
  <li>location history</li>
  <li>autocomplete(half done)</li>
  <li>geocoding</li>
  <li>map</li>
  <li>local sort</li>
  <li>loading spinner </li>
  <li>autocomplete (to complete)</li>
  <li>display virtual keyboard on input focus (bug to fix)</li>
  <li>search history (locally store keyword and location history on phone)</li>
  <li>iscroll to scrollable section</li>
  <li>remote sort</li>
  <li>filter <b>-Vahid</b></li>  
  <li>custom map marker that shows restaurant info <b>-Vahid</b></li>
  <li>dish view</li>
  <li>restaurant list view(to compelte)</li>
  <li>map API (leaflet?) <b>-Vahid</b></li>
  <li>Navigation Controller</li>
  <li>Container Controller</li>
  <li>Modules</li>
  <li>historyStackManager</li>
</ul>

##Todo:
<ul>
  <li>stylesheet configuration for different type of screen size</li>
  <li>search form validation</li>
  <li>address form validation</li>
  <li>restaurant image view</li>
  <li>image viewer/slider <b>-Vahid</b></li> 
  <li>ajax check etag for caching</li>
  <li>bookmark restaurant</li>
</ul>
