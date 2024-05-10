import express from "express";
import { auth } from "../middlewares/auth.js";
import { getUsersForSidebar } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", auth, getUsersForSidebar);

export default router;
