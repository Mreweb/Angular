// Region Charts Starts

google.charts.load('current', {
  'packages': ['geochart'],
  // Note: you will need to get a mapsApiKey for your project.
  // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
  'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
});
google.charts.setOnLoadCallback(drawRegionsMap);

function drawRegionsMap() {
  var data = google.visualization.arrayToDataTable([
    ['Country', 'جمعیت'],
    ['Germany', 200],
    ['United States', 300],
    ['Brazil', 400],
    ['Canada', 500],
    ['France', 600],
    ['RU', 700]
  ]);

  var options = {
    colorAxis: {
      colors: ['#76C1FA', '#63CF72', '#F36368', '#FABA66']
    }
  };
  var chart = new google.visualization.GeoChart(document.getElementById('regions-chart'));

  chart.draw(data, options);
}

// Region Charts Ends


// Bar Charts Starts

google.charts.load('current', {
  'packages': ['bar']
});
google.charts.setOnLoadCallback(drawStuff);

function drawStuff() {
  var data = new google.visualization.arrayToDataTable([
    ['حرکت شروع شطرنج', 'درصد'],
    ["سربازِ شاه (e4)", 44],
    ["سربازِ وزیر (d4)", 31],
    ["اسب به شاه 3 (Nf3)", 12],
    ["سربازِ فیلِ وزیر (c4)", 10],
    ['دیگر', 3]
  ]);

  var options = {
    title: 'تقریب توزیع نرمال',
    legend: {
      position: 'none'
    },
    colors: ['#76C1FA'],

    chartArea: {
      width: 401
    },
    hAxis: {
      ticks: [-1, -0.75, -0.5, -0.25, 0, 0.25, 0.5, 0.75, 1]
    },
    bar: {
      gap: 0
    },

    histogram: {
      bucketSize: 0.02,
      maxNumBuckets: 200,
      minValue: -1,
      maxValue: 1
    }
  };

  var chart = new google.charts.Bar(document.getElementById('Bar-chart'));
  chart.draw(data, options);
};


// Bar Charts Ends


// Histogram Charts Starts
(function ($) {

  google.charts.load("current", {
    packages: ["corechart"]
  });
  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {
    var data = google.visualization.arrayToDataTable([
      ['کوارک ها', 'لیپتون ها', 'بوزون های سنج', 'بوزون های اسکالر'],
      [2 / 3, -1, 0, 0],
      [2 / 3, -1, 0, null],
      [2 / 3, -1, 0, null],
      [-1 / 3, 0, 1, null],
      [-1 / 3, 0, -1, null],
      [-1 / 3, 0, null, null],
      [-1 / 3, 0, null, null]
    ]);

    var options = {
      title: 'باز ذرات زیر اتمی',
      legend: {
        position: 'top',
        maxLines: 2
      },
      colors: ['#76C1FA', '#63CF72', '#F36368', '#FABA66'],
      interpolateNulls: false,
      chartArea: {
        width: 401
      },
    };

    var chart = new google.visualization.Histogram(document.getElementById('Histogram-chart'));
    chart.draw(data, options);
  }

})(jQuery);

// Histogram Charts Ends


// Area Chart Starts
(function ($) {

  google.charts.load('current', {
    'packages': ['corechart']
  });
  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {
    var data = google.visualization.arrayToDataTable([
      ['سال', 'فروش', 'مخارج'],
      ['2013', 1000, 400],
      ['2014', 1170, 460],
      ['2015', 660, 1120],
      ['2016', 1030, 540]
    ]);

    var options = {
      title: 'عملکرد شرکت',
      hAxis: {
        title: 'سال',
        titleTextStyle: {
          color: '#333'
        }
      },
      colors: ['#76C1FA', '#63CF72', '#F36368', '#FABA66'],
      chartArea: {
        width: 500
      },
      vAxis: {
        minValue: 0
      }
    };

    var AreaChart = new google.visualization.AreaChart(document.getElementById('area-chart'));
    AreaChart.draw(data, options);
  }

})(jQuery);
// Area Chart Ends



// Donut Chart Starts

google.charts.load("current", {
  packages: ["corechart"]
});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ['فعالیت', 'ساعت در روز'],
    ['کار کردن', 11],
    ['خوردن', 2],
    ['رفت و آمد', 2],
    ['تماشای تلویزیون', 2],
    ['خوابیدن', 7]
  ]);

  var options = {
    title: 'فعالیت های روزانه من',
    pieHole: 0.4,
    colors: ['#76C1FA', '#63CF72', '#F36368', '#FABA66'],
    chartArea: {
      width: 500
    },
  };

  var Donutchart = new google.visualization.PieChart(document.getElementById('Donut-chart'));
  Donutchart.draw(data, options);
}


// Donut Chart Ends


// Curve Chart Starts
(function ($) {

  google.charts.load('current', {
    'packages': ['corechart']
  });
  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {
    var data = google.visualization.arrayToDataTable([
      ['سال', 'فروش', 'مخارج'],
      ['2004', 1000, 400],
      ['2005', 1170, 460],
      ['2006', 660, 1120],
      ['2007', 1030, 540]
    ]);

    var options = {
      title: 'عملکرد شرکت',
      curveType: 'function',
      legend: {
        position: 'bottom'
      },
      colors: ['#76C1FA', '#63CF72', '#F36368', '#FABA66'],
      chartArea: {
        width: 500
      },
    };

    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

    chart.draw(data, options);
  }




})(jQuery);
// Curve Chart Ends