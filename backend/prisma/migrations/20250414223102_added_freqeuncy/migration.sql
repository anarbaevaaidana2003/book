/*
  Warnings:

  - Added the required column `frequency` to the `OneSyllableWord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OneSyllableWord" ADD COLUMN     "frequency" INTEGER NOT NULL;
