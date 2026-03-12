# Git Workflow Notes

## 1. Start Every Session

```bash
git status
git branch
git pull origin main
```

- `git status`: check changed files and current branch.
- `git pull origin main`: make sure your local `main` is up to date before creating new branches.

## 2. Create a New Branch

```bash
git checkout main
git pull origin main
git checkout -b feature/short-description
```

Naming examples:
- `feature/user-profile`
- `fix/login-error`
- `chore/update-readme`

## 3. Work and Commit Safely

```bash
git status
git add .
git commit -m "Add user profile edit form"
```

Good commit message format:
- Start with a verb: `Add`, `Fix`, `Refactor`, `Update`, `Remove`
- Be specific and short.

## 4. Push Branch to Remote

```bash
git push -u origin feature/short-description
```

- `-u` sets upstream so future pushes can be just `git push`.

## 5. Keep Feature Branch Updated

```bash
git checkout main
git pull origin main
git checkout feature/short-description
git merge main
```

Do this often to avoid large merge conflicts later.

## 6. Merge a Branch Into Main

From `main`:

```bash
git checkout main
git pull origin main
git merge feature/short-description
git push origin main
```

Alternative (fast-forward only when clean history is required):

```bash
git merge --ff-only feature/short-description
```

## 7. Delete Old Branches

After branch is merged:

```bash
git branch -d feature/short-description
git push origin --delete feature/short-description
```

- `-d`: safe delete (fails if not merged).
- `-D`: force delete local branch (use carefully).

Clean stale remote-tracking branches:

```bash
git fetch --prune
```

## 8. Solve Merge Conflicts

When Git says there are conflicts:

1. Run `git status` to see conflicted files.
2. Open each file and look for conflict markers:

```text
<<<<<<< HEAD
current branch code
=======
incoming branch code
>>>>>>> feature/branch-name
```

3. Edit to keep the correct final code and remove all markers.
4. Mark resolved files:

```bash
git add <file>
```

5. Finish merge:

```bash
git commit
```

If you need to cancel the merge:

```bash
git merge --abort
```

## 9. Useful Git Commands

```bash
git log --oneline --graph --decorate --all
git diff
git restore <file>
git reset --soft HEAD~1
git stash
git stash pop
```

Quick meanings:
- `git diff`: see unstaged changes.
- `git restore <file>`: discard local changes in one file.
- `git reset --soft HEAD~1`: undo last commit but keep changes staged.
- `git stash`: temporarily save uncommitted work.

## 10. Team Best Practices

- Pull latest `main` before starting work.
- Keep branches focused on one task.
- Commit in small, meaningful steps.
- Merge/rebase often to reduce conflicts.
- Delete merged branches to keep repo clean.
- Never force-push shared branches unless your team agrees.
