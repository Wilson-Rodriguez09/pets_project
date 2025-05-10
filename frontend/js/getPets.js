document.addEventListener('DOMContentLoaded', async () => {
  const contenedor = document.getElementById('lista-mascotas');

  try {
    const res = await fetch('http://192.168.88.102:3000/pets_ws');
    const mascotas = await res.json();

    if (!Array.isArray(mascotas) || mascotas.length === 0) {
      contenedor.innerHTML = '<p>No hay mascotas registradas.</p>';
      return;
    }

    const tarjetas = mascotas.map(m => `
      <div class="card">
        <img src="http://192.168.88.102:3000/public/img/${m.photo_ws}" alt="Mascota" />
        <div class="card-info">
          <h4>${m.name_ws}</h4>
          <span>${m.race_ws?.name_ws || 'Sin raza'}</span>
        </div>
        <div class="card-actions">
          <a href='verDetalles.html'><img src='../img/btn-show.svg' alt='btn-delete'style='width: 70%; height: 100%;'/></a>
          <a href='verDetalles.html'><img src='../img/btn-edit.svg' alt='btn-edit' style='width: 70%; height: 100%;'/></a>
          <a href='verDetalles.html'><img src='../img/btn-delete.svg' alt='btn-delete'style='width: 70%; height: 100%;'/></a>
        </div>
      </div>
    `).join('');

    contenedor.innerHTML = tarjetas;
  } catch (error) {
    console.error('Error al cargar mascotas:', error);
    contenedor.innerHTML = '<p>Error al cargar las mascotas.</p>';
  }
});

