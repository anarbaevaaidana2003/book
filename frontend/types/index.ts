export interface Book {
  id: number;
  title: string;
  author: string;  // Если в базе данных есть поле автор
  charFrequencies?: CharData[]; // Можно добавить частоты символов, если нужно
}
export interface CharData {
  char: string;
  frequency: number;
  part?: string; // Опционально добавляем часть текста (если это нужно)
}
