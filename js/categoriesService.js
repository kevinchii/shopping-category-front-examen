function categories() {
  document.getElementById("cardHeader").innerHTML = "<h5>Listado de categorías</h5>";
  fetch("https://api.escuelajs.co/api/v1/categories")
    .then(res => res.json())
    .then(data => {
      let list = `<div class="row row-cols-1 row-cols-md-3 g-4">`;
      data.forEach(c => {
        list += `
        <div class="col">
          <div class="card h-100">
            <img src="${c.image}" class="card-img-top" alt="${c.name}">
            <div class="card-body">
              <h5 class="card-title">${c.name}</h5>
              <button class="btn btn-info" onclick="viewCategory(${c.id})">Ver detalles</button>
            </div>
          </div>
        </div>
        `;
      });
      list += `</div>`;
      document.getElementById("info").innerHTML = list;
    });
}

function viewCategory(id) {
  fetch(`https://api.escuelajs.co/api/v1/categories/${id}`)
    .then(res => res.json())
    .then(c => {
      const modal = `
      <div class="modal fade" id="modalCategory" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">${c.name}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            <div class="modal-body">
              <img src="${c.image}" class="img-fluid mb-3" alt="${c.name}">
              <p>ID: ${c.id}</p>
              <p>Nombre: ${c.name}</p>
            </div>
          </div>
        </div>
      </div>
      `;
      document.getElementById("viewModal").innerHTML = modal;
      const m = new bootstrap.Modal(document.getElementById("modalCategory"));
      m.show();
    });
}
