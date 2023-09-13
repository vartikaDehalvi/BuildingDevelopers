import express, { response } from 'express';
import { check, validationResult } from 'express-validator';
import request from 'request';
import config from 'config';

import auth from '../../middleware/auth.js';
import { PostModel } from '../../models/Post.js';
import { UserModel } from '../../models/User.js';
import { ProfileModel } from '../../models/Profile.js';

const router = express.Router();

//private route- requires authentication token
router.post(
	'/',
	[auth, [check('text', 'Text required').not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(400).json({ errors: errors.array() });

		try {
			const user = await UserModel.findById(req.user.id).select('-password'); //grab everything except the password

			const newPost = new PostModel({
				text: req.body.text,
				name: user.name,
				avatar: user.avatar,
				user: req.user.id,
			});

			const post = await newPost.save();
			res.json(post);
		} catch (error) {
			console.error(error);
			res.status(500).json({ errors: errors.array() });
		}
	}
);

//Get All posts
router.get('/', async (req, res) => {
	try {
		const posts = await PostModel.find().sort({ date: -1 });
		res.json(posts);
	} catch (error) {
		console.error(error);
		res.status(500).json({ errors: error.array() });
	}
});

//private- Auth check
router.get('/', auth, async (req, res) => {
	try {
		const posts = await PostModel.find().sort({ date: -1 });
		res.json(posts);
	} catch (error) {
		console.error(error);
		res.status(500).json({ errors: error.array() });
	}
});

// Get post by ID
router.get('/:id', auth, async (req, res) => {
	try {
		const post = await PostModel.findById(req.params.id);

		if (!post) return res.status(404).json({ msg: 'Post not found' });

		res.json(post);
	} catch (error) {
		console.error(error.message);

		//ObjectId- incorrect/invalid
		if (error.kind === 'ObjectId')
			return res.status(404).json({ msg: 'Post not found' });
		res.status(500).json('Server error: ' + error.message);
	}
});

//Delete a post
router.delete('/:id', auth, async (req, res) => {
	try {
		const post = await PostModel.findByIdAndRemove(req.params.id);

		if (!post) return res.status(404).json({ msg: 'Post not found' });

		//Deleted successfully
		res.json({ message: 'Post Removed successfully' });
	} catch (error) {
		console.error(error.message);

		if (error.kind === 'ObjectId')
			return res.status(404).json({ msg: 'Post not found' });
		res.status(500).json('Server error: ' + error.message);
	}
});

//  LIKES
//Like a post
router.put('/like/:id', auth, async (req, res) => {
	try {
		const post = await PostModel.findById(req.params.id);

		// Check if post is already liked (by the same person)
		if (
			//Likes is an array in the 0bject post.
			//check if the id of user in the likes array === the id in the user model
			//like.user is an object; req.user.id is a string, so convert like.user to string in order to check
			post.likes.filter((like) => like.user.toString() === req.user.id).length >
			0
		)
			return res.status(400).json({ msg: 'Post already Liked' });

		post.likes.unshift({ user: req.user.id });

		await post.save();

		res.json(post);
	} catch (error) {
		console.error(error.message);

		res.status(500).json('Server error: ' + error.message);
	}
});

//Unike a post
// @TODO: CHECK FOR API ENDPOINT, NOT DONE YET
//REQUIREMENTS: a token, id of the liked post
router.put('/unlike/:id', auth, async (req, res) => {
	try {
		const post = await PostModel.findById(req.params.id);

		// Check if post is already liked (by the same person)
		if (
			post.likes.filter((like) => like.user.toString() === req.user.id)
				.length === 0
		)
			return res.status(400).json({ msg: 'Post not yet been liked' });

		//get remove index
		const removeIndex = post.likes
			.map((like) => like.user.toString())
			.indexOf(req.user.id);

		post.likes.splice(removeIndex, 1);

		await post.save();

		res.json(post);
	} catch (error) {
		console.error(error.message);

		res.status(500).json('Server error: ' + error.message);
	}
});

//COMMENTS
router.post(
	'/comment/:id',
	[auth, [check('text', 'Text required').not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);

		//not a valid object id
		if (!errors.isEmpty())
			return res.status(400).json({ errors: errors.array() });

		try {
			const user = await UserModel.findById(req.user.id).select('-password'); //grab everything except the password
			const post = await PostModel.findById(req.params.id);

			const newComment = {
				text: req.body.text,
				name: user.name,
				avatar: user.avatar,
				user: req.user.id,
			};

			post.comments.unshift(newComment);

			await post.save();

			res.json(post.comments);
		} catch (error) {
			console.error(error);
			res.status(500).json({ errors: errors.array() });
		}
	}
);

//Delete post by id, and then delete by comment id
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
	try {
		const post = await PostModel.findById(req.params.id);

		//Pull out comment
		const comment = post.comments.find(
			(comment) => comment.id === req.params.comment_id
		);

		//Make sure comment exists
		if (!comment) return;
		res.status(404).json({ message: 'Comment not found' });

		//Check if comment being deleted is by the same user
		if (comment.user.toString() !== req.user.id)
			return res.status(404).json({ message: 'Unauthorized User' });

		const removeIndex = post.comments
			.map((comment) => comment.user.toString())
			.indexOf(req.user.id);

		post.comments.splice(removeIndex, 1);

		await post.save();

		res.json(post);
	} catch (error) {
		console.error(error);
		res.status(500).json('Server Error');
	}
});

export { router as postRouter };
