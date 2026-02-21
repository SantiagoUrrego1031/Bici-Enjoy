const WHATSAPP_NUMBER = "573001234567"; // cambia por tu número (57 + número)
let bicicletas = [];

fetch('data/bicicletas.json')
  .then(res => res.json())
  .then(data => {
    bicicletas = data;
    mostrarBicis(bicicletas);
  });

function mostrarBicis(lista) {
  const contenedor = document.getElementById('lista-bicis');
  contenedor.innerHTML = '';
  contenedor.classList.remove('animar');
  void contenedor.offsetWidth; // truco para reiniciar animación
  contenedor.classList.add('animar');

  lista.forEach(bici => {
    const mensaje = encodeURIComponent(
      `Hola 👋, me interesa la bicicleta ${bici.nombre} (${bici.tipo}) por $${bici.precio.toLocaleString()}`
    );

    const urlWhatsapp = `https://wa.me/${WHATSAPP_NUMBER}?text=${mensaje}`;

    contenedor.innerHTML += `
      <div class="card">
        <img src="${bici.imagen}" alt="${bici.nombre}">
        <h3>${bici.nombre}</h3>
        <p>${bici.descripcion}</p>
        <p><strong>Tipo:</strong> ${bici.tipo}</p>
        <p class="precio">$${bici.precio.toLocaleString()}</p>
        <p><strong>Estado:</strong> ${bici.estado}</p>

        <a href="${urlWhatsapp}" target="_blank" class="btn-whatsapp">
          💬 Consultar por WhatsApp
        </a>
      </div>
    `;
  });
}

document.getElementById('btn-filtrar').addEventListener('click', () => {
  const tipo = document.getElementById('filtro-tipo').value;
  const precioMax = document.getElementById('filtro-precio').value;
  const orden = document.getElementById('orden-precio').value;

  let resultado = bicicletas
    .filter(bici => {
      let disponible = bici.estado === "Disponible";
      let cumpleTipo = tipo === 'Todos' || bici.tipo === tipo;
      let cumplePrecio = !precioMax || bici.precio <= precioMax;

      return disponible && cumpleTipo && cumplePrecio;
    });

  if (orden === 'asc') {
    resultado.sort((a, b) => a.precio - b.precio);
  }

  if (orden === 'desc') {
    resultado.sort((a, b) => b.precio - a.precio);
  }

  mostrarBicis(resultado);
});

  mostrarBicis(resultado);
