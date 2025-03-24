-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharFrequency" (
    "id" SERIAL NOT NULL,
    "char" TEXT NOT NULL,
    "frequency" INTEGER NOT NULL,
    "bookId" INTEGER NOT NULL,

    CONSTRAINT "CharFrequency_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CharFrequency" ADD CONSTRAINT "CharFrequency_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
