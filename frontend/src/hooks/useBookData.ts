import { useState, useEffect } from 'react';
import { Book, CharData } from '../types';

export const useBookData = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [selectedPart, setSelectedPart] = useState<string>('сөздүн башы');
  const [charData, setCharData] = useState<CharData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Загружаем данные книг
  useEffect(() => {
    console.log('Loading books data...');
    fetch('/api/books')
      .then((response) => {
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

  // Загружаем частоту для выбранной книги и части
  const loadCharFrequency = (book: Book, part: string) => {
    setLoading(true);
    setError(null);
    setSelectedBook(book);
    setSelectedPart(part);

    fetch(`/api/books/${book.id}/frequency?part=${part}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch data, status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setCharData(data);
      })
      .catch((err) => {
        console.error('Error fetching char frequency:', err);
        setError('Не удалось загрузить данные');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { books, selectedBook, selectedPart, charData, loading, error, loadCharFrequency };
};
