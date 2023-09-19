import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import { userRouter } from './routes/api/users.js';
import { profileRouter } from './routes/api/profile.js';
import { authRouter } from './routes/api/auth.js';
import { postRouter } from './routes/api/post.js';
import path from 'path';

const app = express();

//DB connection
connectDB();

app.use(express.json({ extended: false }));
app.use(cors());

//Routes
app.use('/api/users', userRouter);
app.use('/api/profile', profileRouter);
app.use('/api/auth', authRouter);
app.use('/api/post', postRouter);

//Serve static assets
if (process.env.NODE_ENV === 'production') {
	//Set static folder
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Port ${PORT} listening`));
