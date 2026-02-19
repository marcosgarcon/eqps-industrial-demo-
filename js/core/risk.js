function calculateRisk(cpk, trend) {

    let cepScore = Math.max(0, (1.67 - cpk) * 40);
    let trendScore = Math.abs(trend) * 5;

    return (cepScore + trendScore).toFixed(1);
}
