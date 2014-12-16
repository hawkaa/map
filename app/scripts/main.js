(function() {
  'use strict';
})();
var minMagnitude = 5.0;
var maxMagnitude = 6.0;

var earthquakesSource = new ol.source.KML({
  extractStyles: false,
  projection: 'EPSG:3857',
  url: 'earthquakes.kml'
});

var earthquakes = new ol.layer.Vector({
  source: earthquakesSource,
  style: function(feature, resolution) {
    'use strict';
    var name = feature.get('name');
    var magnitude = parseFloat(name.substr(2));
    var style = new ol.style.Style({
      image: new ol.style.Circle({
        fill: new ol.style.Fill({color: 'red'}),
        stroke: new ol.style.Stroke({color: 'blue'}),
        radius: 5
      })
    });
    if (magnitude >= minMagnitude && magnitude <= maxMagnitude) {
      return [style];
    } else {
      return null;
    }
  }
});
var map = new ol.Map({
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    }),
    earthquakes,
  ],
  target: 'map',
  controls: ol.control.defaults(),
  view: new ol.View({
    center: [0, 0],
    zoom: 2
  })

});
$('.slider').noUiSlider({
  start: [minMagnitude, maxMagnitude],
  connect: true,
  range: {
    'min': 5.0,
    'max': 6.0
  },
  step: 0.1
});

$('.slider').Link('upper').to(function(magnitude) {
  maxMagnitude = magnitude;
  earthquakes.getSource().dispatchChangeEvent();
  $('#slider-magnitude-to').val(magnitude);
});

$('.slider').Link('lower').to(function(magnitude) {
  minMagnitude = magnitude;
  earthquakes.getSource().dispatchChangeEvent();
  $('#slider-magnitude-from').val(magnitude);
});
