// calc slope and intercept
// then use resulting y = mx + b to create trendline
lineFit = function (points) {
  sI = slopeAndIntercept(points);
  if (sI) {
    // we have slope/intercept, get points on fit line
    var N = points.length;
    var rV = [];
    rV.push([points[0][0], sI.slope * points[0][0] + sI.intercept]);
    rV.push([points[N - 1][0], sI.slope * points[N - 1][0] + sI.intercept]);
    return rV;
  }
  return [];
}

// simple linear regression
slopeAndIntercept = function (points) {
  var rV = {},
    N = points.length,
    sumX = 0,
    sumY = 0,
    sumXx = 0,
    sumYy = 0,
    sumXy = 0;

  // can't fit with 0 or 1 point
  if (N < 2) {
    return rV;
  }

  for (var i = 0; i < N; i++) {
    var x = i, 		  //points[i][0],
      y = points[i];  //points[i][1];
    sumX += x;
    sumY += y;
    sumXx += (x * x);
    sumYy += (y * y);
    sumXy += (x * y);
  }

  // calc slope and intercept
  rV['slope'] = ((N * sumXy) - (sumX * sumY)) / (N * sumXx - (sumX * sumX));
  rV['intercept'] = (sumY - rV['slope'] * sumX) / N;
  rV['rSquared'] = Math.abs((rV['slope'] * (sumXy - (sumX * sumY) / N)) / (sumYy - ((sumY * sumY) / N)));

  return rV;
}