import User from "../models/user.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });

		if (!user) {
			return res.status(401).json({ message: 'Invalid credentials' });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(401).json({ message: 'Invalid credentials' });
		}

		// Create and send JSON Web Token (JWT)
		const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
		const token = jwt.sign({ sub: user._id, exp }, process.env.JWT_SECRET);

		res.status(200).json({ token, userId: user._id });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server error' });
	}
};

export const logout = async (req, res) => {
	try {
		res.clearCookie(Authorization)

		res.sendStatus(200)
	} catch (error) {
		res.json({ error: "error.message" })
	}
}


export const checkAuth = (req, res) => {
	const currentUser = req.user;

	// Include the user ID in the response
	res.status(200).json({ id: currentUser._id });
};



export const fetchUsers = async (req, res) => {
	try {
		const users = await User.find({});
		res.json(users);
	} catch (error) {
		console.error('Error fetching users:', error);
		res.status(500).json({ error: 'Failed to fetch users' });
	}
};


export const fetchUser = async (req, res) => {
	const { id } = req.params;

	try {
		const user = await User.findById(id);
		res.json(user);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal server error' });
	}
}


export const register = async (req, res) => {
	try {
		const { firstName, lastName, designation, email, password, userType } = req.body;

		// Hash password with bcrypt
		const hashedPassword = await bcrypt.hash(password, 10);

		const user = new User({
			firstName,
			lastName,
			designation,
			email,
			password: hashedPassword,
			userType
			//signImageUrl: req.file ? req.file.filename : undefined
		});

		await user.save();

		res.json({ user });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server error' });
	}
}

export const updateUserType = async (userId, newUserType) => {
	try {
		const user = await User.findOneAndUpdate(
			{ _id: userId },
			{ userType: newUserType },
			{ new: true }
		);
		if (!user) {
			throw new Error('User not found');
		}
		return user;
	} catch (error) {
		console.error(error);
		throw error;
	}
}







