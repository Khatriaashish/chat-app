import express from "express";
import { getMessages, sendMessage } from "../controllers/msg.controller.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.get("/:id", auth, getMessages);
router.post("/send/:id", auth, sendMessage);

export default router;
