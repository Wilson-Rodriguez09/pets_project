import { Router } from "express";
import { validarToken } from "../controllers/autenticacionController_ws.js";
import { createRace, deleteRaceId, getRace, getRaceId, updateRaceId } from "../controllers/raceController_ws.js";


const router = Router();

router.get("/races",validarToken,getRace);
router.get("/races/:id_ws",validarToken, getRaceId);
router.post("/races", validarToken,createRace);
router.put("/races",validarToken,updateRaceId);
router.delete("/races",validarToken,deleteRaceId);


export default router;