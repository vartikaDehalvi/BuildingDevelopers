import jwt from 'jsonwebtoken';
import config from 'config';

const auth = (req, res, next) => {
	//Get the token from the header
	const token = req.header('x-auth-token');

	//check if no token
	if (!token) return res.status(401).json({ message: 'Not authorized' });

	//Verify the token
	try {
		//valid token received, decode the token
		const decoded = jwt.verify(token, config.get('jwtSecret'));
		req.user = decoded.user; //req.user available to access from anywhere in a protected route
		next();
	} catch (err) {
		//Invalid token received
		res.status(401).json({ message: 'Invalid token' });
	}
};
export default auth;
