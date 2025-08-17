// Certifications Section Data
// Update this file to modify your certifications

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  description: string;
  credentialId?: string;
  credentialUrl?: string;
  verificationUrl?: string;
  icon: string;
  issueDate: string;
  validUntil?: string;
  category: 'cloud' | 'devops' | 'security' | 'programming' | 'other';
}

export const certificationsData: Certification[] = [
  {
    id: 'azure-fundamentals',
    name: "Microsoft Azure Fundamentals",
    issuer: "Microsoft",
    description: "Foundational knowledge of cloud concepts and Azure services",
    credentialId: "AZ-900-123456",
    credentialUrl: "https://learn.microsoft.com/certifications/azure-fundamentals/",
    verificationUrl: "https://learn.microsoft.com/certifications/azure-fundamentals/",
    icon: "SiMicrosoftazure",
    issueDate: "2024",
    validUntil: "2027",
    category: 'cloud'
  },
  {
    id: 'aws-technical-accredited',
    name: "AWS Technical Accredited",
    issuer: "Amazon Web Services",
    description: "Technical knowledge of AWS cloud platform and services",
    credentialId: "AWS-TA-123456",
    credentialUrl: "https://aws.amazon.com/certification/",
    verificationUrl: "https://aws.amazon.com/certification/",
    icon: "FaAws",
    issueDate: "2024",
    validUntil: "2026",
    category: 'cloud'
  },
  {
    id: 'terraform-associate',
    name: "HashiCorp Terraform Associate",
    issuer: "HashiCorp",
    description: "Infrastructure as Code using Terraform",
    credentialId: "TERRA-123456",
    credentialUrl: "https://www.hashicorp.com/certification/terraform-associate",
    verificationUrl: "https://www.hashicorp.com/certification/terraform-associate",
    icon: "SiTerraform",
    issueDate: "2024",
    validUntil: "2026",
    category: 'devops'
  },
  {
    id: 'kubernetes-fundamentals',
    name: "Kubernetes Fundamentals",
    issuer: "Cloud Native Computing Foundation",
    description: "Container orchestration and Kubernetes administration",
    credentialId: "K8S-123456",
    credentialUrl: "https://www.cncf.io/certification/",
    verificationUrl: "https://www.cncf.io/certification/",
    icon: "SiKubernetes",
    issueDate: "2024",
    validUntil: "2026",
    category: 'devops'
  },
  {
    id: 'kubernetes-dev',
    name: "Kubernetes Developer",
    issuer: "Cloud Native Computing Foundation",
    description: "Container orchestration and Kubernetes administration",
    credentialId: "K8S-123456",
    credentialUrl: "https://www.cncf.io/certification/",
    verificationUrl: "https://www.cncf.io/certification/",
    icon: "SiKubernetes",
    issueDate: "2024",
    validUntil: "2026",
    category: 'devops'
  },
  {
    id: 'kubernetes-deve',
    name: "Kubernetes Developer",
    issuer: "Cloud Native Computing Foundation",
    description: "Container orchestration and Kubernetes administration",
    credentialId: "K8S-123456",
    credentialUrl: "https://www.cncf.io/certification/",
    verificationUrl: "https://www.cncf.io/certification/",
    icon: "SiKubernetes",
    issueDate: "2024",
    validUntil: "2026",
    category: 'devops'
  },
  {
    id: 'kubernetes-devel',
    name: "Kubernetes Developer",
    issuer: "Cloud Native Computing Foundation",
    description: "Container orchestration and Kubernetes administration",
    credentialId: "K8S-123456",
    credentialUrl: "https://www.cncf.io/certification/",
    verificationUrl: "https://www.cncf.io/certification/",
    icon: "SiKubernetes",
    issueDate: "2024",
    validUntil: "2026",
    category: 'devops'
  },
  {
    id: 'kubernetes-develo',
    name: "Kubernetes Developer",
    issuer: "Cloud Native Computing Foundation",
    description: "Container orchestration and Kubernetes administration",
    credentialId: "K8S-123456",
    credentialUrl: "https://www.cncf.io/certification/",
    verificationUrl: "https://www.cncf.io/certification/",
    icon: "SiKubernetes",
    issueDate: "2024",
    validUntil: "2026",
    category: 'devops'
  },
  {
    id: 'kubernetes-develop',
    name: "Kubernetes Developer",
    issuer: "Cloud Native Computing Foundation",
    description: "Container orchestration and Kubernetes administration",
    credentialId: "K8S-123456",
    credentialUrl: "https://www.cncf.io/certification/",
    verificationUrl: "https://www.cncf.io/certification/",
    icon: "SiKubernetes",
    issueDate: "2024",
    validUntil: "2026",
    category: 'devops'
  },
  {
    id: 'kubernetes-develope',
    name: "Kubernetes Developer",
    issuer: "Cloud Native Computing Foundation",
    description: "Container orchestration and Kubernetes administration",
    credentialId: "K8S-123456",
    credentialUrl: "https://www.cncf.io/certification/",
    verificationUrl: "https://www.cncf.io/certification/",
    icon: "SiKubernetes",
    issueDate: "2024",
    validUntil: "2026",
    category: 'devops'
  }
];
