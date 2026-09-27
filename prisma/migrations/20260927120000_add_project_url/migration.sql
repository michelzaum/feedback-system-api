ALTER TABLE "projects" ADD COLUMN "url" TEXT;

UPDATE "projects" AS project
SET "url" = 'https://app.feedback.com/' || organization."slug" || '/' || project."slug"
FROM "organizations" AS organization
WHERE organization."id" = project."organizationId";

ALTER TABLE "projects" ALTER COLUMN "url" SET NOT NULL;
