/*import React from 'react';

interface PartSelectorProps {
  selectedPart: string;
  onSelectPart: (part: string) => void;
}

const parts = ['1 слог', 'начало', 'середина', 'конец'];

const PartSelector: React.FC<PartSelectorProps> = ({ selectedPart, onSelectPart }) => {
  // Убедимся, что selectedPart не будет null или undefined, установив дефолтное значение
  const validSelectedPart = selectedPart || "начало"; // Значение по умолчанию — "начало"

  return (
    <div className="part-selector">
      {parts.map((part) => (
        <button
          key={part}
          className={`part-button ${validSelectedPart === part ? 'active' : ''}`}
          onClick={() => onSelectPart(part)}
        >
          {part}
        </button>
      ))}
    </div>
  );
};

export default PartSelector;*/
import React, { useEffect, useState } from 'react';
import { fetchParts } from '../services/api'; // Импортируем API для получения частей книги

interface PartSelectorProps {
  selectedPart: string;
  onSelectPart: (part: string) => void;
}

const PartSelector: React.FC<PartSelectorProps> = ({ selectedPart, onSelectPart }) => {
  const [parts, setParts] = useState<string[]>(['начало', 'середина', 'конец']); // Начальные значения
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const getParts = async () => {
      setLoading(true);
      try {
        const partsData = await fetchParts(); // Загружаем части из API
        setParts(partsData);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError('Не удалось загрузить части книги.');
      }
    };

    getParts();
  }, []);

  if (loading) return <div>Загрузка частей...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="part-selector">
      {parts.map((part) => (
        <button
          key={part}
          className={`part-button ${selectedPart === part ? 'active' : ''}`}
          onClick={() => onSelectPart(part)}
        >
          {part}
        </button>
      ))}
    </div>
  );
};

export default PartSelector;
