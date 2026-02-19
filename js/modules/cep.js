function calculateCpk(values, lsl, usl) {

    const mean = values.reduce((a,b)=>a+b,0) / values.length;

    const std = Math.sqrt(
        values.map(x => Math.pow(x - mean, 2))
              .reduce((a,b)=>a+b,0) / values.length
    );

    const cpu = (usl - mean) / (3 * std);
    const cpl = (mean - lsl) / (3 * std);

    return Math.min(cpu, cpl);
}
