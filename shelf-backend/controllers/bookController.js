import { addBook, getAllBooks } from '../services/bookService.js';
import { toggleBookStatus } from '../services/bookService.js';
import { updateBook } from '../services/bookService.js';
import { deleteBook } from '../services/bookService.js';

export const createBook = (req, res) => {
    const { role } = req.body;

    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    if (role !== 'owner') {
        return res.status(403).json({ success: false, message: 'Only Book Owners can list books' });
    }

    const { title, author, genre, location, contact, ownerId } = req.body;

    const imageUrl = `/uploads/${req.file.filename}`;

    console.log(imageUrl)
    if (!title || !author || !location || !contact || !ownerId) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const newBook = addBook({ title, author, genre, location, contact, ownerId, imageUrl });
    res.json({ success: true, book: newBook });
};

export const getBooks = (req, res) => {
    const { title, genre } = req.query;
    let books = getAllBooks();

    if (title) {
        books = books.filter(book =>
            book.title.toLowerCase().includes(title.toLowerCase())
        );
    }

    if (genre) {
        books = books.filter(book =>
            book.location.toLowerCase().includes(genre.toLowerCase())
        );
    }

    res.json({ success: true, books });
};



export const toggleStatus = (req, res) => {
    const { id } = req.params;
    const updatedBook = toggleBookStatus(id);

    if (!updatedBook) {
        return res.status(404).json({ success: false, message: 'Book not found' });
    }

    res.json({ success: true, book: updatedBook });
};

export const editBook = (req, res) => {
    const { id } = req.params;
    const updatedFields = req.body;

    const updatedBook = updateBook(id, updatedFields);
    if (!updatedBook) {
        return res.status(404).json({ success: false, message: 'Book not found' });
    }

    res.json({ success: true, book: updatedBook });
};


export const removeBook = (req, res) => {
    const { id } = req.params;

    const success = deleteBook(id);
    if (!success) {
        return res.status(404).json({ success: false, message: 'Book not found' });
    }

    res.json({ success: true, message: 'Book deleted successfully' });
};