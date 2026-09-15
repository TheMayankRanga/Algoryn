Push my existing **Algoryn** project to this GitHub repository:

[github.com/TheMayankRanga/Algoryn](https://github.com/TheMayankRanga/Algoryn?utm_source=chatgpt.com)

Do everything necessary autonomously.

### Before pushing

1. Inspect the entire project.
2. Check whether Git is already initialized.
3. Check `.gitignore` and create/update it if necessary.
4. Make absolutely sure these are NOT committed:

   * `.env`
   * `.env.local`
   * API keys
   * Passwords
   * Database credentials
   * Authentication secrets
   * Private keys/certificates
   * `node_modules`
   * `.next`
   * Build/coverage output
   * Other generated or sensitive files
5. Inspect `git status` and verify what will be committed.
6. Never print or expose any secret values.

### Git setup

If Git is not initialized, initialize it.

Use:

```text id="0i4h6r"
main
```

as the branch.

Set the remote to:

```text id="7i7z7s"
https://github.com/TheMayankRanga/Algoryn.git
```

If the remote already exists, verify that it points to the correct repository rather than blindly creating another remote.

### Commit

Stage the appropriate files and create the initial commit:

```text id="rjkjbj"
Initial release of Algoryn
```

### Push

Push the `main` branch to the GitHub repository.

If GitHub authentication is required, pause and tell me what authentication step I need to complete. Do not guess credentials or bypass authentication.

### Verify

After pushing, verify:

* The push succeeded.
* The remote is `TheMayankRanga/Algoryn`.
* The `main` branch was pushed.
* The working tree is clean.
* No secrets were committed.
* The repository contains the complete Algoryn source code.

Do NOT change the application's UI, functionality, content, database, architecture, or features.

This task is ONLY to safely put the existing Algoryn project on GitHub.

Do not stop after explaining the commands. Actually execute the required Git commands if your environment has terminal access.
