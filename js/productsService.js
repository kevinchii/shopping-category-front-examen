function products() {
  document.getElementById("cardHeader").innerHTML = "<h5>Listado de productos</h5>";
  fetch("https://api.escuelajs.co/api/v1/products")
    .then(res => res.json())
    .then(data => {
      let list = `
      <div class="row row-cols-1 row-cols-md-3 g-4">
      `;
      data.slice(0, 12).forEach(p => {
        list += `
        <div class="col">
          <div class="card h-100">
            <img src="${p.images[0]}" class="card-img-top" alt="Imagen producto">
            <div class="card-body">
              <h5 class="card-title">${p.title}</h5>
              <p class="card-text">$${p.price}</p>
              <button class="btn btn-info" onclick="viewProduct(${p.id})">Ver detalles</button>
            </div>
          </div>
        </div>
        `;
      });
      list += "</div>";
      document.getElementById("info").innerHTML = list;
    });
}

function viewProduct(id) {
  fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
    .then(res => res.json())
    .then(p => {
      const modal = `
      <div class="modal fade" id="modalProduct" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">${p.title}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            <div class="modal-body">
              <img src="${p.images[0]}" class="img-fluid mb-3" alt="Producto">
              <p><strong>Precio:</strong> $${p.price}</p>
              <p><strong>Descripción:</strong> ${p.description}</p>
            </div>
          </div>
        </div>
      </div>
      `;
      document.getElementById("viewModalProducts").innerHTML = modal;
      const m = new bootstrap.Modal(document.getElementById("modalProduct"));
      m.show();
    });
}
