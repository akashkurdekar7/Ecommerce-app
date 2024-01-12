// after routing the register and login and giving them authcontrollers
// after the token generation
// using token create a middleware to protect the user

import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

//Protected Routes token base
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(req.headers.authorization, process.env.JWT_TOKEN);
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    res.send({
      message: "Invalid token",
    });
  }
};

//admin access role = 0 \ 1
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in admin middleware",
      error: error.message,
    });
  }
};
