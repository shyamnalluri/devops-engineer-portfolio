'use client';

import { motion, AnimatePresence } from 'framer-motion';
import OptimizedImage from '../components/OptimizedImage';

interface Certification {
  name: string;
  credentialId: string;
  credentialUrl: string;
  logo: string;
  issuer: string;
  issueDate: string;
}

const certifications: Certification[] = [
  {
    name: "AWS Certified Solutions Architect - Associate",
    credentialId: "AWS-SAA-PLACEHOLDER",
    credentialUrl: "https://aws.amazon.com/certification/certified-solutions-architect-associate/",
    logo: "/certifications/aws-cert.svg",
    issuer: "Amazon Web Services",
    issueDate: "2025"
  },
  {
    name: "Microsoft Azure Administrator Associate",
    credentialId: "AZ-104-PLACEHOLDER",
    credentialUrl: "https://learn.microsoft.com/en-us/credentials/certifications/azure-administrator/",
    logo: "/certifications/azure-cert.svg",
    issuer: "Microsoft",
    issueDate: "2025"
  },
  {
    name: "Certified Kubernetes Administrator (CKA)",
    credentialId: "CKA-PLACEHOLDER",
    credentialUrl: "https://www.cncf.io/certification/cka/",
    logo: "/certifications/kubernetes-cert.svg",
    issuer: "Cloud Native Computing Foundation",
    issueDate: "2025"
  },
  {
    name: "HashiCorp Certified: Terraform Associate",
    credentialId: "TERRAFORM-PLACEHOLDER",
    credentialUrl: "https://www.hashicorp.com/certification/terraform-associate",
    logo: "/certifications/terraform-cert.svg",
    issuer: "HashiCorp",
    issueDate: "2025"
  }
];

const Certifications = () => {
  return (
    <section id="certifications" className="py-16 pt-20 bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Certifications</h2>
          <p className="text-gray-400">Professional Certifications & Achievements</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {certifications.map((cert) => (
              <motion.div
                key={cert.credentialId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1"
              >
                <div className="p-6">
                  <div className="flex items-center justify-center mb-4">
                    <OptimizedImage
                      src={cert.logo}
                      alt={`${cert.name} logo`}
                      width={120}
                      height={120}
                      className="w-24 h-24 object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 text-center">
                    {cert.name}
                  </h3>
                  <div className="text-center mb-4">
                    <p className="text-gray-400">
                      {cert.issuer} • {cert.issueDate}
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium transition duration-300"
                    >
                      Verify Credential
                    </a>
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