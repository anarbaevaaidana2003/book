const API_URL = 'http://localhost:3001/api'; // Or use another path to your API
import { Book, CharData } from '../types';

// Fetching the list of books
export const fetchBooks = async (): Promise<Book[]> => {
  try {
    const response = await fetch(`${API_URL}/books`);
    console.log('Books API response status:', response.status);
    if (!response.ok) {
      throw new Error(`Failed to fetch books: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

export const fetchCharFrequency = async (book: Book, part: string): Promise<CharData[]> => {
  try {
    const { id } = book;  // Extract only the 'id' of the book
    console.log('Fetching char frequency for bookId:', id, 'part:', part);
    const response = await fetch(`${API_URL}/books/${id}/frequency?part=${encodeURIComponent(part)}`);
    console.log('Char Frequency API response status:', response.status);
    if (!response.ok) {
      throw new Error(`Failed to fetch character frequency data: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching character frequency:', error);
    throw error;
  }
};


// Fetching the list of parts (if it's dynamically managed)
export const fetchParts = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${API_URL}/parts`);
    console.log('Parts API response status:', response.status);
    if (!response.ok) {
      throw new Error(`Failed to fetch parts: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching parts:', error);
    throw error;
  }
};
