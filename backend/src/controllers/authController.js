import User from "../models/userModel.js";
import { generateToken } from "../utils/jwtToken.js";

export const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Required fields
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Password strength validation
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    // Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Create user (password hashed by model)
    const user = await User.create({
      fullName,
      email,
      password
    });

    // Token on signup
    const token = generateToken(user._id);

    res.status(201).json({
      message: "User registered successfully",
      token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    // Find user + password
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Account status check
    if (user.status === "inactive") {
      return res.status(403).json({ message: "Account is deactivated" });
    }

    // Verify password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Update last login timestamp
    user.lastLogin = new Date();
    await user.save();

    // Token on login
    const token = generateToken(user._id);

    res.status(200).json({
      message: "Login successful",
      token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const getMe = async (req, res) => {
  // req.user is set by auth middleware
  return res.status(200).json(req.user);
};


export const logout = async (req, res) => {
  return res.status(200).json({ message: "Logged out successfully" });
};
