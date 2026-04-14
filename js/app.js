const WHATSAPP_NUMBER = "573203105001";
let bicicletas = [];

// Cargar JSON
fetch('data/bicicletas.json')
  .then(res => res.json())
  .then(data => {
    bicicletas = data;
    mostrarBicis(bicicletas);
  });

// Mostrar bicicletas
function mostrarBicis(lista) {
  const contenedor = document.getElementById('lista-bicis');

  contenedor.innerHTML = '';

  lista.forEach((bici, index) => {
    const mensaje = encodeURIComponent(
      `Hola, me interesa la bicicleta ${bici.nombre} (${bici.tipo}) por $${bici.precio.toLocaleString()}`
    );

    const urlWhatsapp = `https://wa.me/${WHATSAPP_NUMBER}?text=${mensaje}`;

    contenedor.innerHTML += `
  <div class="card ${bici.estado === "Vendida" ? "vendida" : ""}" 
       style="animation-delay:${index * 0.1}s">

    <div class="img-container">
      <img loading="lazy" src="${bici.imagen}" alt="${bici.nombre}">
      ${bici.estado === "Vendida" ? '<span class="vendido-ribbon">VENDIDA</span>' : ''}
    </div>

    <div class="card-content">
      <h3>${bici.nombre}</h3>

      <p>${bici.tipo} • ${bici.descripcion.substring(0, 60)}...</p>

      <p class="precio">$${bici.precio.toLocaleString()}</p>

      ${
        bici.estado === "Disponible"
          ? `<a href="${urlWhatsapp}" target="_blank" class="btn-whatsapp">
              Ver disponibilidad
             </a>`
          : `<span class="estado vendida">Vendida</span>`
      }
    </div>

  </div>
`;
  });

  activarAnimacionesScroll();
}

// Animación al hacer scroll
function activarAnimacionesScroll() {
  const cards = document.querySelectorAll('.card');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.2 });

  cards.forEach(card => observer.observe(card));
}

// Evento filtrar
document.getElementById('btn-filtrar').addEventListener('click', () => {

  const tipo = document.getElementById('filtro-tipo').value;
  const precioMax = document.getElementById('filtro-precio').value;
  const orden = document.getElementById('orden-precio').value;
  const textoBusqueda = document
    .getElementById('buscar-bici')
    .value
    .toLowerCase();

  let resultado = bicicletas.filter(bici => {
    let disponible = bici.estado === "Disponible";
    let cumpleTipo = tipo === 'Todos' || bici.tipo === tipo;
    let cumplePrecio = !precioMax || bici.precio <= precioMax;
    let cumpleBusqueda = bici.nombre.toLowerCase().includes(textoBusqueda);

    return disponible && cumpleTipo && cumplePrecio && cumpleBusqueda;
  });

  if (orden === 'asc') {
    resultado.sort((a, b) => a.precio - b.precio);
  }

  if (orden === 'desc') {
    resultado.sort((a, b) => b.precio - a.precio);
  }

  mostrarBicis(resultado);
});
function animarElementos() {
  const elementos = document.querySelectorAll('.fade-up');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.2 });

  elementos.forEach(el => observer.observe(el));
}

// Ejecutar cuando carga la página
window.addEventListener('load', () => {
  animarElementos();
});
