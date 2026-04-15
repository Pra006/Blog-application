import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const Connection = async () => {
    try {
        const dbUrl = process.env.MONGO_URL?.trim() ||
            `mongodb+srv://${encodeURIComponent(process.env.DB_USERNAME)}:${encodeURIComponent(process.env.DB_PASSWORD)}@cluster0.fjtctiq.mongodb.net/?appName=Cluster0`;

        await mongoose.connect(dbUrl);
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Error connecting to database:', error);
    }
}
export default Connection;