var map, mm, markers, geolat, geolon;

var dspace_tactical =
{
	tilejson: '1.0.0',
	scheme: 'zxy',
	tiles: ['http://192.168.1.1:8888/v2/DSpace-tactical/{z}/{x}/{y}.png']
};

$.domReady(function () {

    //get packages from ender
    var Backbone = require('backbone');
    var _ = require('underscore')

    //set up a view
	var FeatureListView = Backbone.View.extend({
		el: $('#layer-items'),
		keel: $('#keel'),

		events: {
			'click button#add': 'addItem'
		},

		initialize: function(){
			_.bindAll(this, 'render', 'addItem');
			this.render();
			console.log("FOO");
			$(this.el).append("<button id='add'>Add list item</button>");
		},

		render: function(){
			$(this.el).append("FOO");
			//$(this.el).append("<button id='add'>Add list item</button>");
		},

		addItem: function(){
			$(this.el).append("BAR");
			console.log("BAR");
		}
	});

	var featureListView = new FeatureListView();

    //down here is the old stuff
	mm 	  			= com.modestmaps;

	geolat  			= 48.115293;
	geolon 			= 11.60218;

	map = new com.modestmaps.Map(document.getElementById('map'),
			   new wax.mm.connector(dspace_tactical), null, [
			   easey_handlers.DragHandler(),
			   easey_handlers.TouchHandler(),
			   easey_handlers.MouseWheelHandler(),
			   easey_handlers.DoubleClickHandler()
			   ]);

	// setup boundaries
	map.setZoomRange(13, 18);

	// enable zoom control buttons
	wax.mm.zoomer (map, dspace_tactical).appendTo(map.parent);

	// show and zoom map
	map.setCenterZoom(new com.modestmaps.Location(geolat, geolon),12);

	map.addCallback('drawn', function(m)
    {
        var lat = map.getCenter().toString().substring(1,7);
        var lon = map.getCenter().toString().substring(8,15);
        $('#info').html("N: " + lat + " E: " + lon);
        $('#zoom-indicator').html('ZOOM ' + m.getZoom().toString().substring(0,2));
        mmap.setCenter(new mm.Location(lat,lon));
    });




	// Initiate GEOJSON test overlay

    markers = new mm.MarkerLayer();
    map.addLayer(markers);
    loadMarkers();
    $('#minimap-canvas').show();

});

function gototest(tlat, tlon)
{
    easey().map(map)
    .to(map.locationCoordinate({ lat: tlat,  lon: tlon }))
    .zoom(18).optimal();
}


function loadMarkers()
{
    var script = document.createElement("script");
    script.src = "http://192.168.1.166/dspace/hackerspaces.gjson";
    document.getElementsByTagName("head")[0].appendChild(script);
}


function onLoadMarkers(collection)
{

    var features = collection.features,
                 len = features.length,
             extent = [];

    var n = 97; // dec value of ascii "a"

    for (var i = 0; i < len; i++)
    {
        var feature = features[i],
              marker = document.createElement("a");

        // give it a title
                marker.setAttribute("title", [
                    feature.properties.title,
                    "on", feature.properties.date_time
                ].join(" "));
                // add a class
                marker.setAttribute("class", "report");
                // set the href to link to crimespotting's crime page
                marker.setAttribute("href", "http://www.youtube.com/watch?v=oHg5SJYRHA0" + [
                    feature.properties.date_time.substr(0, 10),
                    feature.properties.type.replace(/ /g, "_"),
                    feature.id
                ].join("/"));

                // create an image icon

                var letter = String.fromCharCode(n);

                var img = marker.appendChild(document.createElement("img"));
                img.setAttribute("src", "assets/icons/" + collection.icon + "-" + letter + ".png");
				img.setAttribute("class", "markerfix");

                markers.addMarker(marker, feature);
                // add the marker's location to the extent list
                extent.push(marker.location);

				// add to layer item list
				addLayerItem(feature.properties.title, feature.properties.description, feature.geometry.coordinates, collection.icon, letter );

				n++;

        }

		$('layer-name').html (collection.name);

        map.setExtent(extent);
    }


function addLayerItem(t,d,c,i,l)
{
    var container = $('#overlay-feature-list');
    var feature = document.createElement("div");

    var lat = map.getCenter().toString().substring(1,7);
    var lon = map.getCenter().toString().substring(8,15);
    var cc = c.toString().split(",");
	var dist = 0;//;distance(geolat, geolon, cc[1], cc[0], 'K');

    feature.innerHTML = '<div class="overlay-feature" onclick="gototest(' + cc[1] + ',' + cc[0]+ ')"><div class="' + i + '-' + l +'" ><h3>' + t + '</h3></div><div class="overlay-feature-info"><div class="overlay-feature-description">' + d + '</div><div class="item-dynamic"><div class="overlay-feature-distance" id="overlay-feature-distance-' + l + '">' + dist[0] + '<br />' + dist[1] + '</div><div class="overlay-feature-position">' + c + '</div></div></div>';
    container.append(feature);
}

function changeMap(z)
{
	var damap;

	if (z == 0)
	{
		damap = dspace_bright;
	}
	else
	{
		damap = dspace_tactical;
	}

    	   map = new com.modestmaps.Map($('#map'),
               new wax.mm.connector(damap), null, [
               easey_handlers.DragHandler(),
               easey_handlers.TouchHandler(),
               easey_handlers.MouseWheelHandler(),
               easey_handlers.DoubleClickHandler()
               ]);


 // enable zoom control buttons

    wax.mm.zoomer		(map, dspace_tactical)
	.appendTo				(map.parent)				;

/*  // Fullscreen mode, styling and testing needed!
    wax.mm.fullscreen		(map, dspace_tactical)
    .appendTo				(map.parent);
*/
    map.setCenterZoom(new com.modestmaps.Location(geolat, geolon),12);

}
