const API_URL = "http://192.168.101.12:3000";

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No se encontró token en localStorage");
    return {};
  }
  return {
    Authorization: `Bearer ${token}`,
  };
}

async function loadPetsMap() {
  try {
    const response = await fetch(`${API_URL}/pets_ws`, { headers: getAuthHeaders() });
    if (!response.ok) {
      throw new Error("Error al obtener las mascotas");
    }
    const pets = await response.json();

    const map = L.map("map").setView([4.60971, -74.08175], 10);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    pets
      .filter((pet) => pet.latitud_ws && pet.longitud_ws)
      .forEach((pet) => {
        L.marker([pet.latitud_ws, pet.longitud_ws])
          .addTo(map)
          .bindPopup(`
            <b>${pet.name_ws}</b><br>
            Raza: ${pet.race_ws?.name_ws || "Sin raza"}<br>
            Categoría: ${pet.category_ws?.name_ws || "Sin categoría"}<br>
            Género: ${pet.gender_ws?.name_ws || "Sin género"}<br>
            Estado: ${pet.estado_ws || "Sin estado"}<br>
            <a href="vermascota.html?id=${pet.id_ws}">Ver detalles</a>
          `);
      });

    if (pets.some((pet) => pet.latitud_ws && pet.longitud_ws)) {
      const group = new L.featureGroup(
        pets
          .filter((pet) => pet.latitud_ws && pet.longitud_ws)
          .map((pet) => L.marker([pet.latitud_ws, pet.longitud_ws]))
      );
      map.fitBounds(group.getBounds(), { padding: [50, 50] });
    }
  } catch (error) {
    console.error("Error al cargar el mapa de mascotas:", error);
    alert("Error al cargar el mapa de mascotas");
    document.getElementById("map").innerHTML = "<p>Error al cargar las mascotas.</p>";
  }
}

document.addEventListener("DOMContentLoaded", loadPetsMap);