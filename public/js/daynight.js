$(document).ready(function() {
  //Get data from API
  var url = "http://api.openweathermap.org/data/2.5/forecast/daily?q=London&mode=json&units=metric&cnt=7&appid=b1b15e88fa797225412429c1c50c122a1&apikey=26416597cea257592c8f3895f4cb53ed";
  $.getJSON(url, function(data) {
    var label = [];
    var data_day = [];
    var data_night = [];
    var weekdays = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
    var list = data.list;
    for (var i in list) {
      var date_unix_stamp = list[i].dt;
      var day_temp = list[i].temp.day;
      var night_temp = list[i].temp.night;
      var date = new Date(date_unix_stamp * 1000).getDay();
      var day = weekdays[date];
      if (date == 0) {
        day = 'Sun';
      }
      label.push(day);
      data_day.push(day_temp);
      data_night.push(night_temp);
    }
    var t_line = linear_regression(data_day, data_night);
    var canvas = document.getElementById("daynight");
    var ctx = canvas.getContext('2d');

    // Global Options:
    Chart.defaults.global.defaultFontColor = '#9e9e9e';
    Chart.defaults.global.defaultFontSize = 14;

    var data = {
      labels: label,
      datasets: [{
          label: "Morning",
          fill: true,
          backgroundColor: "rgba(248, 186, 207, 0.28)",
          borderWidth: 2,
          borderColor: "#e91e63", // The main line color
          borderCapStyle: 'square',
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "#880e4f",
          pointBackgroundColor: "white",
          pointBorderWidth: 1,
          pointHoverRadius: 8,
          pointHoverBackgroundColor: "#ff80ab",
          pointHoverBorderColor: "#880e4f",
          pointHoverBorderWidth: 2,
          pointRadius: 4,
          pointHitRadius: 10,
          data: data_day,
          spanGaps: false,
        }, {
          label: "Night",
          fill: true,
          backgroundColor: "rgba(226, 192, 232, 0.39)",
          borderWidth: 2,
          borderColor: "#ab47bc",
          borderCapStyle: 'butt',
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "white",
          pointBackgroundColor: "#4a148c",
          pointBorderWidth: 1,
          pointHoverRadius: 8,
          pointHoverBackgroundColor: "#e1bee7",
          pointHoverBorderColor: "#4a148c",
          pointHoverBorderWidth: 2,
          pointRadius: 4,
          pointHitRadius: 10,
          data: data_night,
          spanGaps: false,
        }

      ]
    };

    // Notice the scaleLabel at the same level as Ticks
    var options = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          },
          scaleLabel: {
            display: true,
            labelString: 'Temp',
            fontSize: 14
          }
        }],
        xAxes: [{
          ticks: {
            beginAtZero: true
          },
          scaleLabel: {
            display: true,
            labelString: 'Days',
            fontSize: 14
          }
        }]
      },
      annotation: {
        annotations: [{
          type: 'line',
          mode: 'horizontal',
          scaleID: 'y-axis-0',
          value: t_line[0],
          endValue: t_line[1],
          borderColor: 'rgb(75, 192, 192)',
          borderWidth: 2,
          label: {
            enabled: true,
            content: 'Trendline',
            yAdjust: -16,
          }
        }]
      }
    };

    // Chart declaration:
    var myBarChart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: options
    });

  });
});
