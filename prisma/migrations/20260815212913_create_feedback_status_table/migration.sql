/*
  Warnings:

  - Added the required column `statusId` to the `feedbacks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "feedbacks" ADD COLUMN     "statusId" UUID NOT NULL;

-- CreateTable
CREATE TABLE "feedback_status" (
    "id" UUID NOT NULL,
    "status" TEXT NOT NULL,
    "feedbackId" UUID NOT NULL,

    CONSTRAINT "feedback_status_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "feedbacks" ADD CONSTRAINT "feedbacks_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "feedback_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
