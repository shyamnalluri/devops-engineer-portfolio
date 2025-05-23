'use client';

import { motion } from 'framer-motion';

interface ExperienceData {
  title: string;
  company?: string;
  institution?: string;
  period: string;
  description: string;
  technologies?: string[];
}

const ExperienceCard = ({ data, index }: { data: ExperienceData; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="relative"
  >
    {/* Timeline connector */}
    <div className="absolute left-[14px] top-0 h-full w-0.5 bg-gradient-to-b from-red-500 to-orange-500 opacity-70"></div>
    
    {/* Timeline dot */}
    <div className="absolute left-0 top-6 h-7 w-7 rounded-full border-2 border-red-500 bg-black flex items-center justify-center">
      <div className="h-3 w-3 rounded-full bg-gradient-to-r from-red-500 to-orange-500"></div>
    </div>
    
    <div className="pl-14 pb-12">
      <h4 className="text-xl font-semibold text-white mb-1 group-hover:text-red-400 transition-colors">
        {data.title}
      </h4>
      <div className="flex flex-wrap items-center gap-3 mb-3 text-sm">
        <span className="text-red-400 font-medium">{data.company || data.institution}</span>
        <span className="w-1.5 h-1.5 rounded-full bg-gray-600" />
        <span className="text-gray-400">{data.period}</span>
      </div>
      <p className="text-gray-300 text-base mb-4 leading-relaxed">
        {data.description}
      </p>
      {data.technologies && (
        <div className="flex flex-wrap gap-2">
          {data.technologies.map((tech, i) => (
            <span
              key={i}
              className="px-3 py-1 text-xs rounded-full bg-gray-800 text-gray-300 border border-gray-700 hover:border-red-500/30 hover:bg-gray-700 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </div>
  </motion.div>
);

const Experience = () => {
  const experiences: ExperienceData[] = [
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

  const education: ExperienceData[] = [
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

  return (
    <section id="experience" className="py-24 relative bg-black">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-0" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto space-y-24"
        >
          {/* Work Experience Section */}          <div>
            <h2 className="text-4xl font-bold text-white mb-16 relative">
              Work Experience
              <div className="absolute -bottom-4 left-0 w-20 h-1 bg-gradient-to-r from-red-500 to-orange-500"></div>
            </h2>
            <div className="ml-4">
              {experiences.map((exp, index) => (
                <ExperienceCard key={index} data={exp} index={index} />
              ))}
            </div>
          </div>

          {/* Education Section */}
          <div>
            <h2 className="text-4xl font-bold text-white mb-16 relative">
              Education
              <div className="absolute -bottom-4 left-0 w-20 h-1 bg-gradient-to-r from-red-500 to-orange-500"></div>
            </h2>
            <div className="ml-4">
              {education.map((edu, index) => (
                <ExperienceCard key={index} data={edu} index={index} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;