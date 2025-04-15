import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const chars = [
  "ба", "бо", "бе", "би", "бу", "бы",
  "ва", "во", "ве", "ви", "ву", "вы",
  "га", "го", "ге", "ги", "гу", "гы",
  "да", "до", "де", "ди", "ду", "ды",
  "ла", "ло", "ле", "ли", "лу", "лы"
];

const parts = ["начало", "середина", "конец", "1 слог"];

async function seed() {
  try {
    console.log("🧹 Очистка таблицы charFrequency...");
    await prisma.charFrequency.deleteMany();

    const books = await prisma.book.findMany();
    if (books.length === 0) {
      console.log("❌ Нет книг в базе! Добавьте книги перед заполнением.");
      return;
    }

    for (const book of books) {
      for (const part of parts) {
        const selectedChars = shuffleArray(chars).slice(0, 20);
        
        const records = selectedChars.map((char) => ({
          char,
          frequency: Math.floor(Math.random() * 50) + 1, // случайная частота (1-50)
          bookId: book.id,
          part,
        }));

        await prisma.charFrequency.createMany({ data: records });
        console.log(`✅ Добавлено 20 значений для книги "${book.title}" в часть "${part}"`);
      }
    }

    console.log("🎉 База успешно заполнена символами!");
  } catch (error) {
    console.error("❌ Ошибка при заполнении базы:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Функция перемешивания массива (Фишера-Йетса)
function shuffleArray(array: string[]) {
  return array.sort(() => Math.random() - 0.5);
}

seed();
