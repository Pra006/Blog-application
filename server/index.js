import express from 'express';
import Connection from './database/db.js';
import dotenv from 'dotenv';
import Router from './routes/route.js';
import cors from 'cors';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(bodyParser.json({
    extended: true,
}));
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use('/file', express.static('uploads')); // Serve static files from the 'uploads' directory
app.use('/', Router);

Connection();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});