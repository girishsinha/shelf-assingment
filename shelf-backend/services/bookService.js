import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BOOKS_FILE = path.join(__dirname, '../data/books.json');

export const readBooks = () => {
    const data = fs.readFileSync(BOOKS_FILE, 'utf-8');
    return JSON.parse(data);
};

export const writeBooks = (books) => {
    fs.writeFileSync(BOOKS_FILE, JSON.stringify(books, null, 2), 'utf-8');
};

export const addBook = (bookData) => {
    const books = readBooks();
    const newBook = {
        id: Date.now().toString(),
        status: 'available',
        ...bookData
    };
    books.push(newBook);
    writeBooks(books);
    return newBook;
};

export const getAllBooks = () => {
    return readBooks();
};

export const toggleBookStatus = (bookId) => {
    const books = readBooks();
    const bookIndex = books.findIndex(book => book.id === bookId);

    if (bookIndex === -1) return null;

    books[bookIndex].status =
        books[bookIndex].status === 'available' ? 'rented' : 'available';

    writeBooks(books);
    return books[bookIndex];
};

export const updateBook = (bookId, updatedData) => {
    const books = readBooks();
    const index = books.findIndex(book => book.id === bookId);

    if (index === -1) return null;

    books[index] = { ...books[index], ...updatedData };
    writeBooks(books);
    return books[index];
};

export const deleteBook = (bookId) => {
    const books = readBooks();
    const index = books.findIndex(book => book.id === bookId);

    if (index === -1) return false;

    books.splice(index, 1);
    writeBooks(books);
    return true;
};