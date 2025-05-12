import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const countPetCategory_ws = async (req, res) => {
  try {

    const resultado = await prisma.pets_ws.groupBy({
      by: ['categoryId_ws'],
      _count: {
        categoryId_ws: true
      }
    });

    const categorias = await prisma.categories_ws.findMany({
      where: {
        id_ws: {
          in: resultado.map(r => r.categoryId_ws)
        }
      }
    });

    const reporte = resultado.map(r => {
      const categoria = categorias.find(c => c.id_ws === r.categoryId_ws);
      return {
        categoria: categoria?.name_ws || 'Desconocida',
        cantidad: r._count.categoryId_ws
      };
    });

    res.json(reporte);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al generar reporte' });
  }
};