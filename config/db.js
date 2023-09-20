import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const db = process.env.MONGO_URI;

const connectDB = async () => {
	try {
		await mongoose.connect(db, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		console.log('DB connection established');
	} catch (err) {
		console.error('Error connecting to the Database');
		process.exit(1);
	}
};

export default connectDB;
