mapboxgl.accessToken = 'pk.eyJ1Ijoic3o5bmEiLCJhIjoiY2sxdXluMzVtMDRoMzNobXptaDJvaG9odiJ9.8wFtxgevu_EqhEpTjEe4Zw';

var map = new mapboxgl.Map({
	container: 'map',
	minZoom: 1,
	maxZoom: 17,
	style: 'mapbox://styles/sz9na/ck1v1m7ap09te1cmm2fgh0a97',
	center: [-76.61619, 37.28383],
	zoom:7.94,	

});
console.log("map ready");
// scroll through chapters
var chapters = {
        'oyster': {
            name: "Oyster",
            bearing: 0,
            center: [-75.92392, 37.28607],
            zoom: 16.22,
            pitch: 0,
        },

        'saxis': {
            name: "Saxis",
            bearing: 0,
            center: [-75.72175, 37.92646],
            zoom: 14.81,
            pitch: 0,
        },
};

console.log(chapters);
// var chapterNames = Object.keys(chapters);
// console.log(chapterNames);


// function myFunction() {
//   console.log("scroll");
// };

// function myScroll() {
// 	console.log("scroll");
// 	var chapterNames = Object.keys(chapters);
// 	for (var i = 0; i < chapterNames.length; i++) {
// 		var chapterName = chapterNames[i];
// 		if (isElementOnScreen(chapterName)) {
// 			setActiveChapter(chapterName);
// 			break;
// 		}
// 	}
// };

document.getElementById("sidebar").onscroll = function (){
	console.log("scroll");
	var chapterNames = Object.keys(chapters);
	for (var i = 0; i < chapterNames.length; i++) {
		var chapterName = chapterNames[i];
		if (isElementOnScreen(chapterName)) {
			setActiveChapter(chapterName);
			break;
		}
	}
};

 
var activeChapterName = 'oyster';
function setActiveChapter(chapterName) {
	if (chapterName === activeChapterName) return;
	 
	map.flyTo(chapters[chapterName]);
	 
	document.getElementById(chapterName).setAttribute('class', 'active');
	document.getElementById(activeChapterName).setAttribute('class', '');
	 
	activeChapterName = chapterName;
}
 
function isElementOnScreen(id) {
	var element = document.getElementById(id);
	var bounds = element.getBoundingClientRect();
	return bounds.top < window.innerHeight && bounds.bottom > 0;
}


// 6. Show/hide layers
// See example at https://www.mapbox.com/mapbox-gl-js/example/toggle-layers/
    
    var layers = [  // an array of the layers you want to include in the layers control (layers to turn off and on)

        // [layerMachineName, layerDisplayName]
        // layerMachineName is the layer name as written in your Mapbox Studio map layers panel
        // layerDisplayName is the way you want the layer's name to appear in the layers control on the website
        ['inundated-building-s-3ft','3ft Sea Level Rise'],
        ['inundated-building-s-6ft','6ft Sea Level Rise'],
        ['inundated-building-s-10ft','10ft Sea Level Rise'],                      
        // layers[0]
        //['cville-parks', 'Parks'],                              
        // layers[1][1] = 'Parks'
        //['cville-bike-lanes', 'Bike Lanes'],     
        //['cville-bus-stops-heatmap', 'Bus Stop Heatmap'],
        //['background', 'Map background']
        // add additional live data layers here as needed
    ]; 

    // functions to perform when map loads
    map.on('load', function () {
        
        
        for (i=0; i<layers.length; i++) {

    //         // add a button for each layer
            $("#layers-control").append("<a href='#' class='button-default' id='" + layers[i][0] + "'>" + layers[i][1] + "</a>"); // see http://api.jquery.com/append/
        }

        // show/hide layers when button is clicked
        $("#layers-control>a").on('click', function(e) {

                var clickedLayer = e.target.id;

                e.preventDefault();
                e.stopPropagation();

                var visibility = map.getLayoutProperty(clickedLayer, 'visibility');  // see https://www.mapbox.com/mapbox-gl-js/api/#map#getlayoutproperty
                console.log(visibility);

                if (visibility === 'visible') {
                    map.setLayoutProperty(clickedLayer, 'visibility', 'none');  // see https://www.mapbox.com/mapbox-gl-js/api/#map#setlayoutproperty
                    $(e.target).removeClass('active');
                } else {
                    $(e.target).addClass('active');
                    map.setLayoutProperty(clickedLayer, 'visibility', 'visible'); // see https://www.mapbox.com/mapbox-gl-js/api/#map#setlayoutproperty
                }
        });
    });

// Reset map button
    $("#reset").click(function() 
    {
        map.setCenter(-76.61619, 37.28383);
        map.setZoom(7.94);
        map.setPitch(0);
        map.setBearing(0);
                  

    });

    // Create a popup on click 
    map.on('click', function(e) {   // Event listener to do some code when user clicks on the map

      var stops = map.queryRenderedFeatures(e.point, {  // Query the map at the clicked point. See https://www.mapbox.com/mapbox-gl-js/example/queryrenderedfeatures/ for an example on how queryRenderedFeatures works and https://www.mapbox.com/mapbox-gl-js/api/#map#queryrenderedfeatures for documentation
        layers: ['inundated-building-s-10ft']    // replace this with the name of the layer from the Mapbox Studio layers panel
    });

      // if the layer is empty, this if statement will exit the function (no popups created) -- this is a failsafe to avoid non-functioning popups
      if (stops.length == 0) {
        return;
    }

    var popup = new mapboxgl.Popup({ 
        closeButton: true, // If true, a close button will appear in the top right corner of the popup. Default = true
        closeOnClick: true, // If true, the popup will automatically close if the user clicks anywhere on the map. Default = true
        anchor: 'bottom', // The popup's location relative to the feature. Options are 'top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left' and 'bottom-right'. If not set, the popup's location will be set dynamically to make sure it is always visible in the map container.
        offset: [0, -15] // A pixel offset from the centerpoint of the feature. Can be a single number, an [x,y] coordinate, or an object of [x,y] coordinates specifying an offset for each of the different anchor options (e.g. 'top' and 'bottom'). Negative numbers indicate left and up.
    });

      // Set the popup location based on each feature
      popup.setLngLat(stops[0].geometry.coordinates);

      // Set the contents of the popup window
      popup.setHTML('<h3>Municipality: ' + stops[0].properties.stop_id + '</h3><p>' + stops[0].properties.stop_name + '</p>');
            // stops[0].properties.stop_id will become the title of the popup (<h3> element)
            // stops[0].properties.stop_name will become the body of the popup


        // popup.setHTML('<p>' + stops[0].properties.stop_name + '</p>')
        

      // Add the popup to the map 
      popup.addTo(map);  // replace "map" with the name of the variable in line 4, if different
  });
