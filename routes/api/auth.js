import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { check, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import auth from '../../middleware/auth.js';
import { UserModel } from '../../models/User.js';

const router = express.Router();

router.get('/', auth, async (req, res) => {
	try {
		//select the user by id, except the password
		const user = await UserModel.findById(req.user.id).select('-password');
		res.json(user);
	} catch (err) {
		res.status(500).send('Server error: ' + err.message);
	}
});

router.post(
	'/',
	/*validation middleware*/
	[
		check('email', 'Email is required').isEmail(),
		check('password', 'Password is required').exists(),
	],

	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, password } = req.body;
		console.log(email, password);

		try {
			let user = await UserModel.findOne({ email });
			//user existence check
			if (!user) {
				return res
					.status(400)
					.json({ errors: [{ message: 'Invalid Credentials' }] });
			}

			//Compare to see the passwords match
			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return res
					.status(400)
					.json({ errors: [{ msg: 'Invalid Credentials' }] });
			}

			//get the payload
			const payload = {
				user: {
					id: user.id,
				},
			};

			//sign with token
			jwt.sign(
				payload,
				process.env.JWT_SECRET,
				{ expiresIn: 3600 },
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (err) {
			res.status(500).send('Server error');
			console.error(err.message);
		}
	}
);

export { router as authRouter };
