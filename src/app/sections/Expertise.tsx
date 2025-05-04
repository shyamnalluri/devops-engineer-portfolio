'use client';

import { motion } from 'framer-motion';
import { FaDocker, FaAws, FaJenkins } from 'react-icons/fa';
import { SiKubernetes, SiTerraform, SiAnsible } from 'react-icons/si';
import Tooltip from '../components/Tooltip';

const Expertise = () => {
  const skills = [
    {
      title: "Infrastructure as Code",
      description: "Expertise in Terraform and CloudFormation for automated infrastructure provisioning",
      icon: <SiTerraform className="w-8 h-8" />,
      proficiency: 90,
      tooltipDetails: "Experience with Terraform modules, AWS CloudFormation, and Pulumi for infrastructure automation"
    },
    {
      title: "Container Orchestration",
      description: "Advanced knowledge of Docker and Kubernetes for containerization and orchestration",
      icon: <SiKubernetes className="w-8 h-8" />,
      proficiency: 85,
      tooltipDetails: "Proficient in K8s cluster management, deployments, services, and custom operators"
    },
    {
      title: "CI/CD Pipeline",
      description: "Implementation of automated pipelines using Jenkins, GitLab CI, and GitHub Actions",
      icon: <FaJenkins className="w-8 h-8" />,
      proficiency: 88,
      tooltipDetails: "Design and implementation of end-to-end CI/CD pipelines with automated testing and deployment"
    },
    {
      title: "Configuration Management",
      description: "Proficient in Ansible for automated system configuration and management",
      icon: <SiAnsible className="w-8 h-8" />,
      proficiency: 82,
      tooltipDetails: "Infrastructure automation using Ansible playbooks, roles, and collections"
    },
    {
      title: "Cloud Services",
      description: "Extensive experience with AWS cloud services and best practices",
      icon: <FaAws className="w-8 h-8" />,
      proficiency: 92,
      tooltipDetails: "AWS certified with expertise in EC2, ECS, Lambda, S3, and other core services"
    },
    {
      title: "Containerization",
      description: "Expert in Docker containerization and microservices architecture",
      icon: <FaDocker className="w-8 h-8" />,
      proficiency: 95,
      tooltipDetails: "Docker image optimization, multi-stage builds, and secure containerization practices"
    }
  ];

  return (
    <section id="expertise" className="py-16 pt-20 bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Expertise</h2>
          <p className="text-gray-400">Specialized in modern DevOps practices and tools</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="text-blue-500">
                  <Tooltip label={skill.tooltipDetails}>
                    <div className="cursor-help">
                      {skill.icon}
                    </div>
                  </Tooltip>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white">{skill.title}</h3>
              </div>
              <p className="text-gray-400 text-sm sm:text-base mb-4 min-h-[40px]">{skill.description}</p>
              <Tooltip label={`Proficiency: ${skill.proficiency}%`}>
                <div className="space-y-2">
                  <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden cursor-help">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.proficiency}%` }}
                      transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="absolute h-full bg-blue-500 rounded-full"
                    />
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Proficiency</span>
                    <span className="text-blue-400">{skill.proficiency}%</span>
                  </div>
                </div>
              </Tooltip>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Expertise;