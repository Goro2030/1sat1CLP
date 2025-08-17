// formateador a 2 decimales, con separadores es-CL
const fmt2 = new Intl.NumberFormat('es-CL', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

function renderPrecio(precioCLPporSat) {
  const el = document.getElementById('valor');
  if (!el) return;
  const n = Number(precioCLPporSat);
  el.textContent = Number.isFinite(n) ? fmt2.format(n) : '—';
}

function renderTimestamp(date = new Date()) {
  const el = document.getElementById('timestamp');
  if (!el) return;
  el.textContent = 'Actualizado: ' + date.toLocaleString('es-CL');
}

async function fetchSat() {
  try {
    const res = await fetch('https://api.yadio.io/exrates/btc');
    const data = await res.json();
    const clpPorBTC = data.BTC.CLP;
    const porSat = Number(clpPorBTC) / 100_000_000;
    renderPrecio(porSat);
    renderTimestamp(new Date());
  } catch (e) {
    renderPrecio(NaN);
  }
}

fetchSat();
setInterval(fetchSat, 30000);
