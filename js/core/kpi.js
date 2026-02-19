function calculateKPIDeviation(target, actual) {

    let deviation = Math.abs(target - actual) / target;
    return (deviation * 100).toFixed(2);
}
