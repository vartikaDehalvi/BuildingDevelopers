import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import gravatar from 'gravatar';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { check, validationResult } from 'express-validator';
import { UserModel } from '../../models/User.js';

const router = express.Router();

router.post(
	'/',
	/*validation middleware*/
	[
		check('name', 'Name is required').not().isEmpty(),
		check('email', 'Email is required').isEmail(),
		check(
			'password',
			'Please enter your password with 6 or more characters'
		).isLength({ min: 6 }),
	],

	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, email, password } = req.body;
		console.log(name, email, password);

		try {
			/* Default Settings for images*/
			const avatar = gravatar.url(email, {
				s: '200', //default size
				r: 'pg', //default rating
				d: 'mm', //default image
			});

			let user = await UserModel.findOne({ email });
			//user existance check
			if (user)
				return res
					.status(400)
					.json({ errors: [{ message: 'User already exists' }] });

			//New Instance
			user = new UserModel({
				name,
				email,
				avatar,
				password,
			});

			//Encrypt Password
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);

			await user.save(); //Save user in DB

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
				{ expiresIn: 3600000000000000 },
				(err, token) => {
					//if error occurs
					if (err) throw err;

					//if token received
					res.json({ token });
				}
			);
		} catch (err) {
			res.status(500).send('Server error');
			console.error(err.message);
		}
	}
);

export { router as userRouter };
