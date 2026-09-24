# AGENTS.md

## Commit Rules

1. **Always follow Conventional Commits pattern** when asked to commit code. Use the format: `type: description` (e.g., `feat: add sign-in page`, `fix: handle null response`, `docs: update install instructions`).

2. **NEVER commit unless the user explicitly says "commit", "git commit", or similar.** Do not create commits proactively after completing a task, making changes, or fixing something. Only commit when the user directly asks for it. This rule is absolute — if in doubt, do not commit.

3. **Each commit request is scoped to that specific request only.** When the user asks to commit, it authorizes committing the changes made up to that point. It does NOT authorize committing future changes proactively. Every subsequent commit requires a new explicit request from the user.

4. **Check the current git branch before implementing a feature.** Before starting to implement a feature the user asked for, check the current git branch name. If it is `dev` or `main`, and the branch name is not related to the requested feature, create a new branch following conventional naming (e.g., `feat/sign-in-page-validations`, `fix/header-not-showing-sign-in-button`). If the branch name is related to the feature or the current branch is not `dev` or `main`, proceed without creating a new branch.
