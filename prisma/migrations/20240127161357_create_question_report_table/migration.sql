-- CreateEnum
CREATE TYPE "SentimentLabel" AS ENUM ('POSITIVE', 'NEGATIVE');

-- AlterTable
ALTER TABLE "QuestionAnswer" ADD COLUMN     "sentimentLabel" "SentimentLabel",
ADD COLUMN     "sentimentScore" DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "QuestionReport" (
    "id" TEXT NOT NULL,
    "sentimentScore" DOUBLE PRECISION NOT NULL,
    "keywords" TEXT[],
    "questionId" TEXT NOT NULL,

    CONSTRAINT "QuestionReport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "QuestionReport_questionId_key" ON "QuestionReport"("questionId");

-- AddForeignKey
ALTER TABLE "QuestionReport" ADD CONSTRAINT "QuestionReport_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;
