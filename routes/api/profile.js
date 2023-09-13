import express, { response } from 'express';
import { check, validationResult } from 'express-validator';
import request from 'request';
import config from 'config';

import auth from '../../middleware/auth.js';
import { ProfileModel } from '../../models/Profile.js';
import { UserModel } from '../../models/User.js';
import { PostModel } from '../../models/Post.js';

const router = express.Router();

router.get('/me', auth, async (req, res) => {
	try {
		const profile = await ProfileModel.findOne({ user: req.user.id }).populate(
			'user',
			['name', 'avatar']
		); //bring name and avatar from user model

		//Profile Existance Check
		if (!profile) return res.status(400).json({ msg: 'No profile found' });
		res.json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

router.post(
	'/',
	[
		auth,
		[
			check('status', 'Status required').not().isEmpty(),
			check('skills', 'Skills required').not().isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(400).json({ errors: errors.array() });

		const {
			company,
			website,
			location,
			bio,
			status,
			githubusername,
			skills,
			youtube,
			facebook,
			twitter,
			instagram,
			linkedin,
		} = req.body;

		//Build profile object
		const profileFields = {};
		profileFields.user = req.user.id;
		if (company) profileFields.company = company;
		if (website) profileFields.website = website;
		if (location) profileFields.location = location;
		if (bio) profileFields.bio = bio;
		if (status) profileFields.status = status;
		if (githubusername) profileFields.githubusername = githubusername;
		if (skills) {
			profileFields.skills = skills.split(',').map((skill) => skill.trim());
		}

		//Build social Object
		profileFields.social = {};
		if (youtube) profileFields.social.youtube = youtube;
		if (twitter) profileFields.social.twitter = twitter;
		if (facebook) profileFields.social.facebook = facebook;
		if (linkedin) profileFields.social.linkedin = linkedin;
		if (instagram) profileFields.social.instagram = instagram;

		try {
			let profile = await ProfileModel.findOne({ user: req.user.id });
			if (profile) {
				//update profile
				profile = await ProfileModel.findOneAndUpdate(
					{ user: req.user.id },
					{ $set: profileFields },
					{ new: true }
				);
				return res.json(profile);
			}

			//Create a new profile
			profile = new ProfileModel(profileFields);
			//Save the profile
			await profile.save();

			return res.send(profile);
		} catch (err) {
			console.error(err.message);
			response.status(500).send('Server error: ' + err.message);
		}
	}
);

// Update a user's profile
router.put(
	'/',
	[
		auth,
		[
			check('status', 'Status required').not().isEmpty(),
			check('skills', 'Skills required').not().isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		// Extract fields from the request body
		const {
			company,
			website,
			location,
			bio,
			status,
			githubusername,
			skills,
			youtube,
			facebook,
			twitter,
			instagram,
			linkedin,
		} = req.body;

		//Build profile object
		const profileFields = {};
		profileFields.user = req.user.id;
		if (company) profileFields.company = company;
		if (website) profileFields.website = website;
		if (location) profileFields.location = location;
		if (bio) profileFields.bio = bio;
		if (status) profileFields.status = status;
		if (githubusername) profileFields.githubusername = githubusername;
		if (skills) {
			profileFields.skills = skills.split(',').map((skill) => skill.trim());
		}

		//Build social Object
		profileFields.social = { ...profile.social };
		if (youtube) profileFields.social.youtube = youtube;
		if (twitter) profileFields.social.twitter = twitter;
		if (facebook) profileFields.social.facebook = facebook;
		if (linkedin) profileFields.social.linkedin = linkedin;
		if (instagram) profileFields.social.instagram = instagram;

		// Retrieve the existing profile from the database
		let profile = await ProfileModel.findOne({ user: req.user.id });

		// Retrieve existing social links
		const existingSocialLinks = profile.social;

		// Merge existing and new social links
		profileFields.social = { ...existingSocialLinks, ...profileFields.social };

		// Update the profile
		profile = await ProfileModel.findOneAndUpdate(
			{ user: req.user.id },
			{ $set: profileFields },
			{ new: true }
		);

		return res.json(profile);
	}
);

// router.post(
// 	'/',
// 	auth,
// 	check('status', 'Status is required').notEmpty(),
// 	check('skills', 'Skills is required').notEmpty(),
// 	async (req, res) => {
// 		const errors = validationResult(req);
// 		if (!errors.isEmpty()) {
// 			return res.status(400).json({ errors: errors.array() });
// 		}

// 		// destructure the request
// 		const {
// 			website,
// 			skills,
// 			youtube,
// 			twitter,
// 			instagram,
// 			linkedin,
// 			facebook,
// 			...rest
// 		} = req.body;

// 		// build a profile
// 		const profileFields = {
// 			user: req.user.id,
// 			website:
// 				website && website !== ''
// 					? normalize(website, { forceHttps: true })
// 					: '',
// 			skills: Array.isArray(skills)
// 				? skills
// 				: skills.split(',').map((skill) => ' ' + skill.trim()),
// 			...rest,
// 		};

// 		// Build socialFields object
// 		const socialFields = { youtube, twitter, instagram, linkedin, facebook };

// 		// normalize social fields to ensure valid url
// 		for (const [key, value] of Object.entries(socialFields)) {
// 			if (value && value.length > 0)
// 				socialFields[key] = normalize(value, { forceHttps: true });
// 		}
// 		// add to profileFields
// 		profileFields.social = socialFields;

// 		try {
// 			// Using upsert option (creates new doc if no match is found):
// 			let profile = await ProfileModel.findOneAndUpdate(
// 				{ user: req.user.id },
// 				{ $set: profileFields },
// 				{ new: true, upsert: true, setDefaultsOnInsert: true }
// 			);
// 			return res.json(profile);
// 		} catch (err) {
// 			console.error(err.message);
// 			return res.status(500).send('Server Error');
// 		}
// 	}
// );

//Get all profiles

router.get('/', async (req, res) => {
	try {
		const profiles = await ProfileModel.find().populate('user', [
			'name',
			'avatar',
		]);
		res.json(profiles);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

//Get profile by user_id
router.get('/user/:user_id', async (req, res) => {
	try {
		const profile = await ProfileModel.findOne({
			user: req.params.user_id,
		}).populate('user', ['name', 'avatar']);

		//Profile Existance Check
		if (!profile) return res.status(400).json({ msg: 'No profile found ' });
		res.json(profile);
	} catch (err) {
		console.error(err.message);

		//check if the kind of error is of ObjectId- incorrect/invalid (kind property from error object)
		if (err.kind == 'ObjectId')
			return res.status(400).json({ msg: 'No profile found ' });

		res.status(500).send('Server error');
	}
});

//Delete profile, user and posts
router.delete('/', auth, async (req, res) => {
	try {
		//Remove posts
		await PostModel.deleteMany({ user: req.user.id });

		//Remove profile
		await ProfileModel.findOneAndRemove({ user: req.user.id });

		//Remove user
		await UserModel.findOneAndRemove({ _id: req.user.id });
		res.json({ msg: 'User deleted successfully' });
	} catch (err) {
		console.error(err.message);
		console.log('error');
		res.status(500).send('Server error');
	}
});

//Add profile experience. PUT request to update the document
// Object of Experience array created with it's id
router.put(
	'/experience',
	[
		auth,
		[
			check('title', 'Title is required').not().isEmpty(),
			check('company', 'Company is required').not().isEmpty(),
			check('from', 'From date is required').not().isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { title, company, location, from, to, current, description } =
			req.body;

		const newExp = {
			title,
			company,
			location,
			from,
			to,
			current,
			description,
		};

		try {
			const profile = await ProfileModel.findOne({
				user: req.user.id,
			});

			profile.experience.unshift(newExp); //unshift- Push to the begining of the array

			await profile.save();

			res.json(profile);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error: ' + err.message);
		}
	}
);

//Delete experience from profile
router.delete('/experience/:exp_id', auth, async (req, res) => {
	try {
		//bring the user's profile
		const profile = await ProfileModel.findOne({ user: req.user.id });

		//get the Index
		const removeIndex = profile.experience
			.map((item) => item.id)
			.indexOf(req.params.exp_id);

		//Remove the index
		profile.experience.splice(removeIndex, 1);

		//re-save  the profile
		await profile.save();
		res.json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error: ' + err.message);
	}
});

//Add profile education. PUT request to update the document
// Object of Education array created with it's id
router.put(
	'/education',
	[
		auth,
		[
			check('school', 'school is required').not().isEmpty(),
			check('degree', 'degree is required').not().isEmpty(),
			check('fieldofstudy', 'Field of study is required').not().isEmpty(),
			check('from', 'From date is required').not().isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const {
			school,
			degree,
			fieldofstudy,
			location,
			from,
			to,
			current,
			description,
		} = req.body;

		const newEdu = {
			school,
			degree,
			fieldofstudy,
			location,
			from,
			to,
			current,
			description,
		};

		try {
			const profile = await ProfileModel.findOne({
				user: req.user.id,
			});

			profile.education.unshift(newEdu); //unshift- Push to the begnning of the array

			await profile.save();

			res.json(profile);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error: ' + err.message);
		}
	}
);

//Delete education from profile
router.delete('/education/:edu_id', auth, async (req, res) => {
	try {
		//bring the user's profile
		const profile = await ProfileModel.findOne({ user: req.user.id });

		//get the Index
		const removeIndex = profile.education
			.map((item) => item.id)
			.indexOf(req.params.edu_id);

		//Remove the index
		profile.education.splice(removeIndex, 1);

		//re-save  the profile
		await profile.save();
		res.json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error: ' + err.message);
	}
});

//Get user repos from Github
// router.get('/github/:username', async (req, res) => {
// 	try {
// 		const options = {
// 			uri: encodeURI(
// 				`https://api.github.com/users/${
// 					req.params.username
// 				}/repos?per_page=5&sort=created:asc&client_id=${config.get(
// 					'githubClientId'
// 				)}&client_secret=${config.get('githhubClientSecret')}`
// 			),
// 			method: 'GET',

// 			headers: {
// 				'user-agent': 'node.js',
// 				Authorization: `token ${config.get('githubToken')}`,
// 			},
// 		};

// 		request(options, (error, response, body) => {
// 			if (error) console.error(error);

// 			if (response.statusCode !== 200)
// 				res.status(404).json({ msg: 'No Github profile found' });

// 			res.json(JSON.parse(body));
// 			res.json(data);
// 		});
// 	} catch (err) {
// 		console.error(err.message);
// 		res.status(500).send('Server error:' + err.message);
// 	}
// });

export { router as profileRouter };
