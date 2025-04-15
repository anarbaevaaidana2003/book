/*
  Warnings:

  - You are about to drop the `CharFrequency` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CharFrequency" DROP CONSTRAINT "CharFrequency_bookId_fkey";

-- DropTable
DROP TABLE "CharFrequency";

-- CreateTable
CREATE TABLE "SyllableFrequencyBegin" (
    "id" SERIAL NOT NULL,
    "syllable" TEXT NOT NULL,
    "frequency" INTEGER NOT NULL,
    "bookId" INTEGER NOT NULL,

    CONSTRAINT "SyllableFrequencyBegin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SyllableFrequencyMiddle" (
    "id" SERIAL NOT NULL,
    "syllable" TEXT NOT NULL,
    "frequency" INTEGER NOT NULL,
    "bookId" INTEGER NOT NULL,

    CONSTRAINT "SyllableFrequencyMiddle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SyllableFrequencyEnd" (
    "id" SERIAL NOT NULL,
    "syllable" TEXT NOT NULL,
    "frequency" INTEGER NOT NULL,
    "bookId" INTEGER NOT NULL,

    CONSTRAINT "SyllableFrequencyEnd_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OneSyllableWord" (
    "id" SERIAL NOT NULL,
    "word" TEXT NOT NULL,
    "bookId" INTEGER NOT NULL,

    CONSTRAINT "OneSyllableWord_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SyllableFrequencyBegin" ADD CONSTRAINT "SyllableFrequencyBegin_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SyllableFrequencyMiddle" ADD CONSTRAINT "SyllableFrequencyMiddle_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SyllableFrequencyEnd" ADD CONSTRAINT "SyllableFrequencyEnd_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OneSyllableWord" ADD CONSTRAINT "OneSyllableWord_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
