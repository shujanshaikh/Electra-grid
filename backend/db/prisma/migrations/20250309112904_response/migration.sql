/*
  Warnings:

  - Changed the type of `message` on the `ChatMessage` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `response` on the `ChatMessage` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ChatMessage" DROP COLUMN "message",
ADD COLUMN     "message" JSONB NOT NULL,
DROP COLUMN "response",
ADD COLUMN     "response" JSONB NOT NULL;
