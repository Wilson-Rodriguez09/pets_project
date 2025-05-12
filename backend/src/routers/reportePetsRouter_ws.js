import { Router } from "express";
import { countPetCategory_ws } from "../controllers/reportePets_ws.js";
import { validarToken_ws } from "../controllers/autenticacionController_ws.js";

const route = Router();

route.get('/reportePets_ws',validarToken_ws, countPetCategory_ws);

export default route;