# Project case studies – Architecture images guide

This codebase supports showing an optional architecture diagram per project in the project modal. You can add real diagrams later; leaving them blank now is fine.

Where images live

- Put images under `public/images/architecture/` (e.g., `public/images/architecture/cloud-migration.png`).
- Keep files small (<300 KB) and use PNG/WebP/SVG when possible. Suggested width: 1200px max.

How to show a diagram for a project

1. Add the file into `public/images/architecture/`.
2. In `src/data/projects.ts`, set the `architectureImage` field for the project:

```ts
architectureImage: "/images/architecture/cloud-migration.png",
```

Hiding the section (default)

- If you omit `architectureImage` or set it to an empty string, the Architecture section will not render in the modal.

Important for GitHub Pages (basePath)

- This project is statically exported with a base path (`/devops-engineer-portfolio`).
- For now the modal uses a plain `<img>` tag, which does NOT automatically apply the base path.

You have two options:

- Easiest (recommended for production): use a full URL in `architectureImage`:

```ts
architectureImage: "https://shyamnalluri.github.io/devops-engineer-portfolio/images/architecture/cloud-migration.png",
```

- Or, if you prefer root-relative paths (like `/images/...`), they will load correctly in local dev but will point to the domain root in production. Only use these if you are serving from the domain root.

Future improvement (optional)

- We can switch the modal to `next/image` so the base path is handled automatically for static export. If you want that, say the word and we’ll update the component accordingly.
