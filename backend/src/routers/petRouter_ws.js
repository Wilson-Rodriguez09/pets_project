import { Router } from "express";
import { validarToken } from "../controllers/autenticacionController_ws.js";
import { CargarImg, createPet, deletePetId, getPet, getPetId, updatePetId } from "../controllers/petController_ws.js";


const router = Router();

router.post("/pets",validarToken,CargarImg,createPet);
router.get("/pets",validarToken,getPet);
router.get("/pets/:id_ws",validarToken, getPetId);
router.put("/pets/:id_ws",validarToken,CargarImg,updatePetId);
router.delete("/pets/:id_ws",validarToken, deletePetId);

export default router;