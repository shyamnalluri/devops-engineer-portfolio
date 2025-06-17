// About Section Data
// Update this file to modify your about section content

export interface AboutData {
  description: string[];
  stats: {
    label: string;
    value: string;
  }[];
}

export const aboutData: AboutData = {
  description: [
    "I'm a seasoned DevSecOps and Platform Engineer with over 5 years of experience in delivering scalable, secure infrastructure and platform automation across AWS and Azure. Currently serving as Senior DevOps Engineer at Kyndryl India, I specialize in cloud architecture, CI/CD pipeline optimization, and security-first automation solutions.",
    "My expertise spans Infrastructure as Code, container orchestration with Kubernetes, and implementing GitOps workflows. I hold multiple certifications including Azure AZ-900, AWS Technical Accredited, and HashiCorp Terraform Associate. I've successfully reduced deployment times by 75% while maintaining enterprise-grade security and compliance standards."
  ],
  stats: [
    { label: "Years Experience", value: "5+" },
    { label: "Projects Delivered", value: "50+" },
    { label: "Cloud Platforms", value: "3+" },
    { label: "Certifications", value: "8+" }
  ]
};
