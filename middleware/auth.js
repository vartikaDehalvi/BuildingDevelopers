import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const auth = (req, res, next) => {
	//Get the token from the header

	const token = req.header('x-auth-token'); //header method gets the token from the actual header
	//check if no token
	if (!token) return res.status(401).json({ message: 'Not authorized' });

	try {
		//valid token received, decode the token
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		req.user = decoded.user; //req.user available to access from anywhere in a protected route
		next();
	} catch (err) {
		//Invalid token received
		res.status(401).json({ message: 'Invalid token' });
	}
};
export default auth;
