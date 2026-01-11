import User from "../models/user.model.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, { name: 1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};


export const getActiveUsers = async (req, res) => {
  try {
    const users = await User.find({ active: true });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};



export const checkAdmin = async (req, res) => {
  try {
    const hasAdmin = await User.exists({ role: "admin" });
    res.status(200).json({ hasAdmin: !!hasAdmin });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};


export const registerUser = async(req, res) => {
  try {
    // console.log("Request Body:", req.body);
    const { name, email, role, password } = req.body;

    // Validation
    if(!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        error: "All fields required"
      })
    }

    // check if user exists

    const existingUser = await User.findOne({email})
    if(existingUser) {
      return res.status(409).json({
        success: false,
        error: "Email are already registered"
      })
    }

    // Hash Password

    const hashedPassword = await bcrypt.hash(password, 10);


    const user = await User.create({
      name, 
      email, 
      role, 
      password: hashedPassword
    });

    res.status(201).json({
      success: true,
      message: "user registered successfully",
      data: user
    })
  }catch(error) {
    res.status(500).json({
      error: error.message
    })
  }
}

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // checking input
    if(!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Email and password are required"
      })
    }

    const user = await User.findOne({ email });
    if(!user) {
      return res.status(404).json({
        success: false,
        error: "User not found"
      });
    }

    // Compare password

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
      return res.status(401).json({
        success: false,
        error: "Invalid Credentials"
      })
    }

    // Generate Token
    const token = jwt.sign(
      {
        id: user._id, 
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );
    
    res.status(200).json({
      success: true,
      message: "Login successfull",
      token
    })
  }catch(error) {
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
}




export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);


    if(!deletedUser) {
      return res.status(404).json({error: "user not found"});
    }

    res.status(200).json({
      message: "User deleted successfully",
      data: deletedUser
    });
  } catch(error) {
    res.status(500).json({error: "Invalid ID or Server Error"})
  }
}

export  const updateUser = async (req, res) => {
  try {

    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});

    if(!updatedUser) {
      return res.status(404).json({error: "No updates found"})
    }

    res.status(200).json({
      message: "User updated Successfully",
      data: updatedUser
    })
  } catch(error) {
    res.status(500).json({error: "Invalid ID or Server Error"})
  }
}

