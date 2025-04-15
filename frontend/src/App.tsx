import React from 'react';

import CharFrequencyChart from './components/CharFrequencyChart';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { useBookData } from './hooks/useBookData';
import styles from "./styles/main.module.scss"; // CSS Modules

const App: React.FC = () => {
  const { books, selectedBook, selectedPart, charData, loading, error, loadCharFrequency } = useBookData();

  return (
    <div className={styles.appContainer}>
      <h1 className={styles.appTitle}>Китептердеги муундардын кездешүү жыштыгы</h1>
      

      
      {loading && <LoadingSpinner />}
      
      {error && <ErrorMessage message={error} />}
      


      <div className={styles.bookContainer}>
        {books.length === 0 && <p className={styles.noBooks}>Нет доступных книг</p>}
        {books.map((book) => (
          <div key={book.id} className={styles.bookItem}>
      
            <div className={styles.bookTitle}>{book.title}</div>

        
            <div className={styles.bookButtonContainer}>
              {['1 муундан турган сөз', 'сөздүн башы', 'сөздүн ортосу', 'сөздүн аягы'].map((part) => (
                <button
                  className={`${styles.bookButton} ${
                    selectedBook?.id === book.id && selectedPart==part? styles.selected : ''
                  }`}
                  data-part={part}
                  key={part}
                  onClick={() => loadCharFrequency(book, part)}
                >
                  {part}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
   
    {!loading && !error && selectedBook && selectedPart && charData.length > 0 && (
      <CharFrequencyChart 
        data={charData} 
        books={books} 
        selectedBook={selectedBook} 
        selectedPart={selectedPart}
      />
    )}
     </div>
  );
};

export default App;
