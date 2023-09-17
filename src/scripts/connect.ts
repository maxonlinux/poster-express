import mongoose, { ConnectOptions } from "mongoose";
import 'dotenv/config'

const DB_URI = process.env.DB_URI;

async function connectToDatabase() {
    try {
        if (!DB_URI) {
            throw new Error('DB_URI is not specified')
        }

        await mongoose.connect(DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        } as ConnectOptions);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
    }
}

export default connectToDatabase