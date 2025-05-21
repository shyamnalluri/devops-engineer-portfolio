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

const ExperienceCard = ({ data }: { data: ExperienceData }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="group relative bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-900/80 rounded-xl p-6 backdrop-blur-sm border border-gray-800/50 hover:border-blue-500/30 transition-all duration-500"
  >
    {/* Glowing effect on hover */}
    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:via-blue-500/10 group-hover:to-blue-500/5 transition-all duration-500" />
    
    <div className="relative">
      <h4 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
        {data.title}
      </h4>
      <div className="flex flex-wrap items-center gap-3 mb-4 text-sm">
        <span className="text-blue-400 font-medium">{data.company || data.institution}</span>
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
              className="px-3 py-1 text-sm rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 transition-colors"
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
    <section id="experience" className="py-20 relative bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-gray-800/50 -z-0" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}          className="max-w-6xl mx-auto space-y-16"
        >
          {/* Work Experience Section */}
          <div>
            <h2 className="text-4xl font-bold text-center mb-16">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 text-transparent bg-clip-text">
                Work Experience
              </span>
            </h2>
            <div className="grid gap-6">
              {experiences.map((exp, index) => (
                <ExperienceCard key={index} data={exp} />
              ))}
            </div>
          </div>

          {/* Education Section */}
          <div>
            <h2 className="text-4xl font-bold text-center mb-16">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 text-transparent bg-clip-text">
                Education
              </span>
            </h2>
            <div className="grid gap-6">
              {education.map((edu, index) => (
                <ExperienceCard key={index} data={edu} />
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

export default Experience;