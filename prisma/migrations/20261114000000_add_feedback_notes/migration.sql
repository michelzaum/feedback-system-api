CREATE TABLE "feedback_notes" (
    "id" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "feedbackId" UUID NOT NULL,
    "authorId" UUID NOT NULL,

    CONSTRAINT "feedback_notes_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "feedback_notes" ADD CONSTRAINT "feedback_notes_feedbackId_fkey" FOREIGN KEY ("feedbackId") REFERENCES "feedbacks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "feedback_notes" ADD CONSTRAINT "feedback_notes_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
