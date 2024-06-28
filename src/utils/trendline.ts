
interface RegressionLine {
    slope?: number;
    intercept?: number;
    rSquared?: number;
}

// simple linear regression
export const slopeAndIntercept = (points: number[]): RegressionLine | undefined => {
    const rV: RegressionLine = {};
    let N = points.length,
        sumX = 0,
        sumY = 0,
        sumXx = 0,
        sumYy = 0,
        sumXy = 0;

    // can't fit with 0 or 1 point
    if (N < 2) {
        return undefined;  //rV;
    }

    for (let i = 0; i < N; i++) {
        const x = i, 		  //points[i][0],
            y = points[i];  //points[i][1];
        sumX += x;
        sumY += y;
        sumXx += (x * x);
        sumYy += (y * y);
        sumXy += (x * y);
    }

    // calc slope and intercept
    rV.slope = ((N * sumXy) - (sumX * sumY)) / (N * sumXx - (sumX * sumX));
    rV.intercept = (sumY - rV.slope * sumX) / N;
    rV.rSquared = Math.abs((rV.slope * (sumXy - (sumX * sumY) / N)) / (sumYy - ((sumY * sumY) / N)));

    return rV;
}
