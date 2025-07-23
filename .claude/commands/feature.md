Create a new feature branch for Hallmark Giving Tree development.

**Prerequisites:**
- Must be on `main` or `develop` branch
- Working directory should be clean

**Process:**
1. Check current branch - warn if not on main/develop
2. Create feature branch using naming convention:
   - `feature/[feature-name]` (kebab-case)
   - Example: `feature/deed-sharing`, `feature/christmas-animations`
3. Follow git workflow from CLAUDE.md:
   - Descriptive branch names
   - Conventional commit messages
   - Keep branches focused and small
4. Switch to new branch
5. Ensure all changes are committed with clear messages:
   - Format: `type: description`
   - Types: feat, fix, refactor, style, docs, test
   - Examples:
     - `feat: add deed completion animation`
     - `fix: resolve tree rendering issue`
     - `style: update Christmas theme colors`

**Project-specific considerations:**
- Consider Christmas theme impact
- Ensure Next.js App Router compatibility
- Maintain TypeScript strict mode compliance
- Follow Tailwind CSS utility-first approach