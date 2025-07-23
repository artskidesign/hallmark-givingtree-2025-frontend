Ensure we are on a feature branch - if not then warn the user and offer to create one but do not proceed. When creating the branch, use the information in the README.md in the root of the repository.

If we are on a feature branch check what changes are not commited and commit changes with good commit messages.

Ensure to run:

```bash
pnpm run build
```

Assess the build output and ensure it is correct, if there are any errors, highlight them, work out suggested fixes then STOP and ask the user if they want to proceed.

Once committed, push to the remote branch and open a pull request.

Ensure the pull request is created with the correct title and description using all of your knowledge of the project, the code changes and the session.