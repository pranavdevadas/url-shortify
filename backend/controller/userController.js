import expressAsyncHandler from "express-async-handler";
import User from "../model/user.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

const userController = {
  login: expressAsyncHandler(async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (user && (await bcrypt.compare(password, user.password))) {
        generateToken(res, user._id);
        res.status(200).json({
          _id: user._id,
          name: user.name,
          email: user.password,
        });
      } else {
        res.status(400).json({ message: "Invalid Email or Password" });
      }
    } catch (error) {
      console.error(error);
    }
  }),
  register: expressAsyncHandler(async (req, res) => {
    try {
      const { name, email, password } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(400).json("User Already Exist");
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
      });
      if (user) {
        generateToken(res, user._id);
        res.status(200).json({
          _id: user._id,
          name: user.name,
          email: user.email,
        });
      } else {
        res.status(400).json({ message: "Invalid User Data" });
      }
    } catch (error) {
      console.error(error);
    }
  }),
  logout: expressAsyncHandler(async (req, res) => {
    try {
      res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
      });
      res.status(200).json({ message: "Logged out" });
    } catch (error) {
      console.error(error);
    }
  }),
};

export default userController;
