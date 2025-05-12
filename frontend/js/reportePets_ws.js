window.onload = async () => {
  const token = localStorage.getItem('token')
  try {
    const res = await fetch('http://10.4.20.64:3000/reportePets_ws', {
      headers: {
                'Authorization': `Bearer ${token}`
            },
    }); 
    const data = await res.json();
    cargarTabla(data);
  } catch (err) {
    console.error("Error cargando reporte:", err);
    alert("No se pudo cargar el reporte");
  }
};

function cargarTabla(categorias) {
  const tbody = document.querySelector('#tabla-categorias tbody');
  tbody.innerHTML = '';

  categorias.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.categoria}</td>
      <td>${item.cantidad}</td>
    `;
    tbody.appendChild(row);
  });
}

function descargarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.text('Reporte de Mascotas por Categoría', 14, 15);

  const rows = [];
  document.querySelectorAll('#tabla-categorias tbody tr').forEach(tr => {
    const cols = [...tr.children].map(td => td.textContent);
    rows.push(cols);
  });

  doc.autoTable({
    head: [['Categoría', 'Cantidad']],
    body: rows,
    startY: 25,
  });

  doc.save('reporte_mascotas_por_categoria.pdf');
}