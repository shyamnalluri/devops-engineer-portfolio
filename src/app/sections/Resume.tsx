'use client';

import { motion } from 'framer-motion';

interface TimelineData {
  title: string;
  company?: string;
  institution?: string;
  period: string;
  description: string;
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
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
        <h4 className="text-xl font-semibold text-white mb-2">{data.title}</h4>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
          <span className="text-blue-400 text-sm sm:text-base">{data.company || data.institution}</span>
          <span className="text-gray-400 text-sm">{data.period}</span>
        </div>
        <p className="text-gray-300 text-sm sm:text-base">{data.description}</p>
      </div>
    </div>
    <div className="hidden md:block w-1/2" />
  </motion.div>
);

const Resume = () => {
  const experiences = [
    {
      title: "Senior DevOps Engineer",
      company: "Tech Solutions Inc.",
      period: "2023 - Present",
      description: "Lead DevOps practices and cloud infrastructure management, implementing CI/CD pipelines and Kubernetes orchestration."
    },
    {
      title: "DevOps Engineer",
      company: "Cloud Systems Ltd.",
      period: "2021 - 2023",
      description: "Managed AWS infrastructure and implemented Infrastructure as Code using Terraform and CloudFormation."
    },
    {
      title: "Systems Administrator",
      company: "Data Solutions Corp.",
      period: "2020 - 2021",
      description: "Maintained and optimized server infrastructure, implemented automation scripts, and managed backup systems."
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

  return (
    <section id="resume" className="py-16 pt-20 bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Resume</h2>
          
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-white mb-8 text-center">Work Experience</h3>
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

          <div>
            <h3 className="text-2xl font-semibold text-white mb-8 text-center">Education</h3>
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
        </motion.div>
      </div>
    </section>
  );
};

export default Resume;