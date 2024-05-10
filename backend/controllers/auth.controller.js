import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const data = req.body;
    if (data.password !== data.confirmPassword) {
      return res.status(400).json({
        error: "Password and confirm password doesn't match",
      });
    }
    const user = await User.findOne({ username: data.username });

    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }

    data.password = bcrypt.hashSync(data.password, 10);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${data.username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${data.username}`;

    const finalData = {
      ...data,
      profilePic: data.gender === "male" ? boyProfilePic : girlProfilePic,
    };

    const newUser = new User(finalData);

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      const response = await newUser.save();
      res.status(200).json({
        result: response,
        message: "User created successfully",
        meta: null,
      });
    }
  } catch (except) {
    res.status(500).json({
      result: except.result ?? null,
      message: except.message ?? "Internal server error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const credentials = req.body;
    const user = await User.findOne({ username: credentials.username });
    if (user && bcrypt.compare(credentials.password, user?.password || "")) {
      generateTokenAndSetCookie(user._id, res);
      res.status(200).json({
        result: user,
        message: "User logged in successfully",
        meta: null,
      });
    } else {
      return res.status(400).json({ error: "Invalid username or password" });
    }
  } catch (except) {
    res.status(500).json({
      result: except.result ?? null,
      message: except.message ?? "Internal server error",
    });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged Out Successfully" });
  } catch (except) {
    res.status(500).json({
      result: except.result ?? null,
      message: except.message ?? "Internal server error",
    });
  }
};
