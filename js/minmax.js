$(document).ready(function() {

  //Get data from API
  var url = "http://api.openweathermap.org/data/2.5/forecast/daily?q=London&mode=json&units=metric&cnt=7&appid=b1b15e88fa797225412429c1c50c122a1&apikey=26416597cea257592c8f3895f4cb53ed";
  $.getJSON(url, function(data) {
    var label = [];
    var data_min = [];
    var data_max = [];
    var weekdays = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
    var list = data.list;
    //console.log(list);
    for (var i in list) {
      var date_unix_stamp = list[i].dt;
      var min_temp = list[i].temp.min;
      var max_temp = list[i].temp.max;
      var date = new Date(date_unix_stamp * 1000).getDay();
      var day = weekdays[date - 1];
      if (date == 0) {
        day = 'Sun';
      }
      label.push(day);
      data_min.push(min_temp);
      data_max.push(max_temp);
    }
    //console.log(label, data_min, data_max);
    var canvas = document.getElementById("minmax");
    var ctx = canvas.getContext('2d');

    // Global Options:
    Chart.defaults.global.defaultFontColor = '#9e9e9e';
    Chart.defaults.global.defaultFontSize = 14;

    var data = {
      //labels: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
      labels: label,
      datasets: [{
          label: "Min",
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
          data: [12.27, 13.53, 13.77, 13.09, 12.57, 11.48, 14.31],
          spanGaps: false,
        }, {
          label: "Max",
          fill: true,
          lineTension: 0,
          backgroundColor: "rgba(243, 229, 245, 0.47)",
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
          data: [17.39, 16.53, 17.9, 19.05, 14.48, 18.19, 21.46],
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
          value: 12.27,
          endValue: 21.46,
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
