import { Router } from "express";
import { validarToken } from "../controllers/autenticacionController_ws.js";
import { createCategorie, deleteCategorieId, getCategorie, getCategorieId, updateCategorieId } from "../controllers/categorieController_ws.js";

const router = Router();

router.get("/categories",validarToken,getCategorie);
router.get("/categories/:id_ws",validarToken,getCategorieId);
router.post("/categories",validarToken,createCategorie);
router.put("/categories/:id_ws",validarToken,updateCategorieId);
router.delete("/categories/:id_ws",validarToken,deleteCategorieId);

export default router;