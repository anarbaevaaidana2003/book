// backend/src/services/dbService.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all books from the database
export const getBooks = async (): Promise<Book[]> => {
  try {
    const books = await prisma.book.findMany();
    return books;  // Return the list of books
  } catch (error) {
    console.error('Error fetching books:', error);
    throw new Error('Failed to fetch books');
  }
};

// Get all character frequencies for a given book
export const getCharFrequencies = async (bookId: number): Promise<CharFrequency[]> => {
  try {
    const frequencies = await prisma.charFrequency.findMany({
      where: { bookId },
    });
    return frequencies;  // Return character frequencies for the book
  } catch (error) {
    console.error('Error fetching character frequencies:', error);
    throw new Error('Failed to fetch character frequencies');
  }
};

// Create a new book in the database
export const createBook = async (title: string, author: string): Promise<Book> => {
  try {
    const newBook = await prisma.book.create({
      data: {
        title,
        author,
      },
    });
    return newBook;  // Return the created book
  } catch (error) {
    console.error('Error creating book:', error);
    throw new Error('Failed to create book');
  }
};

// Create a new character frequency for a specific book
export const createCharFrequency = async (
  bookId: number,
  char: string,
  frequency: number,
  part: string = "начало"  // Default to "начало" if not provided
): Promise<CharFrequency> => {
  try {
    const newFrequency = await prisma.charFrequency.create({
      data: {
        bookId,
        char,
        frequency,
        part,  // Part is passed as an argument, defaults to "начало"
      },
    });
    return newFrequency;  // Return the created character frequency
  } catch (error) {
    console.error('Error creating character frequency:', error);
    throw new Error('Failed to create character frequency');
  }
};
