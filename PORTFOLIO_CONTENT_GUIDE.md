# Portfolio Content Management Guide

This portfolio uses a **dynamic data-driven system** that separates content from code, making it extremely easy to update your portfolio without touching any component files.

## 📁 Content Configuration Files

### 1. **Main Data File**: `src/data/portfolio.ts`
This is your **single source of truth** for all portfolio content. Update this file to change any content on your site.

### 2. **Icon Management**: `src/utils/iconMap.tsx`
Dynamic icon rendering system with 20+ pre-imported icons from React Icons.

## 🎯 How to Update Content

### Personal Information
```typescript
// In src/data/portfolio.ts
export const personalInfo: PersonalInfo = {
  name: "Your Name",
  title: "Your Job Title",
  subtitle: "Your Subtitle",
  description: "Your description",
  email: "your.email@example.com",
  socialLinks: {
    linkedin: "https://linkedin.com/in/yourusername",
    github: "https://github.com/yourusername"
  }
  // ... update any field
}
```

### About Section
```typescript
export const aboutData: AboutData = {
  description: [
    "First paragraph of your about section...",
    "Second paragraph with more details..."
  ],
  stats: [
    { label: "Years Experience", value: "5+" },
    { label: "Projects Delivered", value: "50+" }
    // Add/remove/modify stats
  ]
}
```

### Experience & Education
```typescript
export const experienceData: ExperienceItem[] = [
  {
    id: 'your-job-id',
    title: "Your Job Title",
    company: "Company Name",
    period: "2021 - Present",
    description: "Job description...",
    type: 'work', // or 'education'
    icon: '🚀', // Any emoji
    technologies: ["Technology1", "Technology2"],
    achievements: [
      "Achievement 1",
      "Achievement 2"
    ]
  }
  // Add more experiences...
]
```

### Skills
```typescript
export const skillsData: SkillCategory[] = [
  {
    name: "Category Name",
    skills: [
      { title: "Skill Name", icon: "IconName", proficiency: 90 }
      // Add more skills...
    ]
  }
  // Add more categories...
]
```

### Certifications
```typescript
export const certificationsData: Certification[] = [
  {
    name: "Certification Name",
    credentialId: "CERT-123",
    credentialUrl: "https://...",
    logo: "/path/to/logo.svg",
    issuer: "Issuing Organization",
    issueDate: "2023",
    validUntil: "2026",
    category: 'cloud' // or 'devops', 'security', 'programming'
  }
  // Add more certifications...
]
```

## 🎨 Adding New Icons

1. **Check available icons** in `src/utils/iconMap.tsx`
2. **To add new icons**:
   ```typescript
   // Import the icon
   import { SiNewTechnology } from 'react-icons/si';
   
   // Add to iconMap
   export const iconMap: Record<string, React.ComponentType<any>> = {
     // ...existing icons...
     SiNewTechnology,
   };
   ```
3. **Use in data**: `{ title: "New Technology", icon: "SiNewTechnology", proficiency: 85 }`

## 🚀 Key Benefits

✅ **Easy Updates**: Change content without touching React components  
✅ **Type Safety**: Full TypeScript support with interfaces  
✅ **Dynamic Icons**: 20+ icons with easy expansion  
✅ **Consistent Formatting**: Automatic styling and animations  
✅ **Maintainable**: Single file for all content updates  

## 📋 Component Status

| Section | Status | Data Source |
|---------|--------|-------------|
| **Hero** | ✅ Dynamic | `personalInfo` |
| **About** | ✅ Dynamic | `aboutData` |
| **Skills** | ✅ Dynamic | `skillsData` |
| **Experience** | ✅ Dynamic | `experienceData` |
| **Certifications** | ✅ Dynamic | `certificationsData` |
| **Projects** | 🔄 Ready for data | `projectsData` (prepared) |

## 🔧 Next Steps

1. **Update your content** in `src/data/portfolio.ts`
2. **Add your profile image** to `public/images/profile.jpg`
3. **Add certification logos** to `public/certifications/`
4. **Test locally**: `npm run dev`
5. **Deploy**: Your changes will be automatically applied!

**💡 Pro Tip**: The system is designed to be future-proof. You can easily add new fields to any interface and the components will automatically handle them with the existing styling and animations.
