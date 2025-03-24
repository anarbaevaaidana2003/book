/*import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { Book } from '../models/Book';

export const getBooks = (req: Request, res: Response): void => {
  try {
    const booksPath = path.join(__dirname, '../data/books.json');
    const booksData = fs.readFileSync(booksPath, 'utf8');
    const books: Book[] = JSON.parse(booksData);
    
    res.status(200).json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: 'Failed to fetch books' });
  }
};

export const getBookById = (req: Request, res: Response): void => {
  try {
    const bookId = parseInt(req.params.id);
    const booksPath = path.join(__dirname, '../data/books.json');
    const booksData = fs.readFileSync(booksPath, 'utf8');
    const books: Book[] = JSON.parse(booksData);
    
    const book = books.find(b => b.id === bookId);
    
    if (!book) {
      res.status(404).json({ message: 'Book not found' });
      return;
    }
    
    res.status(200).json(book);
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({ message: 'Failed to fetch book' });
  }
};*/
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';  // Import Prisma Client

const prisma = new PrismaClient(); // Initialize Prisma Client

// Get all books from the database
export const getBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const books = await prisma.book.findMany();  // Query books from the database
    res.status(200).json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: 'Failed to fetch books' });
  }
};

// Get a book by its ID from the database
export const getBookById = async (req: Request, res: Response): Promise<void> => {
  try {
    const bookId = parseInt(req.params.id, 10);

    // Handle case where bookId is not a valid number
    if (isNaN(bookId)) {
      return res.status(400).json({ message: 'Invalid book ID format' });
    }

    // Query the book by ID
    const book = await prisma.book.findUnique({
      where: {
        id: bookId,  // Find the book by its ID
      },
    });

    if (!book) {
      res.status(404).json({ message: 'Book not found' });
      return;
    }
    
    res.status(200).json(book);
  } catch (error) {
    console.error('Error fetching book with ID:', req.params.id, error);
    res.status(500).json({ message: 'Failed to fetch book' });
  }
};
