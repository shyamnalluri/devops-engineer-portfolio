// Skills Section Data
// Update this file to modify your skills and categories

export interface SkillCategory {
  name: string;
  skills: {
    title: string;
    icon: string; // Icon name from react-icons
  }[];
}

export const skillsData: SkillCategory[] = [
  {
    name: 'Cloud & Infrastructure',
    skills: [
      { title: 'AWS', icon: 'FaAws' },
      { title: 'Microsoft Azure', icon: 'SiMicrosoftazure' },
      { title: 'Google Cloud', icon: 'SiGooglecloud' },
      { title: 'Terraform', icon: 'SiTerraform' },
      { title: 'CloudFormation', icon: 'SiAmazonaws' },
      { title: 'Pulumi', icon: 'SiPulumi' },
    ],
  },
  {
    name: 'Container & Orchestration',
    skills: [
      { title: 'Docker', icon: 'FaDocker' },
      { title: 'Kubernetes', icon: 'SiKubernetes' },
      { title: 'Helm', icon: 'SiHelm' },
      { title: 'OpenShift', icon: 'SiRedhatopenshift' },
      { title: 'Podman', icon: 'SiPodman' },
      { title: 'Containerd', icon: 'SiContainerd' },
    ],
  },
  {
    name: 'CI/CD & GitOps',
    skills: [
      { title: 'Jenkins', icon: 'SiJenkins' },
      { title: 'GitHub Actions', icon: 'SiGithubactions' },
      { title: 'Azure DevOps', icon: 'SiAzuredevops' },
      { title: 'GitLab CI', icon: 'SiGitlab' },
      { title: 'ArgoCD', icon: 'SiArgo' },
      { title: 'Flux', icon: 'SiFlux' },
    ],
  },
  {
    name: 'Monitoring & Observability',
    skills: [
      { title: 'Prometheus', icon: 'SiPrometheus' },
      { title: 'Grafana', icon: 'SiGrafana' },
      { title: 'ELK Stack', icon: 'SiElasticsearch' },
      { title: 'Datadog', icon: 'SiDatadog' },
      { title: 'New Relic', icon: 'SiNewrelic' },
      { title: 'Jaeger', icon: 'SiJaeger' },
    ],
  },
  {
    name: 'Security & Policy',
    skills: [
      { title: 'HashiCorp Vault', icon: 'SiVault' },
      { title: 'Aqua Security', icon: 'SiAqua' },
      { title: 'Falco', icon: 'SiFalco' },
      { title: 'Open Policy Agent', icon: 'SiOpenpolicyagent' },
      { title: 'Snyk', icon: 'SiSnyk' },
      { title: 'SonarQube', icon: 'SiSonarqube' },
    ],
  },
  {
    name: 'Programming & OS',
    skills: [
      { title: 'Python', icon: 'FaPython' },
      { title: 'Go', icon: 'SiGo' },
      { title: 'Bash', icon: 'SiGnubash' },
      { title: 'PowerShell', icon: 'SiPowershell' },
      { title: 'Linux', icon: 'FaLinux' },
      { title: 'Windows', icon: 'FaWindows' },
    ],
  },
];
