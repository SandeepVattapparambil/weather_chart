
function linear_regression(x_cord_data, y_cord_data) {
  var data_matrix = [];
  $(x_cord_data).each(function(index, val) {
    data_matrix.push([x_cord_data[index], y_cord_data[index]]);
  });
  var result = regression('linear', data_matrix);
  var slope = Math.round(result.equation[0] * 100) / 100;
  var yintercept = Math.round(result.equation[1] * 100) / 100;
  //console.log(slope, yintercept);
  var trendpoints = [];
  return trendpoints = [slope, yintercept];
}
