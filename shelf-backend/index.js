import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';


const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());




import authRoutes from './routes/auth.js';
import bookRoutes from './routes/books.js';

app.use('/auth', authRoutes);
app.use('/books', bookRoutes);

app.use('/uploads', express.static('uploads')); // to serve images

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
