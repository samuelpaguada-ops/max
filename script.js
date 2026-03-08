const menuBtn = document.querySelector("#menuBtn");
const filterButtons = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".card");
const revealItems = document.querySelectorAll(".reveal");
const filterStatus = document.querySelector("#filterStatus");
const albumInput = document.querySelector("#albumInput");
const albumPreview = document.querySelector("#albumPreview");
const uploadMessage = document.querySelector("#uploadMessage");

menuBtn.addEventListener("click", () => {
  document.querySelector("#comidas").scrollIntoView({ behavior: "smooth" });
});

const updateFilterStatus = (visibleCards, filter) => {
  if (visibleCards === 0) {
    filterStatus.textContent = "No hay elementos para este filtro por ahora.";
    filterStatus.style.color = "#ffb703";
    return;
  }

  const label = filter === "all" ? "todo el menú" : `sección ${filter}`;
  filterStatus.textContent = `Mostrando ${visibleCards} item(s) de ${label}.`;
  filterStatus.style.color = "#90ee90";
};

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;
    let visibleCards = 0;

    filterButtons.forEach((item) => item.classList.remove("active"));
    btn.classList.add("active");

    cards.forEach((card) => {
      const show = filter === "all" || card.dataset.type === filter;
      card.style.display = show ? "block" : "none";
      if (show) {
        visibleCards += 1;
      }
    });

    updateFilterStatus(visibleCards, filter);
  });
});

updateFilterStatus(cards.length, "all");

albumInput.addEventListener("change", () => {
  const files = Array.from(albumInput.files || []);
  albumPreview.innerHTML = "";

  if (files.length === 0) {
    uploadMessage.textContent = "No se seleccionaron imágenes.";
    uploadMessage.style.color = "#ffb703";
    return;
  }

  const allowed = files.filter((file) => file.type.startsWith("image/"));

  if (allowed.length !== files.length) {
    uploadMessage.textContent = "Solo se aceptan archivos de imagen.";
    uploadMessage.style.color = "#ff6b6b";
    return;
  }

  if (allowed.length > 6) {
    uploadMessage.textContent = "Máximo 6 imágenes por carga.";
    uploadMessage.style.color = "#ffb703";
    return;
  }

  allowed.forEach((file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = document.createElement("img");
      img.src = event.target?.result;
      img.alt = `Momento compartido: ${file.name}`;
      albumPreview.appendChild(img);
    };
    reader.readAsDataURL(file);
  });

  uploadMessage.textContent = `Subiste ${allowed.length} imagen(es) al álbum.`;
  uploadMessage.style.color = "#90ee90";
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item) => observer.observe(item));
