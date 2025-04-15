import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { CharFrequency, Book } from '../types';
import { fetchCharFrequency } from '../services/api';
import styles from '../styles/main.module.scss';

type BookPart = '1 муундан турган сөз' | 'сөздүн башы' | 'сөздүн ортосу' | 'сөздүн аягы';

interface CharFrequencyChartProps {
  selectedBook: Book | null;
  selectedPart: BookPart;
}

const CharFrequencyChart: React.FC<CharFrequencyChartProps> = ({
  selectedBook,
  selectedPart,
}) => {
  const [data, setData] = useState<CharFrequency[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const partColors: Record<BookPart, string> = {
    '1 муундан турган сөз': '#60a5fa',
    'сөздүн башы': '#34d399',
    'сөздүн ортосу': '#fbbf24',
    'сөздүн аягы': '#f87171',
  };

  useEffect(() => {
    const getFrequencyData = async () => {
      if (!selectedBook || !selectedPart) return;

      setLoading(true);
      setError('');

      try {
        const frequencyData = await fetchCharFrequency(
          selectedBook.id,
          selectedPart
        );

        // Сортировка данных по убыванию частоты
        const sortedData = frequencyData.sort(
          (a, b) => b.frequency - a.frequency
        );

        setData(sortedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    getFrequencyData();
  }, [selectedBook, selectedPart]);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!selectedBook)
    return <div className={styles.info}>Please select a book</div>;
  if (!data.length)
    return (
      <div className={styles.info}>
        No data available for this selection
      </div>
    );

  return (
    <div className={styles.chartContainer}>
      <h2 className={styles.chartTitle}>
         "{selectedBook.title}" ({selectedPart}) китептеги муундардын жыштыгы
      </h2>

      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={data.length * 30 + 100}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 60, bottom: 60 }}
            barCategoryGap={0}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="number"
              label={{
                value: 'Жыштык',
                position: 'insideBottom',
                offset: -30,
              }}
              tickFormatter={(value) => `${value}`}
              domain={[0, 'dataMax + 1']}
            />
            <YAxis
              type="category"
              dataKey="syllable"
              width={80}
              tick={{ fontSize: 14 }}
              interval={0}
            />
            <Tooltip
              formatter={(value: number) => [`${value.toFixed(2)}`, 'Жыштык']}
              labelFormatter={(label) => `${label} мууну`}
            />
            <Legend />
            <Bar
              dataKey="frequency"
              name="Жыштык"
              fill={partColors[selectedPart]}
              animationDuration={1500}
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CharFrequencyChart;
