/*
  Warnings:

  - You are about to drop the column `word` on the `OneSyllableWord` table. All the data in the column will be lost.
  - Added the required column `syllable` to the `OneSyllableWord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OneSyllableWord" DROP COLUMN "word",
ADD COLUMN     "syllable" TEXT NOT NULL;
