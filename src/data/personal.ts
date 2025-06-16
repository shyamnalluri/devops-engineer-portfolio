// Personal Information Data
// Update this file to modify your personal information

export interface PersonalInfo {
  name: string;
  title: string;
  subtitle: string;
  description: string;
  location: string;
  email: string;
  phone: string;
  website: string;
  socialLinks: {
    linkedin: string;
    github: string;
    twitter?: string;
    instagram?: string;
  };
}

export const personalInfo: PersonalInfo = {
  name: "Shyam Nalluri",
  title: "Senior DevOps Engineer",
  subtitle: "DevSecOps & Platform Engineer",
  description: "Architecting enterprise-grade cloud infrastructure with 5+ years of expertise in DevSecOps and platform automation",
  location: "India",
  email: "shyam.nalluri@example.com", // Update with your actual email
  phone: "+91-XXXXXXXXXX", // Update with your actual phone
  website: "https://shyamnalluri.dev", // Update with your actual website
  socialLinks: {
    linkedin: "https://www.linkedin.com/in/shyamnalluri",
    github: "https://github.com/shyamnalluri",
    // twitter: "https://twitter.com/shyamnalluri", // Optional
    // instagram: "https://instagram.com/shyamnalluri", // Optional
  }
};
