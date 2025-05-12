document.addEventListener('DOMContentLoaded', async ()=>{
    const contenedor = document.getElementById('detalle-mascota');
    const param = new URLSearchParams(window.location.search);
    const id = param.get('id');
    const token = localStorage.getItem('token')

    if(!id){
        contenedor.innerHTML = '<p>ID no espesificado</p>';
        return;
    }

     try {
        const res = await fetch(`http://10.4.20.64:3000/pets_ws/${id}`,{
          headers: {
                'Authorization': `Bearer ${token}`
            },
        })
        if(!res.ok) throw new Error("Pet no encontrado");
        const m = await res.json();

        contenedor.innerHTML = `
        <div class='photo'>
        <img src="http://10.4.20.64:3000/public/img/${m.photo_ws}" alt="Mascota" />
        </div>
        <div class='list-content'>
          <div class="campo">
            <label>Nombre:</label>
            <span>${m.name_ws}</span>
          </div>
          <div class="campo">
            <label>Raza:</label>
            <span>${m.race_ws?.name_ws || 'Sin raza'}</span>
          </div>
          <div class="campo">
            <label>Categoría:</label>
            <span>${m.category_ws?.name_ws || 'Sin categoría'}</span>
          </div>
          <div class="campo">
            <label>Genero:</label>
            <span>${m.gender_ws?.name_ws || 'No definido'}</span>
          </div>
        </div>
        `
     } catch (error){
        console.log(error);
        contenedor.innerHTML = '<p>Error al cargar la mascota.</p>';
     };
})