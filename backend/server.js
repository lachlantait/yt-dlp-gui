import express from 'express';
import cors from 'cors';
import { download } from './controllers/downloadController.js';

const app = express();
const port = '3000';
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({
  origin: 'null', // Allow 'null' so that using the frontend from file:// works
}));

// Requests to /api/download call the download() controller function
app.post('/api/download', download);

app.listen(port, () => {
  console.log(`Backend is running on http://localhost:${port}`);
});
