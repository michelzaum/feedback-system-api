export function createPublicProjectUrl(organizationSlug: string, projectSlug: string): string {
  const appUrl = (process.env.FEEDBACK_APP_URL ?? "https://app.feedback.com").replace(/\/$/, "");
  return `${appUrl}/${organizationSlug}/${projectSlug}`;
}
