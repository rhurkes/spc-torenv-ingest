jQuery(function($) {
  var $bodyEl = $('body'),
      $sidedrawerEl = $('#sidedrawer');
  
  
  // ==========================================================================
  // Toggle Sidedrawer
  // ==========================================================================
  function showSidedrawer() {
    // show overlay
    var options = {
      onclose: function() {
        $sidedrawerEl
          .removeClass('active')
          .appendTo(document.body);
      }
    };
    
    var $overlayEl = $(mui.overlay('on', options));
    
    // show element
    $sidedrawerEl.appendTo($overlayEl);
    setTimeout(function() {
      $sidedrawerEl.addClass('active');
    }, 20);
  }
  
  
  function hideSidedrawer() {
    $bodyEl.toggleClass('hide-sidedrawer');
  }
  
  
  $('.js-show-sidedrawer').on('click', showSidedrawer);
  $('.js-hide-sidedrawer').on('click', hideSidedrawer);
  
  
  // ==========================================================================
  // Animate menu
  // ==========================================================================
  var $titleEls = $('strong', $sidedrawerEl);
  
  $titleEls
    .next()
    .hide();
  
  $titleEls.on('click', function() {
    $(this).next().slideToggle(200);
  });
});

// Chart stuff
google.load('visualization', '1.1', {packages: ['scatter']});
      google.setOnLoadCallback(drawChart);
      function drawChart() {
        var fullData = [
        [91.77, 207.893265, 1452, 880, 44],
        [92.69, 233.873962, 1509, 880, 45],
        [93.62, 272.229706, 1767, 857, 47],
        [94.54, 296.81308, 2043, 925, 45],
        [95.46, 312.589355, 1920, 955, 47],
        [96.39, 418.118896, 1944, 1054, 52],
        [97.31, 466.61264, 1920, 1193, 50],
        [98.23, 558.502014, 2426, 1244, 48],
        [99.15, 675.569153, 2425, 1220, 45],
        [100.08, 688.673462, 1895, 1310, 43],
        [101, 866.322693, 1351, 1317, 44],
        [101.92, 1061.252075, 1102, 1397, 42],
        [102.84, 1291.158813, 1069, 1555, 43],
        [103.76, 1366.450073, 907, 1591, 35],
        [104.68, 1502.562256, 865, 1591, 32]
        ];

        var lclChart = document.getElementById('lcl_chart');
        var lclValues = [];
        for (var i = 0; i < fullData.length; i++) {
          var dr = fullData[i];
          lclValues.push([dr[0], dr[1], dr[3]]);
        }

        var lclData = new google.visualization.DataTable();
        lclData.addColumn('number', 'Longitude (Degrees West)');
        lclData.addColumn('number', "Elevation");
        lclData.addColumn('number', "Median LCL");
        lclData.addRows(lclValues);

        var lclOptions = {
          chart: { title: 'Median Lifted Condensation Level vs Elevation @ Grid Row 58' },
          width: 900,
          height: 500,
          series: {
            0: {axis: 'Elevation'},
            1: {axis: 'LCL'}
          },
          axes: {
            y: {
              Elevation: {label: 'Elevation (m)'},
              LCL: {label: 'LCL (m)'}
            }
          }
        };

        var chart = new google.charts.Scatter(lclChart);
        chart.draw(lclData, lclOptions);
  }

// Map stuff
var map;
  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 40, lng: -100},
      zoom: 6,
      mapTypeId: google.maps.MapTypeId.TERRAIN
    });

    var top = 40.65;
    var bottom = 39.95;
    
    var zone1 = [
    {lat: top, lng: -91.31},
    {lat: bottom, lng: -91.31},
    {lat: bottom, lng: -93.11},
    {lat: top, lng: -93.11}
    ];
    var zone1poly = new google.maps.Polygon({
      paths: zone1,
      strokeColor: 'green',
      strokeOpacity: 0.3,
      strokeWeight: 2,
      fillColor: 'green',
      fillOpacity: 0.2
    });
    zone1poly.setMap(map);

    var zone2 = [
    {lat: top, lng: -93.11},
    {lat: bottom, lng: -93.11},
    {lat: bottom, lng: -97.72},
    {lat: top, lng: -97.72}
    ];
    var zone2poly = new google.maps.Polygon({
      paths: zone2,
      strokeColor: 'blue',
      strokeOpacity: 0.3,
      strokeWeight: 2,
      fillColor: 'blue',
      fillOpacity: 0.2
    });
    zone2poly.setMap(map);

    var zone3 = [
    {lat: top, lng: -97.72},
    {lat: bottom, lng: -97.72},
    {lat: bottom, lng: -99.69},
    {lat: top, lng: -99.69}
    ];
    var zone3poly = new google.maps.Polygon({
      paths: zone3,
      strokeColor: 'red',
      strokeOpacity: 0.3,
      strokeWeight: 2,
      fillColor: 'red',
      fillOpacity: 0.2
    });
    zone3poly.setMap(map);

    var zone4 = [
    {lat: top, lng: -99.69},
    {lat: bottom, lng: -99.69},
    {lat: bottom, lng: -105.14},
    {lat: top, lng: -105.14}
    ];
    var zone4poly = new google.maps.Polygon({
      paths: zone4,
      strokeColor: 'orange',
      strokeOpacity: 0.3,
      strokeWeight: 2,
      fillColor: 'orange',
      fillOpacity: 0.2
    });
    zone4poly.setMap(map);
  }