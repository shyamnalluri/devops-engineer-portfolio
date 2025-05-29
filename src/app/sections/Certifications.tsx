'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import OptimizedImage from '../components/OptimizedImage';
import Image from 'next/image';

interface Certification {
  name: string;
  credentialId: string;
  credentialUrl: string;
  logo: string;
  issuer: string;
  issueDate: string;
  validUntil: string;
  category: 'cloud' | 'devops' | 'security';
}

const certifications: Certification[] = [
  {
    name: "AWS Certified Solutions Architect - Associate",
    credentialId: "AWS-SAA-PLACEHOLDER",
    credentialUrl: "https://aws.amazon.com/certification/certified-solutions-architect-associate/",
    logo: "/certifications/aws-cert.svg",
    issuer: "Amazon Web Services",
    issueDate: "Mar 2024",
    validUntil: "Mar 2027",
    category: 'cloud'
  },
  {
    name: "Microsoft Azure Administrator Associate",
    credentialId: "AZ-104-PLACEHOLDER",
    credentialUrl: "https://learn.microsoft.com/en-us/credentials/certifications/azure-administrator/",
    logo: "/certifications/azure-cert.svg",
    issuer: "Microsoft",
    issueDate: "Jan 2024",
    validUntil: "Jan 2026",
    category: 'cloud'
  },
  {
    name: "Certified Kubernetes Administrator (CKA)",
    credentialId: "CKA-PLACEHOLDER",
    credentialUrl: "https://www.cncf.io/certification/cka/",
    logo: "/certifications/kubernetes-cert.svg",
    issuer: "Cloud Native Computing Foundation",
    issueDate: "Apr 2024",
    validUntil: "Apr 2026",
    category: 'devops'
  },
  {
    name: "HashiCorp Certified: Terraform Associate",
    credentialId: "TERRAFORM-PLACEHOLDER",
    credentialUrl: "https://www.hashicorp.com/certification/terraform-associate",
    logo: "/certifications/terraform-cert.svg",
    issuer: "HashiCorp",
    issueDate: "Feb 2024",
    validUntil: "Feb 2026",
    category: 'devops'
  }
];

const Certifications = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const categories = [
    { id: 'all', label: 'All Certifications' },
    { id: 'cloud', label: 'Cloud' },
    { id: 'devops', label: 'DevOps' },
    { id: 'security', label: 'Security' }
  ];

  const filteredCertifications = selectedCategory === 'all'
    ? certifications
    : certifications.filter(cert => cert.category === selectedCategory);
  return (    <section 
      id="certifications" 
      className="py-8 sm:py-12 bg-black relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-0" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}        className="text-center mb-8"
        >
          <h2 className="text-4xl font-bold mb-4 text-white relative inline-block">
            Professional Certifications
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500"></div>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg mt-4">
            Industry-recognized certifications demonstrating expertise in cloud architecture,
            DevOps practices, and infrastructure management
          </p>
          
          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-4 mt-4 mb-6">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300
                  ${selectedCategory === category.id 
                    ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg shadow-red-600/20' 
                    : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.label}
              </motion.button>
            ))}
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filteredCertifications.map((cert, index) => (
              <motion.div
                key={cert.credentialId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative h-full rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 to-black 
                  border border-gray-800 hover:border-red-500/50 shadow-lg hover:shadow-red-600/10 transition-all duration-500
                  hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 via-red-500/0 to-transparent opacity-0 
                    group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="p-6 relative">
                    <div className="flex justify-center mb-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 via-transparent to-transparent 
                          rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <OptimizedImage
                          src={cert.logo}
                          alt={`${cert.name} logo`}
                          width={60}
                          height={60}
                          className="w-16 h-16 object-contain relative z-10 transform group-hover:scale-110 
                            transition-transform duration-500"
                        />
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <h3 className="text-lg font-medium text-white group-hover:text-red-400 
                        transition-colors duration-300 mb-2">
                        {cert.name}
                      </h3>
                      <p className="text-sm text-gray-400 mb-4">{cert.issuer}</p>
                      
                      <div className="flex justify-between items-center text-xs text-gray-500 mb-6">
                        <div>
                          <p className="text-gray-600">Issued</p>
                          <p className="text-gray-400">{cert.issueDate}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Valid until</p>
                          <p className="text-gray-400">{cert.validUntil}</p>
                        </div>
                      </div>
                      
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 w-full rounded-lg text-sm font-medium
                          bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 
                          text-white transition-all duration-300 transform hover:scale-[1.02]"
                      >
                        Verify Credential
                        <svg
                          className="w-4 h-4 transform transition-transform group-hover:translate-x-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                          />
                        </svg>
                      </a>
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

export default Certifications;