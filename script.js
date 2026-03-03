const acceptBtn = document.getElementById("acceptBtn");
const resetBtn = document.getElementById("resetBtn");

const statusEl = document.getElementById("status");
const dataList = document.getElementById("dataList");
const conceptEl = document.getElementById("concept");
const impactEl = document.getElementById("impact");
const progressBar = document.getElementById("progressBar");

let accepted = false;

const DATA_LABELS = {
  click: "Consentimiento (click)",
  behavior: "Comportamiento (uso/interacciones)",
  device: "Dispositivo y red (IDs/IP/cookies)",
  location: "Ubicación (aprox/precisa)",
  inferred: "Perfilado (intereses inferidos)",
  ads: "Publicidad y medición",
  sharing: "Compartición con terceros",
  rights: "Derechos/retención/cambios"
};

function clearPanel(){
  dataList.innerHTML = "";
  conceptEl.textContent = "—";
  impactEl.textContent = "—";
}

function addData(key){
  // Evita duplicados
  const already = Array.from(dataList.querySelectorAll("li")).some(li => li.dataset.key === key);
  if (already) return;

  const li = document.createElement("li");
  li.dataset.key = key;
  li.textContent = DATA_LABELS[key] || key;
  dataList.appendChild(li);
}

acceptBtn.addEventListener("click", () => {
  accepted = true;
  statusEl.textContent = "Aceptado ✅";
  acceptBtn.textContent = "Aceptado ✅";
  acceptBtn.disabled = true;
});

resetBtn.addEventListener("click", () => {
  accepted = false;
  statusEl.textContent = "No aceptado";
  acceptBtn.textContent = "Acepto";
  acceptBtn.disabled = false;
  clearPanel();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const steps = document.querySelectorAll(".step");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;

    const key = e.target.dataset.key;
    const concept = e.target.dataset.concept || "—";
    const impact = e.target.dataset.impact || "—";

    // Siempre actualiza textos (aunque no haya aceptado)
    conceptEl.textContent = concept;
    impactEl.textContent = impact;

    // Solo “enciende” datos si aceptó
    if (accepted) addData(key);
  });
}, { threshold: 0.6 });

steps.forEach(s => observer.observe(s));

// Barra de progreso
window.addEventListener("scroll", () => {
  const doc = document.documentElement;
  const scrollTop = doc.scrollTop || document.body.scrollTop;
  const scrollHeight = doc.scrollHeight - doc.clientHeight;
  const p = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
  progressBar.style.width = `${p}%`;
});
