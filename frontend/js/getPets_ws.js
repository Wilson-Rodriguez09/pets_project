document.addEventListener('DOMContentLoaded', async () => {
  const contenedor = document.getElementById('lista-mascotas');

  const token = localStorage.getItem('token');

  try {
    const res = await fetch('http://10.4.20.64:3000/pets_ws', {
      headers: {
                'Authorization': `Bearer ${token}`
            },
    });
  
    const mascotas = await res.json();

    if (!Array.isArray(mascotas) || mascotas.length === 0) {
      contenedor.innerHTML = '<p>No hay mascotas registradas.</p>';
      return;
    }

    const tarjetas = mascotas.map(m => `
      <div class="card">
        <img src="http://10.4.20.64:3000/public/img/${m.photo_ws}" alt="Mascota" />
        <div class="card-info">
          <h4>${m.name_ws}</h4>
          <span>${m.race_ws?.name_ws || 'Sin raza'}</span>
        </div>
        <div class="card-actions">
          <a href='readPets_ws.html?id=${m.id_ws}'><img src='../img/btn-show.svg' alt='btn-delete'style='width: 70%; height: 100%;'/></a>
          <a href='updatePets_ws.html?id=${m.id_ws}'><img src='../img/btn-edit.svg' alt='btn-edit' style='width: 70%; height: 100%;'/></a>
          <a href='#' onclick="deletePets(${m.id_ws})"><img src='../img/btn-delete.svg' alt='btn-delete'style='width: 70%; height: 100%;'/></a>
        </div>
      </div>
    `).join('');

    contenedor.innerHTML = tarjetas;
  } catch (error) {
    console.error('Error al cargar mascotas:', error);
    contenedor.innerHTML = '<p>Error al cargar las mascotas.</p>';
  }
});

async function deletePets(id) {
  const confirmacion = confirm('¿Estás seguro de que quieres eliminar esta mascota?');
  if (!confirmacion) return;

  try {
    const res = await fetch(`http://10.4.20.64:3000/pets_ws/${id}`, {
      method: 'DELETE',
    });

    const data = await res.json();
    if (res.ok) {
      alert('Mascota eliminada correctamente');
      window.location.reload();
    } else {
      alert('Error al eliminar: ' + data.msg);
    }
  } catch (error) {
    console.error('Error eliminando mascota:', error);
    alert('Error al conectar con el servidor');
  }
}

