function loadDashboard() {

    const values = processData.values;
    const lsl = processData.lsl;
    const usl = processData.usl;

    const cpk = calculateCpk(values, lsl, usl);
    const trend = values[values.length-1] - values[0];
    const risk = calculateRisk(cpk, trend);
    const kpi = calculateKPIDeviation(
        processData.productionTarget,
        processData.productionActual
    );

    document.getElementById("app").innerHTML = `
        <div class="card">
            <h2>Capacidade do Processo (Cpk)</h2>
            <p><strong>${cpk.toFixed(2)}</strong></p>
        </div>

        <div class="card">
            <h2>Risk Score Industrial</h2>
            <p><strong>${risk}</strong></p>
        </div>

        <div class="card">
            <h2>Desvio KPI Produção (%)</h2>
            <p><strong>${kpi}%</strong></p>
        </div>
    `;
}

function loadData() {

    document.getElementById("app").innerHTML = `
        <div class="card">
            <h2>Dados do Processo</h2>
            <p><strong>Valores:</strong> ${processData.values.join(", ")}</p>
            <p><strong>LSL:</strong> ${processData.lsl}</p>
            <p><strong>USL:</strong> ${processData.usl}</p>
        </div>
    `;
}

loadDashboard();
