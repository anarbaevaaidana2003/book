import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/api'; // Здесь импортируется именно роутер

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Маршруты
app.use('/api', apiRoutes); // Подключаем apiRoutes

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
