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
  FaCertificate
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
  SiVault
} from 'react-icons/si';

import { 
  FaTerminal,
  FaServer
} from 'react-icons/fa';

// Icon mapping object
export const iconMap: Record<string, React.ComponentType<any>> = {
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
  
  // Alternative icons for missing ones
  FaTerminal, // For PowerShell
  FaServer    // For Nagios
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
