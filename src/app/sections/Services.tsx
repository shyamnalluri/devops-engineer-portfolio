'use client';

import { motion } from 'framer-motion';
import { FaServer, FaCloud, FaMagic, FaCode, FaNetworkWired, FaLock } from 'react-icons/fa';
import { SiKubernetes } from 'react-icons/si';

const Services = () => {  const services = [
    {
      icon: <FaCloud className="w-8 h-8" />,
      title: "Cloud Architecture",
      description: "Designing and implementing scalable, secure, and cost-effective cloud infrastructure across AWS, Azure, and GCP."
    },
    {
      icon: <FaCode className="w-8 h-8" />,
      title: "CI/CD Pipeline Development",
      description: "Creating automated build, test, and deployment pipelines to ensure rapid and reliable software delivery."
    },
    {
      icon: <SiKubernetes className="w-8 h-8" />,
      title: "Kubernetes Solutions",
      description: "Deploying and managing containerized applications with Kubernetes for optimal scalability and resilience."
    },
    {
      icon: <FaServer className="w-8 h-8" />,
      title: "Infrastructure as Code",
      description: "Automating infrastructure provisioning and management through code with Terraform, CloudFormation, and Ansible."
    },
    {
      icon: <FaNetworkWired className="w-8 h-8" />,
      title: "Network Optimization",
      description: "Designing and implementing efficient network architectures for cloud and hybrid environments."
    },
    {
      icon: <FaLock className="w-8 h-8" />,
      title: "DevSecOps Integration",
      description: "Embedding security into the DevOps lifecycle to create secure, compliant infrastructure and applications."
    }
  ];

  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >          <h2 className="text-5xl font-bold mb-4">
            <span className="relative">
              DevOps Services
              <motion.div 
                className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-pink-500"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              />
            </span>
          </h2>
          <p className="text-gray-700 text-xl max-w-3xl mx-auto">
            I provide comprehensive DevOps solutions that optimize your development lifecycle and improve operational efficiency.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              <div className="text-orange-500 mb-4 group-hover:scale-110 transform transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-3 group-hover:text-orange-500 transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-gray-600">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a
            href="#contact"
            className="inline-flex items-center justify-center bg-black text-white px-8 py-4 text-base font-medium hover:bg-gray-800 transition-all"
          >
            Consult With Me
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
