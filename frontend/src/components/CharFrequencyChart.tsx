/*import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CharData, Book } from '../types';

interface CharFrequencyChartProps {
  data: CharData[];
  books: Book[];
  selectedBook: number | null;
  selectedPart: string;
}

const CharFrequencyChart: React.FC<CharFrequencyChartProps> = ({ data, books, selectedBook, selectedPart }) => {
  const selectedBookTitle = books.find(b => b.id === selectedBook)?.title || '';

  return (
    <div className="chart-container">
      <h2 className="chart-title">
        Частотность символов в книге "{selectedBookTitle}" ({selectedPart})
      </h2>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="char" />
            <YAxis 
              domain={[0, 'dataMax + 1']}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip 
              formatter={(value: number) => [`${value.toFixed(2)}%`, 'Частота']}
              labelFormatter={(label) => `Символ: ${label}`}
            />
            <Legend />
            <Bar 
              dataKey="frequency" 
              name="Частота" 
              fill="#3B82F6" 
              minPointSize={2}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CharFrequencyChart;
*/
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CharData, Book } from '../types'; // Your types
import { fetchCharFrequency, fetchBooks } from '../services/api'; // API services for fetching data

interface CharFrequencyChartProps {
  selectedBook: number | null;
  selectedPart: string; // Selected part of the book
}

const CharFrequencyChart: React.FC<CharFrequencyChartProps> = ({ selectedBook, selectedPart }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [data, setData] = useState<CharData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // Fetch books
  useEffect(() => {
    const getBooks = async () => {
      try {
        const booksData = await fetchBooks(); // Fetch books data
        setBooks(booksData); // Set books data in state
      } catch (err) {
        setError('Failed to fetch books.');
      }
    };

    getBooks();
  }, []);

  // Fetch character frequency data when selected book and part change
  useEffect(() => {
    const getFrequencyData = async () => {
      if (selectedBook === null || !selectedPart) return;
      setLoading(true);
      try {
        const frequencyData = await fetchCharFrequency(selectedBook, selectedPart); // Fetch frequency data
        setData(frequencyData); // Set frequency data in state
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError('Failed to fetch frequency data.');
      }
    };

    getFrequencyData();
  }, [selectedBook, selectedPart]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!data.length) {
    return <div>No data available</div>;
  }

  const selectedBookTitle = books.find((b) => b.id === selectedBook)?.title || '';

  return (
    <div className="chart-container">
      <h2 className="chart-title">
        Частота букв в книге "{selectedBookTitle}" ({selectedPart})
      </h2>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="char" />
            <YAxis domain={[0, 'dataMax + 1']} tickFormatter={(value) => `${value}%`} />
            <Tooltip formatter={(value: number) => [`${value.toFixed(2)}%`, 'Frequency']} labelFormatter={(label) => `Character: ${label}`} />
            <Legend />
            <Bar dataKey="frequency" name="Frequency" fill="#3B82F6" minPointSize={2} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CharFrequencyChart;
