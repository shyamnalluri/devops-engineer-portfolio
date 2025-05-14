'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import OptimizedImage from '../components/OptimizedImage';

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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <section 
      id="certifications" 
      className="py-20 relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 text-transparent bg-clip-text">
              Professional Certifications
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Industry-recognized certifications demonstrating expertise in cloud architecture,
            DevOps practices, and infrastructure management
          </p>
        </motion.div>        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto relative z-10">
          <AnimatePresence mode="popLayout">
            {certifications.map((cert) => (
              <motion.div
                key={cert.credentialId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative"
              >
                <div className="relative h-full rounded-xl border bg-gradient-to-br from-gray-900/90 to-gray-800/90 
                  backdrop-blur-sm overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500
                  border-blue-500/20 hover:border-blue-500/40 hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-blue-500/5 to-transparent opacity-0 
                    group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="p-4 relative">
                    <div className="flex items-center gap-4">
                      <div className="relative flex-shrink-0">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-transparent 
                          rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <OptimizedImage
                          src={cert.logo}
                          alt={`${cert.name} logo`}
                          width={48}
                          height={48}
                          className="w-12 h-12 object-contain relative z-10 transform group-hover:scale-110 
                            transition-transform duration-500"
                        />
                      </div>                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-white group-hover:text-blue-400 
                          transition-colors duration-300 leading-snug line-clamp-2">
                          {cert.name}
                        </h3>
                        <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{cert.issuer}</p>
                      </div>
                    </div>                    <div className="mt-2 flex items-center justify-between border-t border-gray-700/50 pt-2">
                      <div className="flex flex-col">
                        <p className="text-[10px] text-gray-500">Valid until</p>
                        <p className="text-xs text-gray-400">{cert.validUntil}</p>
                      </div>
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium
                          bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300 
                          text-white transition-all duration-300 transform hover:scale-105 
                          hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                      >
                        Verify
                        <svg
                          className="w-3 h-3 transform transition-transform group-hover:translate-x-0.5"
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

      {/* Beam Effect */}
      <motion.div
        className="hidden lg:block absolute pointer-events-none"
        animate={{
          x: mousePosition.x - 200,
          y: mousePosition.y - 200,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
        style={{
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.03) 0%, rgba(56, 189, 248, 0.01) 40%, transparent 70%)',
          borderRadius: '50%',
          zIndex: 1
        }}
      />

      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800/50 to-gray-900 -z-10" />
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] 
        bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-teal-500/5 rounded-full blur-[120px] -z-10 animate-slowly-rotate" />
    </section>
  );
};

export default Certifications;