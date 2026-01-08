import express, { Router } from "express"
import { getUsers, getActiveUsers, checkAdmin, registerUser, deleteUser, updateUser } from "../controllers/user.controller.js";
import { validateUser } from "../middlewares/validate.middleware.js";

const router = express.Router();

router.get("/", getUsers)

router.get("/active", getActiveUsers)

router.get("/checkAdmin", checkAdmin)

router.post("/register",validateUser, registerUser)

router.delete("/:id", deleteUser )

router.put("/:id", updateUser)

export default router