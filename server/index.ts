import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const password: string = process.env.MONGO_PASS as string;
const pass = encodeURIComponent('mongo@Bam23');
const uri = `mongodb+srv://bamMongo23:${pass}@cluster0.wvbvubq.mongodb.net/leetBoard_Users`;

const connectDB = (uri: string) => {
    mongoose.connect(uri);
};

const start = async () => {
    try {
        connectDB(uri);
        app.listen(9000, () => {
            console.log(`Server is listening on port 5001`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();
