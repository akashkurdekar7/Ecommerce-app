import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//routing
//register || method POST
router.post("/register", registerController);

//login || POST
router.post("/login", loginController);

//forgot password || POST
router.post("/forgot-password", forgotPasswordController);

// test Routes
//requireSignIn is the middleware here need t provide JWT token is in the login
router.get("/test", requireSignIn, isAdmin, testController);

// protected user route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({
    ok: true,
  });
});

// protected admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, async (req, res) => {
  res.status(200).send({
    ok: true,
  });
});
export default router;
