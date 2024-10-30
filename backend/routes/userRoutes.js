import express from "express";
const router = express.Router();
import userController from "../controller/userController.js";
import protect from "../middleware/authMiddleware.js";
import shortenerController from "../controller/shortenerController.js";

router.post("/login", userController.login);
router.post("/register", userController.register);
router.post("/logout", userController.logout);
router.post("/short-url", protect, shortenerController.urlShortener);
router.get("/:shortCode", shortenerController.redirectUrl);

export default router;
