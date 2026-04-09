# Frontend Design Skills for Claude Code

A system of 18 specialized slash commands that give Claude Code deep expertise in frontend design and UI/UX engineering. Each command targets a specific aspect of interface quality — from typography and layout to performance and accessibility.

These are not generic prompts. They encode opinionated, production-grade design knowledge: anti-pattern detection, AI slop avoidance, WCAG compliance, and the kind of attention to detail that separates shipped from polished.

## Installation

Make sure you have [Claude Code](https://docs.anthropic.com/en/docs/claude-code) and Node.js installed, then run:

```bash
npx gral-frontend-skill
```

That's it. The installer copies 18 commands and 8 reference files to `~/.claude/` so they're available in every Claude Code session.

### First-time project setup

In any project where you want to use these skills, open Claude Code and run:

```
/user:magistero teach
```

Claude will interview you about your project's audience, brand personality, and aesthetic direction, then save a `.design-context.md` file in the project root. All other commands use this file to produce context-aware results instead of generic output.

You only need to do this **once per project**. If you skip it, commands will ask you to do it first.

### Project-level installation

If you want the skills available only inside a specific project (instead of globally), run the installer from the project root with the `--project` flag:

```bash
npx gral-frontend-skill --project
```

This copies everything to `.claude/commands/` and `.claude/reference/` within the current directory, and automatically rewrites internal paths. Commands become available as `/project:command-name`.

### Updating

```bash
npx gral-frontend-skill@latest
```

### Uninstalling

```bash
npx gral-frontend-skill --uninstall
```

---

## Commands

### Foundation

| Command | What it does |
|---------|-------------|
| **magistero** | Core design skill. Contains all design principles, anti-patterns, font selection procedure, and the AI Slop Test. Modes: `teach` (setup), `craft` (full build flow), or default (design creation). |
| **forgia** | Plans UX/UI before code. Runs a discovery interview and produces a structured design brief. |

### Building

| Command | What it does |
|---------|-------------|
| **carattere** | Typography — font choices, hierarchy, scale, weight, readability |
| **componi** | Layout & spacing — grid, rhythm, visual hierarchy, density |
| **tinta** | Color — strategic palette, semantic color, OKLCH, accessibility |
| **anima** | Animation — micro-interactions, entrance choreography, easing, reduced motion |
| **muta** | Responsive — cross-device adaptation, touch targets, breakpoints |
| **lume** | UX writing — error messages, labels, microcopy, empty states |
| **incanto** | Delight — personality, easter eggs, celebrations, loading states |
| **inizia** | Onboarding — first-run experience, empty states, progressive disclosure |

### Tuning

| Command | What it does |
|---------|-------------|
| **ardore** | Amplify — make safe/boring designs more impactful and memorable |
| **smorza** | Tone down — reduce aggressive/overstimulating designs to refined |
| **distilla** | Simplify — strip to essence, remove unnecessary complexity |

### Hardening

| Command | What it does |
|---------|-------------|
| **affina** | Performance — loading speed, rendering, bundle size, Core Web Vitals |
| **tempra** | Resilience — error handling, i18n, text overflow, edge cases |
| **allinea** | Design system — realign to tokens, patterns, and standards |

### Quality

| Command | What it does |
|---------|-------------|
| **scrutinio** | Audit — scored technical report (a11y, perf, theming, responsive, anti-patterns) with P0-P3 severity |
| **lucida** | Polish — final pass on alignment, spacing, states, transitions, code quality |

---

## Typical Workflows

### New feature (full process)

```
/user:magistero teach     → establish design context (once per project)
/user:forgia              → discovery interview + design brief
/user:magistero craft     → build with visual iteration
/user:scrutinio           → technical audit
/user:lucida              → final polish
```

### Improve existing UI

```
/user:scrutinio           → find what's wrong (scored report)
/user:carattere           → fix typography
/user:componi             → fix layout/spacing
/user:tinta               → fix color
/user:lucida              → final polish
```

### Make it bolder / quieter

```
/user:ardore              → amplify bland designs
/user:smorza              → tone down aggressive designs
```

### Production hardening

```
/user:tempra              → edge cases, i18n, error states
/user:affina              → performance optimization
/user:allinea             → design system alignment
```

---

## Reference Files

Commands automatically consult these when they need deeper technical material:

| File | Content |
|------|---------|
| `typography.md` | Type scales, font pairing, OpenType features, web font loading |
| `spatial-design.md` | Spacing systems, grid, container queries, optical adjustments |
| `color-and-contrast.md` | OKLCH, palette construction, WCAG contrast, dark mode |
| `motion-design.md` | Duration/easing tables, reduced motion, perceived performance |
| `interaction-design.md` | 8 interactive states, focus rings, forms, popovers, keyboard nav |
| `responsive-design.md` | Mobile-first, input detection, safe areas, responsive images |
| `ux-writing.md` | Button labels, error formulas, empty states, translation |
| `craft.md` | The full forgia→build→iterate→present workflow |

---

## How Commands Work Together

All design commands share a dependency on **magistero**, which provides:

- The **Context Gathering Protocol** — ensures design context exists before any work
- **Design principles** — typography, color, layout, motion, interaction rules
- **Anti-pattern detection** — the AI Slop Test and absolute bans (gradient text, side-stripe borders, glassmorphism)
- **Font selection procedure** — a structured process to avoid training-data monoculture

When you run any command, it first checks for `.design-context.md` in your project root (created by `/magistero teach`), then reads magistero's principles. This ensures consistent quality across all commands.

**scrutinio** is the diagnostic command — it audits without fixing, producing a scored report that maps issues to the appropriate fix commands. Run it before and after changes to track improvement.

---

## Manual Installation

If you prefer not to use npx, you can clone and copy manually:

```bash
git clone https://github.com/gral-digital/frontend-skill.git
cp frontend-skill/commands/*.md ~/.claude/commands/
mkdir -p ~/.claude/reference
cp frontend-skill/reference/*.md ~/.claude/reference/
```

## License

MIT
