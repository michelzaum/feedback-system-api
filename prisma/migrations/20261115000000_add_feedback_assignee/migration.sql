ALTER TABLE "feedbacks" ADD COLUMN "assigneeId" UUID;

CREATE INDEX "feedbacks_assigneeId_idx" ON "feedbacks"("assigneeId");

ALTER TABLE "feedbacks" ADD CONSTRAINT "feedbacks_assigneeId_fkey"
FOREIGN KEY ("assigneeId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
