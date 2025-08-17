const fmt2 = new Intl.NumberFormat('es-CL', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

async function fetchSat() {
  try {
    const res = await fetch('https://api.yadio.io/exrates/btc');
    const data = await res.json();
    const sat = Number(data.BTC.CLP) / 100000000;
    const num = fmt2.format(sat);
    document.getElementById('value').textContent =
      `1 satoshi = ${num} pesos chilenos`;
    document.getElementById('timestamp').textContent =
      new Date().toLocaleTimeString('es-CL');
  } catch (e) {
    document.getElementById('value').textContent = 'Error';
  }
}

fetchSat();
setInterval(fetchSat, 30000);
