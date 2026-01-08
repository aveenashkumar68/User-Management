import User from "../models/user.model.js";

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
    const { name, email, role } = req.body;

    const user = await User.create({
      name, email, role
    });

    res.status(201).json({
      message: "user registered successfully",
      data: user
    })
  }catch(error) {
    res.status(500).json({
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