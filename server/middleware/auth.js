import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const authMiddleware = async (req, res, next) => {
	try {
		const token = req.cookies.Authorization;

		if (!token) {
			return res.sendStatus(401);
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		if (Date.now() > decoded.exp) {
			return res.sendStatus(401);
		}

		const user = await User.findById(decoded.sub);

		if (!user) {
			return res.sendStatus(401);
		}

		req.user = user;
		next();
	} catch (err) {
		console.error(err);
		res.sendStatus(401);
	}
};
