import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import verifyToken from "../middleware/auth"; //importing the middleware endpoint

const router = express.Router();

router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "password with 6 or more character is required").isLength(
      {
        min: 6,
      }
    ),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invailid Credentials user" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Invailid Credentials password" });
      }
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: "1d" }
      );
      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });
      res.status(200).json({ userId: user._id });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "something went very wrong! moye moye" });
    }
  }
);
router.get("/validate-token", verifyToken, (req: Request, res: Response)=>{
res.status(200).send({userId: req.userId})
}) //what this endpoint will do is-whatever we make a request to validate token endpoint, its gonna run some middleware(in our case verifyToken), its gonna check the cookie sent from frontend, if its passed its gonna execute the next function, which these do are if the cookie token is valid its send a 200 response, nd pass to the user the userid that added from the request

export default router;
