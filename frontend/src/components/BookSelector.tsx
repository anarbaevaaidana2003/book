/*import React from 'react';
import { Book } from '../types';

interface BookSelectorProps {
  books: Book[];
  selectedBook: number | null;
  onSelectBook: (bookId: number) => void;
}

const BookSelector: React.FC<BookSelectorProps> = ({ books, selectedBook, onSelectBook }) => {
  return (
    <div className="book-selector">
      <h2 className="title">Выберите книгу:</h2>
      <div className="button-container">
        {books.map(book => (
          <button
            key={book.id}
            onClick={() => onSelectBook(book.id)}
            className={`book-button ${selectedBook === book.id ? 'selected' : ''}`}
          >
            {book.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BookSelector;*/
import React, { useEffect, useState } from 'react';
import { fetchBooks } from '../services/api'; // Import the service to fetch books
import { Book } from '../types'; // Import your Book interface

const BookSelector = () => {
  const [books, setBooks] = useState<Book[]>([]); // Type the books state
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const getBooks = async () => {
      setLoading(true);
      try {
        const booksData = await fetchBooks(); // Fetch the books from the API
        setBooks(booksData); // Save books data in the state
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError('Failed to fetch books. Please try again later.');
      }
    };
    
    getBooks();
  }, []);

  if (loading) {
    return <div>Loading books...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Select a Book</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title} by {book.author} {/* Display book title and author */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookSelector;

