import express from "express"
import bodyParser from "body-parser"
import articles from "./routes/articles";
import comments from "./routes/comments";
import auth from "./routes/auth";
import 'dotenv/config'
import cors from 'cors';
import initSetup from "./scripts/setup";
import connectToDatabase from "./scripts/connect";
import router from "./routes/router";

// .env variables
const PORT = process.env.PORT;

// If no PORT
if (!PORT) {
    throw new Error('PORT is not specified')
}

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Router
app.use('/api/v1/', router)

// MongoDB connect
connectToDatabase()

// Initial setup script
initSetup()

// Start server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
