import { Router } from "express";
import { loginUser } from "../controllers/autenticacionController_ws.js";

const router = Router();

router.post("/login", loginUser);

export default router;