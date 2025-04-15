import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
import express from 'express';

const router = express.Router(); // Создаём роутер

// Функция для получения данных частоты
export const getBookFrequency = async (req: Request, res: Response) => {
  const bookId = parseInt(req.params.id, 10);
  const { part } = req.query;

  if (!part || typeof part !== 'string') {
    return res.status(400).json({ error: 'Parameter "part" is required and must be a string' });
  }

  try {
    let data;

    switch (part) {
      case '1 слог':
        data = await prisma.oneSyllableWord.findMany({
          where: { bookId },
          select: { word: true, frequency: true },
        });
        data = data.map(({ word, frequency }) => ({ syllable: word, frequency }));
        break;

      case 'начало':
        data = await prisma.syllableFrequencyBegin.findMany({
          where: { bookId },
          select: { syllable: true, frequency: true },
        });
        break;

      case 'середина':
        data = await prisma.syllableFrequencyMiddle.findMany({
          where: { bookId },
          select: { syllable: true, frequency: true },
        });
        break;

      case 'конец':
        data = await prisma.syllableFrequencyEnd.findMany({
          where: { bookId },
          select: { syllable: true, frequency: true },
        });
        break;

      default:
        return res.status(400).json({ error: `Unknown part: ${part}` });
    }

    res.json(data);
  } catch (err) {
    console.error('Error fetching frequency:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Подключаем маршруты к роутеру
router.get('/books/:id/frequency', getBookFrequency);

// Экспортируем router
export default router;
