// script.js
const acceptBtn = document.getElementById("acceptBtn");
const dataList = document.getElementById("dataList");

let accepted = false;

const dataItems = [
  "Interacciones (likes, tiempo, clicks)",
  "Datos del dispositivo (IP, modelo, SO)",
  "Ubicación (aprox/precisa)",
  "Preferencias e intereses inferidos",
  "Historial dentro de la app",
  "ID publicitario / medición de anuncios"
];

function addItem(text) {
  const li = document.createElement("li");
  li.textContent = text;
  dataList.appendChild(li);
}

acceptBtn.addEventListener("click", () => {
  accepted = true;
  acceptBtn.textContent = "Aceptado ✅";
  acceptBtn.disabled = true;
});

const steps = document.querySelectorAll(".step");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting && accepted) {
        if (dataList.children.length < dataItems.length) {
          addItem(dataItems[dataList.children.length]);
        }
      }
    });
  },
  { threshold: 0.6 }
);

steps.forEach((s) => observer.observe(s));
