import React from 'react';
import BookSelector from './components/BookSelector';
import PartSelector from './components/PartSelector';
import CharFrequencyChart from './components/CharFrequencyChart';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { useBookData } from './hooks/useBookData';
import './styles/main.scss';

const App: React.FC = () => {
  const { books, selectedBook, selectedPart, charData, loading, error, loadCharFrequency } = useBookData();

  // Логи состояния
  console.log('Books:', books);
  console.log('Selected Book:', selectedBook);
  console.log('Selected Part:', selectedPart);
  console.log('Char Data:', charData);
  console.log('Loading:', loading);
  console.log('Error:', error);

  return (
    <div className="app-container">
      <h1 className="app-title">Частотность символов в книгах</h1>
      
      {selectedBook && (
        <PartSelector 
          selectedPart={selectedPart ?? 'начало'} // Убедитесь, что selectedPart всегда строка
          onSelectPart={(part) => loadCharFrequency(selectedBook, part)}
        />
      )}
      
      {loading && <LoadingSpinner />}
      
      {error && <ErrorMessage message={error} />}
      
      {!loading && !error && selectedBook && selectedPart && charData.length > 0 && (
        <CharFrequencyChart 
          data={charData} 
          books={books} 
          selectedBook={selectedBook} 
          selectedPart={selectedPart} // Передаем selectedPart
        />
      )}

      {/* HTML-структура */}
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-5 gap-4">
          <div></div>

          {books.map((book) => (
            <React.Fragment key={book.id}>
              {/* Используем flexbox для горизонтального размещения */}
              <div className="flex items-center justify-start space-x-4">
                <div className="text-right">{book.title}</div>
                <div className="flex space-x-4">
                  {['1 слог', 'начало', 'середина', 'конец'].map((part) => (
                    <button 
                      className="bg-black text-white py-2 px-4 rounded"
                      key={part}
                      onClick={() => loadCharFrequency(book, part)}
                    >
                      {part}
                    </button>
                  ))}
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
