import express from 'express';
import { getBooks, getBookById } from '../controllers/bookController';
import { getBookFrequency } from '../controllers/frequencyController';

const router = express.Router();

// Book routes
router.get('/books', getBooks);  // Route to get all books
router.get('/books/:id', getBookById);  // Route to get a book by its ID

// Frequency routes (supporting the part of text as a query parameter)
router.get('/books/:id/frequency', async (req, res) => {
  const { id } = req.params;
  const { part } = req.query;  // Extract 'part' query parameter

  // Log incoming parameters for debugging
  console.log('Incoming request:', { id, part });

  // Ensure 'part' is a valid string and is provided
  if (typeof part !== 'string') {
    return res.status(400).json({ error: 'Part parameter is required and must be a string' });
  }

  // Parse the id to ensure it's a valid integer
  const bookId = parseInt(id, 10);
  if (isNaN(bookId)) {
    return res.status(400).json({ error: 'Invalid bookId' });
  }

  console.log('Parsed bookId:', bookId);
  console.log('Part parameter:', part);

  try {
    // Call frequency controller with valid parameters
    await getBookFrequency(req, res);  // The controller already extracts `id` and `part` from req
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch frequency data' });
  }
});

export default router;
