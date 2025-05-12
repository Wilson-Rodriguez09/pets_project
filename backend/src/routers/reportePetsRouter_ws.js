import { Router } from "express";
import { countPetCategory_ws } from "../controllers/reportePets_ws.js";


const route = Router();

route.get('/reportePets_ws', countPetCategory_ws);

export default route;