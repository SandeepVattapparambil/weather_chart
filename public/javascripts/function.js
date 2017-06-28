/*
*Sandeep Vattapparambil
*/
//function to perform linear regression on given data sets
function linear_regression(x_cord_data, y_cord_data) {
  var data_matrix = [];//array init
  $(x_cord_data).each(function(index, val) {
    //merge data sets to form single array
    data_matrix.push([x_cord_data[index], y_cord_data[index]]);
  });
  //perform linear regression
  var result = regression('linear', data_matrix);
  //round up the values
  var slope = Math.round(result.equation[0] * 100) / 100;
  var yintercept = Math.round(result.equation[1] * 100) / 100;
  var trendpoints = [];//array init
  //retur array back
  return trendpoints = [slope, yintercept];
}
