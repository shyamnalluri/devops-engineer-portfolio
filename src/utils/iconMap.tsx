// Icon mapping utility for dynamic icon rendering
import { 
  FaDocker, 
  FaAws, 
  FaJenkins, 
  FaGitAlt, 
  FaPython, 
  FaMicrosoft,
  FaGoogle,
  FaGithub,
  FaGitlab,
  FaShieldAlt,
  FaCertificate,
  FaTerminal,
  FaServer,
  FaLinux,
  FaWindows
} from 'react-icons/fa';

import { 
  SiKubernetes, 
  SiTerraform, 
  SiAnsible,
  SiPulumi,
  SiGnubash,
  SiYaml,
  SiJson,
  SiHelm,
  SiRedhatopenshift,
  SiPrometheus,
  SiGrafana,
  SiElastic,
  SiDatadog,
  SiVault,
  SiGooglecloud,
  SiAmazon, // AWS alternative
  SiPodman,
  SiContainerd,
  SiJenkins,
  SiGithubactions,
  SiGitlab,
  SiArgo,
  SiFlux,
  SiElasticsearch,
  SiNewrelic,
  SiJaeger,
  SiAqua,
  SiFalco,
  SiSnyk,
  SiSonarqube,
  SiGo
} from 'react-icons/si';

// Icon mapping object
export const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  // FontAwesome icons
  FaDocker,
  FaAws,
  FaJenkins,
  FaGitAlt,
  FaPython,
  FaMicrosoft,
  FaGoogle,
  FaGithub,
  FaGitlab,
  FaShieldAlt,
  FaCertificate,
  FaTerminal,
  FaServer,
  FaLinux,
  FaWindows,
  // Simple Icons
  SiKubernetes,
  SiTerraform,
  SiAnsible,
  SiPulumi,
  SiGnubash,
  SiYaml,
  SiJson,
  SiHelm,
  SiRedhatopenshift,
  SiPrometheus,
  SiGrafana,
  SiElastic,
  SiDatadog,
  SiVault,
  SiGooglecloud,
  SiAmazon,
  SiPodman,
  SiContainerd,
  SiJenkins,
  SiGithubactions,
  SiGitlab,
  SiArgo,
  SiFlux,
  SiElasticsearch,
  SiNewrelic,
  SiJaeger,
  SiAqua,
  SiFalco,
  SiSnyk,
  SiSonarqube,
  SiGo,
  
  // Icon aliases for skills that don't have exact matches
  SiMicrosoftazure: FaMicrosoft, // Use Microsoft icon for Azure
  SiAmazonaws: SiAmazon, // Use Amazon icon for AWS
  SiAzuredevops: FaMicrosoft, // Use Microsoft icon for Azure DevOps
  SiOpenpolicyagent: FaShieldAlt, // Use shield icon for OPA
  SiPowershell: FaTerminal // Use terminal icon for PowerShell
};

// Helper function to get icon component by name
export const getIcon = (iconName: string, className: string = "w-5 h-5") => {
  const IconComponent = iconMap[iconName];
  if (!IconComponent) {
    console.warn(`Icon "${iconName}" not found in iconMap`);
    return null;
  }
  return <IconComponent className={className} />;
};
