import * as path from 'path';
import * as fs from 'fs';

export const getFrequencyByPart = (bookId: string, part: string) => {
  const filePath = path.join(__dirname, `../data/frequencies/book${bookId}_${part}.json`);
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
};
