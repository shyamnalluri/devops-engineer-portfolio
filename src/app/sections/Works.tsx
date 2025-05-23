'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FaLink, FaGithub, FaCode } from 'react-icons/fa';
import OptimizedImage from '../components/OptimizedImage';

export interface Case {
  title: string;
  description: string;
  image: string;
  category: 'Infrastructure' | 'CI/CD' | 'Monitoring' | 'Security';
  tags: string[];
  tools: string[];
  githubUrl?: string;
  demoUrl?: string;
}

const cases: Case[] = [
  {
    title: "Enterprise Kubernetes Setup",
    description: "Multi-cluster Kubernetes deployment for a global financial services company",
    image: "/projects/kubernetes-case.jpg",
    category: 'Infrastructure',
    tags: ["Kubernetes", "Multi-Cluster", "Financial Services"],
    tools: ["EKS", "Terraform", "ArgoCD", "Prometheus", "Grafana"],
    githubUrl: "https://github.com/yourusername/enterprise-k8s"
  },
  {
    title: "Cloud Security Implementation",
    description: "Zero-trust security model implementation for AWS infrastructure",
    image: "/projects/security-case.jpg",
    category: 'Security',
    tags: ["Zero Trust", "Compliance", "AWS"],
    tools: ["AWS IAM", "AWS GuardDuty", "AWS Config", "Hashicorp Vault"]
  },
  {
    title: "CI/CD Pipeline Modernization",
    description: "Revamped CI/CD workflow for a retail software platform",
    image: "/projects/cicd-case.jpg",
    category: 'CI/CD',
    tags: ["Pipeline", "Automation", "Retail"],
    tools: ["GitHub Actions", "Docker", "Terraform", "AWS CodeDeploy"],
    githubUrl: "https://github.com/yourusername/cicd-modernization",
    demoUrl: "https://demo-cicd.example.com"
  },
  {
    title: "Infrastructure Monitoring Solution",
    description: "End-to-end monitoring for hybrid cloud infrastructure",
    image: "/projects/monitoring-case.jpg",
    category: 'Monitoring',
    tags: ["Observability", "Hybrid Cloud", "Alerting"],
    tools: ["Prometheus", "Grafana", "ELK Stack", "Datadog", "PagerDuty"],
    demoUrl: "https://monitoring-demo.example.com"
  },
  {
    title: "Multi-Cloud Deployment Framework",
    description: "Unified deployment system for AWS and Azure resources",
    image: "/projects/multicloud-case.jpg",
    category: 'Infrastructure',
    tags: ["Multi-Cloud", "IaC", "Enterprise"],
    tools: ["Terraform", "AWS", "Azure", "GitHub Actions"],
    githubUrl: "https://github.com/yourusername/multicloud-framework"
  },
  {
    title: "Microservices Security Gateway",
    description: "API gateway with enhanced security for microservices architecture",
    image: "/projects/gateway-case.jpg",
    category: 'Security',
    tags: ["API Gateway", "Microservices", "Authentication"],
    tools: ["Kong", "OAuth2", "JWT", "Kubernetes"],
    githubUrl: "https://github.com/yourusername/secure-gateway"
  }
];

const Works = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const categories = ['All', 'Infrastructure', 'CI/CD', 'Monitoring', 'Security'];

  const filteredCases = selectedCategory === 'All'
    ? cases
    : cases.filter(c => c.category === selectedCategory);

  return (
    <section id="works" className="py-24 bg-black relative">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-0" />
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6 text-white relative inline-block">
            Case Studies
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500"></div>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg mt-8">
            Real-world DevOps solutions implemented for enterprise clients across various industries
          </p>
          
          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-4 mt-8 mb-12">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300
                  ${selectedCategory === category 
                    ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg shadow-red-600/20' 
                    : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filteredCases.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group"
              >
                <div className="flex flex-col h-full bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden shadow-lg hover:shadow-red-900/10 border border-gray-800 hover:border-red-500/30 transition-all duration-500">
                  {/* Case image */}
                  <div className="relative h-64 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50 z-10" />
                    <div className="absolute top-4 right-4 z-20">
                      <span className="px-3 py-1 bg-red-500/20 backdrop-blur-md text-red-400 text-xs rounded-full font-medium">
                        {item.category}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-black/30 z-0 group-hover:bg-black/20 transition-colors duration-300" />
                    <OptimizedImage
                      src={item.image || '/projects/default.jpg'}
                      alt={item.title}
                      width={600}
                      height={300}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="flex flex-col flex-grow p-6">
                    <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-red-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-6 flex-grow">
                      {item.description}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {item.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 text-xs rounded-md bg-gray-800 text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* Tools */}
                    <div className="mb-4">
                      <h4 className="text-xs uppercase text-gray-500 mb-2 tracking-wider">Used tools</h4>
                      <div className="flex flex-wrap gap-2">
                        {item.tools.map((tool, i) => (
                          <span key={i} className="text-gray-400 text-xs">
                            {tool}{i < item.tools.length - 1 ? ',' : ''}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Links */}
                    <div className="flex items-center justify-start gap-3 mt-auto">
                      {item.githubUrl && (
                        <a 
                          href={item.githubUrl}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-200 transition-colors"
                        >
                          <FaGithub className="w-4 h-4" />
                          <span>Code</span>
                        </a>
                      )}
                      
                      {item.demoUrl && (
                        <a 
                          href={item.demoUrl}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white transition-all"
                        >
                          <FaLink className="w-3 h-3" />
                          <span>Live Demo</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Works;
