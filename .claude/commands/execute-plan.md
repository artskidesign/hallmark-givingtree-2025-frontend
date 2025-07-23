Execute a development plan for the Hallmark Giving Tree project.

**Requirements:**
- User must provide the plan name to execute
- Plan must exist in `./docs/plans/[plan-name]/` folder

**Process:**
1. Validate plan exists in `./docs/plans/[plan-name]/[plan-name].md`
2. Read and analyze the plan file
3. Create `Implementation.md` in the same folder for tracking
4. Execute plan steps following project standards:
   - Use Next.js 15 App Router patterns
   - Implement with TypeScript
   - Style with Tailwind CSS + MUI
   - Use React Context for state management
   - Create Server Actions for data mutations
   - Follow Christmas theme guidelines
5. Update Implementation.md with:
   - Progress tracking
   - Code changes made
   - Issues encountered
   - Testing results
6. Run `pnpm build` and `pnpm dev` to verify functionality
7. Ensure all TypeScript errors are resolved

**Stop conditions:**
- If plan doesn't exist, warn user and request clarification
- If build errors occur, document and ask for guidance