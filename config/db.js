import mongoose from 'mongoose';
import config from 'config';

const db = config.get('mongoURI');

const connectDB = async () => {
	try {
		await mongoose.connect(db, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		console.log('DB connection established');
	} catch (err) {
		console.error('Error connecting');
		process.exit(1);
	}
};

export default connectDB;
