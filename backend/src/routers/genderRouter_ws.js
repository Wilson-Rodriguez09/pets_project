import { Router } from 'express';
import { createGender, deleteGenderId, getGender, getGenderId, updateGenderId } from '../controllers/genderController_ws.js';
import { validarToken } from '../controllers/autenticacionController_ws.js';


const router = Router();

router.get("/genders",validarToken,getGender);
router.get("/genders/:id_ws",validarToken,getGenderId);
router.post("/genders",validarToken,createGender);
router.put("/genders/:id_ws",validarToken,updateGenderId);
router.delete("/genders/:id_ws",validarToken,deleteGenderId);

export default router;