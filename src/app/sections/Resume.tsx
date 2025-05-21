'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaDownload } from 'react-icons/fa';
import Button from '../components/Button';

interface TimelineData {
  title: string;
  company?: string;
  institution?: string;
  period: string;
  description: string;
  technologies?: string[];
}

interface CertificationData {
  title: string;
  issuer: string;
  date: string;
  icon: string;
}

interface TimelineItemProps {
  data: TimelineData;
  index: number;
  isLeft: boolean;
}

const TimelineItem = ({ 
  data, 
  index, 
  isLeft 
}: TimelineItemProps) => (
  <motion.div 
    initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="relative md:flex items-center md:gap-8"
  >
    {/* Timeline line and dot - Only visible on desktop */}
    <div className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 h-full w-0.5 bg-blue-500/20" />
    <div className="hidden md:block absolute left-1/2 top-8 -translate-x-1/2 w-4 h-4 rounded-full bg-blue-500" />
    
    {/* Mobile timeline indicator */}
    <div className="md:hidden absolute left-0 top-0 bottom-0 w-0.5 bg-blue-500/20">
      <div className="absolute top-8 -left-1.5 w-3 h-3 rounded-full bg-blue-500" />
    </div>

    <div className={`w-full md:w-1/2 ${isLeft ? 'md:text-right' : ''} pl-8 md:pl-0 mb-8`}>
      <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-800 hover:border-blue-500/30 group">
        <h4 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">{data.title}</h4>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
          <span className="text-blue-400 text-sm sm:text-base">{data.company || data.institution}</span>
          <span className="text-gray-400 text-sm">{data.period}</span>
        </div>
        <p className="text-gray-300 text-sm sm:text-base mb-4">{data.description}</p>
        {data.technologies && (
          <div className={`flex flex-wrap gap-2 ${isLeft ? 'md:justify-end' : ''}`}>
            {data.technologies.map((tech, i) => (
              <span 
                key={i}
                className="px-2 py-1 text-xs rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
    <div className="hidden md:block w-1/2" />
  </motion.div>
);

const CertificationItem = ({ certification, index }: { certification: CertificationData; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-lg border border-gray-800 hover:border-blue-500/30 transition-all duration-300 group"
  >
    <div className="flex items-center gap-4">      <Image 
        src={certification.icon} 
        alt={certification.title}
        width={48}
        height={48}
        className="w-12 h-12 object-contain"
      />
      <div>
        <h4 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">{certification.title}</h4>
        <p className="text-gray-400 text-sm">{certification.issuer}</p>
        <p className="text-blue-400 text-xs mt-1">{certification.date}</p>
      </div>
    </div>
  </motion.div>
);

const Resume = () => {
  const experiences = [
    {
      title: "Senior DevOps Engineer",
      company: "Tech Solutions Inc.",
      period: "2023 - Present",
      description: "Lead DevOps practices and cloud infrastructure management, implementing CI/CD pipelines and Kubernetes orchestration.",
      technologies: ["AWS", "Kubernetes", "Terraform", "Jenkins", "Docker", "Python"]
    },
    {
      title: "DevOps Engineer",
      company: "Cloud Systems Ltd.",
      period: "2021 - 2023",
      description: "Managed AWS infrastructure and implemented Infrastructure as Code using Terraform and CloudFormation.",
      technologies: ["AWS", "Terraform", "CloudFormation", "Ansible", "Git"]
    },
    {
      title: "Systems Administrator",
      company: "Data Solutions Corp.",
      period: "2020 - 2021",
      description: "Maintained and optimized server infrastructure, implemented automation scripts, and managed backup systems.",
      technologies: ["Linux", "Python", "Shell Scripting", "VMware"]
    }
  ];

  const education = [
    {
      title: "Master of Science in Computer Science",
      institution: "Tech University",
      period: "2018 - 2020",
      description: "Specialized in Cloud Computing and Distributed Systems"
    },
    {
      title: "Bachelor of Technology in Computer Science",
      institution: "Engineering College",
      period: "2014 - 2018",
      description: "Focus on Software Engineering and System Architecture"
    }
  ];

  const certifications = [
    {
      title: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2024",
      icon: "/certifications/aws-cert.svg"
    },
    {
      title: "Azure Solutions Architect",
      issuer: "Microsoft",
      date: "2024",
      icon: "/certifications/azure-cert.svg"
    },
    {
      title: "Certified Kubernetes Administrator",
      issuer: "Cloud Native Computing Foundation",
      date: "2023",
      icon: "/certifications/kubernetes-cert.svg"
    },
    {
      title: "HashiCorp Certified: Terraform Associate",
      issuer: "HashiCorp",
      date: "2023",
      icon: "/certifications/terraform-cert.svg"
    }
  ];

  const handleDownloadResume = () => {
    // Implement resume download functionality
    window.open('/your-resume.pdf', '_blank');
  };

  return (
    <section id="resume" className="py-16 pt-20 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-gray-800/50 -z-0" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-white">Resume</h2>
            <Button 
              onClick={handleDownloadResume}
              className="flex items-center gap-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-4 py-2 rounded-lg transition-all duration-300"
            >
              <FaDownload className="w-4 h-4" />
              <span>Download CV</span>
            </Button>
          </div>
          
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-white mb-8">Work Experience</h3>
            <div className="relative">
              {experiences.map((exp, index) => (
                <TimelineItem 
                  key={index}
                  data={exp}
                  index={index}
                  isLeft={index % 2 === 0}
                />
              ))}
            </div>
          </div>

          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-white mb-8">Education</h3>
            <div className="relative">
              {education.map((edu, index) => (
                <TimelineItem 
                  key={index}
                  data={edu}
                  index={index}
                  isLeft={index % 2 === 0}
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-white mb-8">Certifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certifications.map((cert, index) => (
                <CertificationItem 
                  key={index}
                  certification={cert}
                  index={index}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
    </section>
  );
};

export default Resume;