import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (user.status === 'InActive') {
      return res.status(403).json({ message: "User is inactive, contact administrator" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create and send JSON Web Token (JWT)
    const exp = Date.now() + 1000 * 60 * 60 * 24 * 7;
    const token = jwt.sign({ sub: user._id, exp }, process.env.JWT_SECRET);

    res.status(200).json({ token, userId: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie(Authorization);

    res.sendStatus(200);
  } catch (error) {
    res.json({ error: "error.message" });
  }
};

export const checkAuth = (req, res) => {
  const currentUser = req.user;

  // Include the user ID in the response
  res.status(200).json({ id: currentUser._id });
};

export const fetchUsers = async (req, res) => {
  try {
    const user = await User.find();
    res.json({ user });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const fetchUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const register = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      office,
      designation,
      email,
      password,
      userType,
    } = req.body;

    let signature = '';
    if (req.file) {
      signature = `/assets/${req.file.filename}`
    }

    // Hash password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName: firstname,
      lastName: lastname,
      designation,
      office,
      email,
      password: hashedPassword,
      userType,
      signature,
      status: 'Active'
    });

    await user.save();
    console.log(user);

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateUserStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const { newStatus } = req.body;


    // Validate if the new status is one of the allowed values
    if (!['Active', 'InActive'].includes(newStatus)) {
      return res.status(400).send({ error: 'Invalid status value' });
    }

    // Find the current user to get the current status
    const currentUser = await User.findById(userId);
    if (!currentUser) {
      return res.status(404).send({ error: 'User not found' });
    }

    // Toggle the status based on the current status
    const toggledStatus = currentUser.status === 'Active' ? 'InActive' : 'Active';

    // Update the user's status in the database based on the toggled status
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { status: toggledStatus },
      { new: true } // Return the updated document
    );

    console.log(updatedUser)


    if (!updatedUser) {
      return res.status(404).send({ error: 'User not found' });
    }

    res.status(200).send({ message: 'User status updated successfully', updatedUser });
  } catch (error) {
    console.error('Error toggling user status:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};




export const updateUserType = async (userId, newUserType) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { userType: newUserType },
      { new: true }
    );
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
