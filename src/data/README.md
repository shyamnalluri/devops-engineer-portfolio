# Portfolio Data Structure

This directory contains all the data files for the portfolio website, organized by section for better maintainability.

## File Structure

```
src/data/
├── index.ts           # Central export file - imports all data
├── personal.ts        # Personal information and contact details
├── about.ts          # About section content and stats
├── skills.ts         # Technical skills organized by categories
├── experience.ts     # Work experience and education
├── projects.ts       # Portfolio projects with detailed information
├── certifications.ts # Professional certifications and credentials
└── portfolio.ts      # (Legacy - can be removed)
```

## Usage

### Option 1: Import from specific files

```typescript
import { projectsData } from '../../data/projects';
import { skillsData } from '../../data/skills';
import { experienceData } from '../../data/experience';
```

### Option 2: Import from index file

```typescript
import { projectsData, skillsData, experienceData } from '../../data';
```

## Data Files Overview

### 📝 personal.ts

Contains personal information, contact details, and social links.

- Name, title, subtitle, description
- Location, email, phone, website
- Social media links (LinkedIn, GitHub, etc.)

### 🎯 about.ts

About section content including description paragraphs and stats.

- Multi-paragraph description
- Achievement statistics (years experience, projects, etc.)

### 🛠️ skills.ts

Technical skills organized by categories with icons.

- Cloud & Infrastructure
- Container & Orchestration
- CI/CD & GitOps
- Monitoring & Observability
- Security & Policy
- Programming & OS

### 💼 experience.ts

Work experience and education history.

- Job positions with company details
- Educational background
- Technologies used and achievements
- Timeline and career progression

### 🚀 projects.ts

Detailed portfolio projects with comprehensive information.

- Project descriptions and technical details
- Technologies used and challenges faced
- Solutions implemented and metrics achieved
- GitHub links and live URLs

### 🏆 certifications.ts

Professional certifications and credentials.

- Certification names and issuers
- Credential IDs and verification URLs
- Validity periods and categories
- Associated icons and descriptions

## Editing Guidelines

1. **Keep data and components separate**: Only modify data files, not component logic
2. **Follow TypeScript interfaces**: Each file exports its own interfaces for type safety
3. **Use consistent formatting**: Follow the existing patterns for icons, URLs, and descriptions
4. **Test changes**: Restart the development server after making changes
5. **Update gradually**: Modify one section at a time and test before moving to the next

## Benefits of This Structure

✅ **Better Organization**: Each section has its own dedicated file
✅ **Easier Maintenance**: Changes to one section don't affect others
✅ **Type Safety**: Each file exports its own TypeScript interfaces
✅ **Scalability**: Easy to add new sections or expand existing ones
✅ **Team Collaboration**: Multiple developers can work on different sections
✅ **Version Control**: Cleaner git diffs when changes are made
