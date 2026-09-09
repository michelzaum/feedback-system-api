/*
  Warnings:

  - You are about to drop the `feedback_status` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "FeedbackStatus" AS ENUM ('PENDING', 'IN_REVIEW', 'PLANNED', 'COMPLETED');

-- DropForeignKey
ALTER TABLE "feedbacks" DROP CONSTRAINT "feedbacks_statusId_fkey";

-- AlterTable
ALTER TABLE "feedbacks" ADD COLUMN     "status" "FeedbackStatus" NOT NULL DEFAULT 'PENDING';

-- DropTable
DROP TABLE "feedback_status";
