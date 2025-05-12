async function generarGrafico() {
  try {
    const response = await fetch('http://192.168.88.102:3000/reportePets_ws');
    const data = await response.json();
    console.log('Datos recibidos del backend:', data);
    const categorias = data.map(d => d.categoria);
    const cantidades = data.map(d => d.cantidad);

    const ctx = document.getElementById('graficoMascotas').getContext('2d');

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: categorias,
        datasets: [{
          label: 'Cantidad de Mascotas',
          data: cantidades,
          backgroundColor: ['white', 'black'],
          borderColor: ['black', 'white'],
          borderWidth: 1,
          barThickness: 30
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Mascotas Registradas por Categoría'
          }
        }
      }
    });
  } catch (error) {
    console.error('Error al obtener los datos del reporte:', error);
  }
}

document.addEventListener('DOMContentLoaded', generarGrafico);