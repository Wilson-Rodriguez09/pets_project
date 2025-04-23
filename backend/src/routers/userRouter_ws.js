import { Router } from "express";
import { validarToken } from "../controllers/autenticacionController_ws.js";
import { deleteUserId, getUser } from "../controllers/userController_ws.js";
import { getUserId } from "../controllers/userController_ws.js";
import { createUser } from "../controllers/userController_ws.js";
import { updateUserId } from "../controllers/userController_ws.js";

const router = Router();

router.get("/users", validarToken, getUser);
router.get("/users/:id_ws", validarToken, getUserId);
router.post("/users", validarToken,createUser);
router.put("/users/:id_ws",validarToken, updateUserId);
router.delete("/users/:id_ws", validarToken, deleteUserId);

export default router;