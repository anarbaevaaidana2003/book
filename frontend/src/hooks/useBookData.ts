import { useState, useEffect } from 'react';
import { Book, CharData } from '../types';

export const useBookData = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [selectedPart, setSelectedPart] = useState<string>('начало'); // Set default to 'начало'
  const [charData, setCharData] = useState<CharData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load books data
  useEffect(() => {
    console.log('Loading books data...');
    fetch('/api/books')
      .then((response) => {
        console.log('Server response status:', response.status);
        if (!response.ok) {
          throw new Error(`Server returned ${response.status} error`);
        }
        return response.json();
      })
      .then((data) => {
        setBooks(data);
        console.log('Books data loaded:', data);
      })
      .catch((err) => {
        console.error('Error loading books:', err);
        setError('Не удалось загрузить книги');
      });
  }, []);

  // Load character frequency for selected book and part
  const loadCharFrequency = (book: Book, part: string) => {
    console.log('Loading char frequency for book:', book.title, 'Part:', part);
    setLoading(true);
    setError(null);
    setSelectedBook(book);
    setSelectedPart(part);
    console.log('Fetching char frequency for book ID:', book.id);

    console.log(`Request URL: /api/books/${book.id}/frequency?part=${part}`);

    fetch(`/api/books/${book.id}/frequency?part=${part}`)
      .then((res) => {
        console.log('Network response status for frequency data:', res.status);
        if (!res.ok) {
          throw new Error(`Network response was not ok (Status: ${res.status})`);
        }
        return res.json();
      })
      .then((data) => {
        console.log('Char frequency data loaded:', data);
        setCharData(data); // Update charData state
      })
      .catch((err) => {
        console.error('Error loading char frequency data:', err);
        setError('Не удалось загрузить данные');
      })
      .finally(() => {
        setLoading(false);
        console.log('Char frequency data load finished');
      });
  };

  // Log component state and data for debugging
  useEffect(() => {
    console.log('Books:', books);
    console.log('Selected Book:', selectedBook);
    console.log('Selected Part:', selectedPart);
    console.log('Char Data:', charData);
    console.log('Loading:', loading);
    console.log('Error:', error);
  }, [books, selectedBook, selectedPart, charData, loading, error]);

  return { books, selectedBook, selectedPart, charData, loading, error, loadCharFrequency };
};
