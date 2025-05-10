async function loadOptions() {
    try {
        const racesRes = await fetch('http://192.168.88.102:3000/races_ws');
        const races = await racesRes.json();
        const raceSelect = document.getElementById('raceId_ws');
        races.forEach(race => {
            const option = document.createElement('option');
            option.value = race.id_ws; 
            option.textContent = race.name_ws;
            raceSelect.appendChild(option);
        });

        const categoriesRes = await fetch('http://192.168.88.102:3000/categories_ws');
        const categories = await categoriesRes.json();
        const categorySelect = document.getElementById('categoryId_ws');
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id_ws;
            option.textContent = category.name_ws;
            categorySelect.appendChild(option);
        });

        const gendersRes = await fetch('http://192.168.88.102:3000/genders_ws');
        const genders = await gendersRes.json();
        const genderSelect = document.getElementById('genderId_ws');
        genders.forEach(gender => {
            const option = document.createElement('option');
            option.value = gender.id_ws;
            option.textContent = gender.name_ws;
            genderSelect.appendChild(option);
            console.log(`Género: value=${option.value}, text=${option.textContent}`);
        });

        const usersRes = await fetch('http://192.168.88.102:3000/users_ws');
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
    formData.append('photo_ws', photo_ws);


    try {
        const response = await fetch('http://192.168.88.102:3000/pets_ws', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        if (response.ok) {
            console.log('Respuesta OK. Redirigiendo...');
            alert('Mascota registrada correctamente');
            window.location.href = 'getPets.html';
        } else {
            alert('Error: ' + result.msg);
        }
    } catch (error) {
        console.error('Error al enviar el formulario:', error);
        alert('Error en el servidor');
    }
});

document.addEventListener('DOMContentLoaded', loadOptions);