var displayType, header, headerWrapper;

var peekabooConfig = {
  'header': {
    'mobile': 72,
    'desktop-sm': 72,
    'default': 192
  },
  'header-wrapper': {
    'mobile': 28,
    'desktop-sm': 28,
    'default': 82
  }
};

var defineDisplay = function() {
  console.log('defineDisplay');
  displayType = 'default';
};

/* EVENTS */
window.addEventListener('resize', function() {
  defineDisplay();
});

window.addEventListener('scroll', function() {
  if (window.scrollY > peekabooConfig['header'][displayType]) {
    header.classList.add('peekaboo');
  } else {
    header.classList.remove('peekaboo');
  }

  if (window.scrollY > peekabooConfig['header-wrapper'][displayType]) {
    headerWrapper.classList.add('peekaboo');
  } else {
    headerWrapper.classList.remove('peekaboo');
  }
});

function ready(fn) {
  if (document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(function() {
  defineDisplay();
  header = document.getElementById('header');
  headerWrapper = document.getElementById('header-wrapper');
});

// Chart stuff
google.load('visualization', '1.1', {packages: ['line']});
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
          width: 700,
          height: 500,
          pointSize: 20,
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

        var chart = new google.charts.Line(lclChart);
        chart.draw(lclData, lclOptions);
  }