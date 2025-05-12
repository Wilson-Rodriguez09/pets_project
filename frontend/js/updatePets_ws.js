const params = new URLSearchParams(window.location.search);
const petId = params.get('id');
const token = localStorage.getItem('token')

async function loadOptions() {
    try {
        const racesRes = await fetch('http://10.4.20.64:3000/races_ws', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        const races = await racesRes.json();
        const raceSelect = document.getElementById('raceId_ws');
        races.forEach(race => {
            const option = document.createElement('option');
            option.value = race.id_ws; 
            option.textContent = race.name_ws;
            raceSelect.appendChild(option);
        });

        const categoriesRes = await fetch('http://10.4.20.64:3000/categories_ws', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        const categories = await categoriesRes.json();
        const categorySelect = document.getElementById('categoryId_ws');
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id_ws;
            option.textContent = category.name_ws;
            categorySelect.appendChild(option);
        });

        const gendersRes = await fetch('http://10.4.20.64:3000/genders_ws', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        const genders = await gendersRes.json();
        const genderSelect = document.getElementById('genderId_ws');
        genders.forEach(gender => {
            const option = document.createElement('option');
            option.value = gender.id_ws;
            option.textContent = gender.name_ws;
            genderSelect.appendChild(option);
            console.log(`Género: value=${option.value}, text=${option.textContent}`);
        });

        const usersRes = await fetch('http://10.4.20.64:3000/users_ws', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        const users = await usersRes.json();
        const userSelect = document.getElementById('userId_ws');
        users.forEach(user => {
            const option = document.createElement('option');
            option.value = user.id_ws;
            option.textContent = user.fullname_ws;
            userSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar las opciones:', error);
    }
}

async function loadPetData(id) {
    try {
        const res = await fetch(`http://10.4.20.64:3000/pets_ws/${id}`,{
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        const pet = await res.json();

        document.getElementById('name_ws').value = pet.name_ws;
        document.getElementById('raceId_ws').value = pet.raceId_ws;
        document.getElementById('categoryId_ws').value = pet.categoryId_ws;
        document.getElementById('genderId_ws').value = pet.genderId_ws;
        document.getElementById('userId_ws').value = pet.userId_ws;
        document.getElementById('estado_ws').value = pet.estado_ws;
    } catch (error) {
        console.error('Error al cargar la mascota:', error);
    }
}



document.getElementById('form-mascota').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name_ws = document.getElementById('name_ws').value.trim();
    const raceId_ws = document.getElementById('raceId_ws').value;
    const categoryId_ws = document.getElementById('categoryId_ws').value;
    const genderId_ws = document.getElementById('genderId_ws').value;
    const userId_ws = document.getElementById('userId_ws').value;
    const estado_ws = document.getElementById('estado_ws').value.trim();
    const photo_ws = document.getElementById('photo_ws').files[0];

    if (!name_ws) {
        alert('Por favor, ingrese el nombre de la mascota');
        return;
    }
    if (!raceId_ws || isNaN(Number(raceId_ws))) {
        alert('Por favor, seleccione una raza válida');
        return;
    }
    if (!categoryId_ws || isNaN(Number(categoryId_ws))) {
        alert('Por favor, seleccione una categoría válida');
        return;
    }
    if (!genderId_ws || isNaN(Number(genderId_ws))) {
        alert('Por favor, seleccione un género válido');
        return;
    }
    if (!userId_ws || isNaN(Number(userId_ws))) {
        alert('Por favor, seleccione un usuario válido');
        return;
    }
    if (!estado_ws) {
        alert('Por favor, seleccione un estado válido');
        return;
    }
    if (!photo_ws) {
        alert('Por favor, seleccione una imagen');
        return;
    }

    const formData = new FormData();
    formData.append('name_ws', name_ws);
    formData.append('raceId_ws', raceId_ws);
    formData.append('categoryId_ws', categoryId_ws);
    formData.append('genderId_ws', genderId_ws);
    formData.append('userId_ws', userId_ws);
    formData.append('estado_ws', estado_ws);
    if (photo_ws) formData.append('photo_ws', photo_ws);

    const url = petId 
        ? `http://10.4.20.64:3000/pets_ws/${petId}`
        : 'http://10.4.20.64:3000/pets_ws';

    const method = petId ? 'PUT' : 'POST';

    try {
        const response = await fetch(url, {
            method,
            headers: {
                'Authorization': `Bearer ${token}`
             },
            body: formData
        });

        const result = await response.json();
        if (response.ok) {
            alert(petId ? 'Mascota actualizada' : 'Mascota registrada correctamente');
            window.location.href = 'getPets.html';
        } else {
            alert('Error: ' + result.msg);
        }
    } catch (error) {
        console.error('Error en el envío del formulario:', error);
        alert('Error en el servidor');
    }
   
});

document.addEventListener('DOMContentLoaded', async () => {
document.getElementById('photo_ws').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const preview = document.getElementById('preview-img');

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.src = e.target.result;
        };
        reader.readAsDataURL(file);
    } else {
        preview.src = '../img/photo-lg-0.svg'; // Imagen por defecto
    }
});
    await loadOptions();
    if (petId) await loadPetData(petId);
});