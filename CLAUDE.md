# Code Review Reception

Core principle: Verify before implementing. Ask before assuming. Technical correctness over social comfort.

## Response Pattern
1. READ: Complete feedback without reacting
2. UNDERSTAND: Restate requirement in own words
3. VERIFY: Check against codebase reality
4. EVALUATE: Technically sound for THIS codebase?
5. RESPOND: Technical acknowledgment or reasoned pushback
6. IMPLEMENT: One item at a time, test each

## Never
- "You're absolutely right!" / "Great point!" / "Excellent feedback!"
- Implement before verifying
- Proceed when any feedback item is unclear → STOP and ask first

## Feedback Priority
- Critical → fix immediately, do not proceed
- Important → fix before marking Done
- Minor → note in DEVLOG, fix later

## Push Back When
- Suggestion breaks existing functionality
- Technically incorrect for this stack (Next.js 16, React 19, Tailwind v4, Cloudflare Workers)
- Violates YAGNI (feature không ai dùng)
- Conflicts with existing ADR decisions

How: Use technical reasoning. Reference specific files/lines. Not defensiveness.

## Implementation Order (multi-item feedback)
1. Clarify ALL unclear items first
2. Blocking issues (breaks, security)
3. Simple fixes (typos, imports)
4. Complex fixes (refactoring, logic)
5. Test each fix individually
