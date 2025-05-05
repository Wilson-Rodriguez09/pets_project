import { PrismaClient } from "@prisma/client";
import multer from 'multer';

 const prisma = new PrismaClient();

 const storage= multer.diskStorage({
    destination:function(req,img,cb){
        cb(null,"public/img");
    },
    filename: function(req,img,cb){
        cb(null,img.originalname);
    }
 });

 const upload= multer({storage:storage});
 export const CargarImg=upload.single('photo_ws')


 export const getPet = async (req, res)=>{
    try{
        const pets_ws = await prisma.pets_ws.findMany({
            include: {
                raceId_ws: true,
                categoryId_ws: true,
                genderId_ws: true,
                userId_ws: true,
            }
        });
        if(pets_ws){
            res.status(200).json(pets_ws);
        }else{
            res.status(404).json({msg:"Error al obtener las mascotas"});
        }
    }catch (error){
        console.error(error);
        res.status(500).json({msg: "Error en el servidor"})
    }
 };

 export const getPetId = async (req, res)=>{
    try{
        const {id_ws} = req.params;
        const pets_ws = await prisma.pets_ws.findUnique({
            where: {id_ws: parseInt(id_ws)},
            include: {
                raceId_ws: true,
                categoryId_ws: true,
                genderId_ws: true,
                userId_ws: true,
            }
        });
        
        if(pets_ws){
            res.status(200).json(pets_ws);
        }else {
            res.status(404).json({msg: "Error al obtener mascota"});
        }
    } catch (error){
        res.status(500).json({msg: "Error en el servidor"});
    }
 };

 export const createPet = async (req, res)=>{
    try{
        const {raceId_ws, estado_ws, categoryId_ws, genderId_ws, userId_ws} = req.body;
        if(!req.file){
            return res.status(400).json({msg: "Imagen obligatoria"})
        }
        const photo_ws = req.file.filename;
        const pets_ws = await prisma.pets_ws.create({
            data: {raceId_ws, estado_ws, categoryId_ws, genderId_ws, userId_ws, photo_ws},
        });

        if(pets_ws){
            res.status(200).json({msg: "Pet registrado correctamente", pet: pets_ws})
        }else {
            res.status(404).json({msg: "Error al registrar pet"})
        }
    } catch (error){
        console.error(error);
        res.status(500).json({msg: "Error en el servidor"})
    }
 };

 export const updatePetId = async (req, res)=>{
    try{
        const id_ws = parseInt(req.params.id_ws);
        const {raceId_ws, estado_ws, categoryId_ws, genderId_ws, userId_ws} = req.body;
        let updateData = {raceId_ws, estado_ws, categoryId_ws, genderId_ws, userId_ws };
        if (req.file) {
            updateData.photo_ws = req.file.filename;
          }        
        const pets_ws = await prisma.pets_ws.update({
          where: { id_ws:id_ws }, 
          data: updateData,
        });

        if(pets_ws){
            res.status(200).json({msg: "Pet actualizado correctamente", pet: pets_ws})
        }else{
            res.status(404).json({msg: "Error al actulizar pet"})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error en el servidor" });
    } 
 }

 export const deletePetId = async (req, res) =>{
    try{
        const {id_ws} = req.params;
        await prisma.pets_ws.delete({
            where: { id_ws: parseInt(id_ws) },
        });

        res.status(200).json({msg: "Pet eliminado correctamente"})
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error en el servidor" });
      }
 };

 