/*import { Request, Response } from 'express';
import * as path from 'path';
import * as fs from 'fs';
import { CharFrequency } from '../models/CharFrequency'
export const getBookFrequency = (req: Request, res: Response, bookId: string, part: string): void => {
  try {
    const frequencyPath = path.join(__dirname, `../data/frequencies/book${bookId}.json`);

    if (!fs.existsSync(frequencyPath)) {
      res.status(404).json({ message: 'Frequency data not found for this book' });
      return;
    }

    const frequencyData = fs.readFileSync(frequencyPath, 'utf8');
    const frequencies: CharFrequency[] = JSON.parse(frequencyData);

    // Фильтрация по части текста
    const filteredFrequencies = frequencies.filter((freq) => freq.part === part);

    if (filteredFrequencies.length === 0) {
      res.status(404).json({ message: `No frequency data found for part: ${part}` });
      return;
    }

    res.status(200).json(filteredFrequencies);
  } catch (error) {
    console.error('Error fetching frequency data:', error);
    res.status(500).json({ message: 'Failed to fetch frequency data' });
  }
};
*/
import { PrismaClient } from '@prisma/client';  // Import PrismaClient
const prisma = new PrismaClient();  // Instantiate PrismaClient
export const getBookFrequency = async (req: Request, res: Response): Promise<void> => {
  try {
    // Parse bookId from the route params
    const bookId = parseInt(req.params.id);
    const part = req.query.part as string;

    // Ensure that bookId is a valid number
    if (isNaN(bookId)) {
      res.status(400).json({ message: 'Invalid bookId' });
      return;
    }

    // Ensure that the part parameter is provided
    if (!part) {
      res.status(400).json({ message: 'Part parameter is required' });
      return;
    }

    console.log(`Request received for bookId: ${bookId}, part: ${part}`); // Log inputs for debugging

    // Query the CharFrequency table using valid bookId and part
    const frequencies = await prisma.charFrequency.findMany({
      where: {
        bookId: bookId,  // Ensure bookId is correctly parsed and passed here
        part: part,      // Match the part exactly
      },
    });

    if (frequencies.length === 0) {
      res.status(404).json({ message: `No frequency data found for part: ${part}` });
      return;
    }

    res.status(200).json(frequencies);
  } catch (error) {
    console.error('Error fetching frequency data:', error);
    res.status(500).json({ message: 'Failed to fetch frequency data' });
  }
};
