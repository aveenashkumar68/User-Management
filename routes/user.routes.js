import express, { Router } from "express"
import { 
  getUsers, 
  getActiveUsers, 
  checkAdmin, 
  registerUser, 
  deleteUser, 
  updateUser, 
  loginUser 
} from "../controllers/user.controller.js";

import { validateUser } from "../middlewares/validate.middleware.js";

const router = express.Router();


router.post("/register", registerUser);
router.post("/login", loginUser)


router.get("/", getUsers)

router.get("/active", getActiveUsers)

router.get("/checkAdmin", checkAdmin)

router.delete("/:id", deleteUser )

router.put("/:id", updateUser)

export default router