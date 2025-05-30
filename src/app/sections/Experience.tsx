'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface ExperienceData {
  id: string;
  title: string;
  company?: string;
  institution?: string;
  period: string;
  description: string;
  technologies?: string[];
  achievements?: string[];
  type: 'work' | 'education';
  icon: string;
  phase: string; // DevOps evolution phase
}

const InteractiveTimelineCard = ({ data, index, isActive, onClick }: {
  data: ExperienceData;
  index: number;
  isActive: boolean;
  onClick: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    animate={{
      marginBottom: isActive ? '2rem' : '1rem'
    }}
    transition={{
      duration: 0.6,
      delay: index * 0.15,
      ease: [0.4, 0.0, 0.2, 1]
    }}
    layout
    className="relative cursor-pointer"
    onClick={onClick}
    id={data.id}
  >
    {/* Dynamic Timeline connector */}
    <motion.div
      className="absolute left-[23px] top-0 w-1 bg-gradient-to-b from-red-500 via-orange-500 to-blue-500 rounded-full"
      animate={{
        height: isActive ? '100%' : '60px',
        opacity: isActive ? 1 : 0.7,
        width: isActive ? '4px' : '2px'
      }}
      transition={{
        duration: 0.8,
        ease: [0.4, 0.0, 0.2, 1],
        height: { duration: 1.0 }
      }}
    />
    
    {/* Interactive Timeline Node */}
    <motion.div
      className="absolute left-0 top-3 h-10 w-10 rounded-full border-2 flex items-center justify-center cursor-pointer z-10"
      animate={{
        borderColor: isActive ? '#ef4444' : '#6b7280',
        backgroundColor: isActive ? '#1f2937' : '#111827',
        scale: isActive ? 1.15 : 1,
        boxShadow: isActive ? '0 0 20px rgba(239, 68, 68, 0.6), 0 0 40px rgba(239, 68, 68, 0.3)' : '0 0 6px rgba(107, 114, 128, 0.4)'
      }}
      whileHover={{
        scale: 1.1,
        boxShadow: '0 0 15px rgba(239, 68, 68, 0.5)'
      }}
      transition={{
        duration: 0.6,
        ease: [0.4, 0.0, 0.2, 1]
      }}
    >
      <span className="text-lg">{data.icon}</span>
    </motion.div>
    
    {/* Content Card */}
    <motion.div
      className="group"
      animate={{
        backgroundColor: isActive ? 'rgba(31, 41, 55, 0.9)' : 'transparent',
        padding: isActive ? '2rem 1.5rem 3rem 4rem' : '0.5rem 0 1.5rem 4rem',
        paddingLeft: '4rem',
        borderRadius: isActive ? '1rem' : '0.5rem',
        border: isActive ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid transparent',
        marginLeft: isActive ? '0.5rem' : '0rem',
        boxShadow: isActive ? '0 4px 20px rgba(0, 0, 0, 0.3)' : 'none'
      }}
      transition={{
        duration: 0.8,
        ease: [0.4, 0.0, 0.2, 1]
      }}
      layout
    >
      <motion.h4
        className="font-bold transition-colors cursor-pointer"
        animate={{
          color: isActive ? '#fbbf24' : '#ffffff',
          fontSize: isActive ? '1.25rem' : '1.125rem',
          marginBottom: isActive ? '0.75rem' : '0.5rem'
        }}
        transition={{
          duration: 0.6,
          ease: [0.4, 0.0, 0.2, 1]
        }}
      >
        {data.title}
      </motion.h4>

      <motion.div
        className="flex flex-wrap items-center gap-3 text-sm"
        animate={{
          marginBottom: isActive ? '1rem' : '0.5rem',
          opacity: isActive ? 1 : 0.8
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1]
        }}
      >
        <span className="text-red-400 font-medium">
          {data.company || data.institution}
        </span>
        <span className="w-1 h-1 rounded-full bg-gray-500" />
        <span className="text-gray-400 font-medium">{data.period}</span>
        <span className="w-1 h-1 rounded-full bg-gray-500" />
        <span className="text-blue-400 text-xs uppercase tracking-wide font-medium bg-blue-500/10 px-2 py-1 rounded-full border border-blue-500/20">
          {data.type}
        </span>
      </motion.div>

      {/* Description - Always visible but with different styling */}
      <motion.p
        className="text-gray-300 leading-relaxed"
        animate={{
          fontSize: isActive ? '0.95rem' : '0.875rem',
          lineHeight: isActive ? '1.6' : '1.5',
          marginBottom: isActive ? '1rem' : '0.75rem',
          opacity: isActive ? 1 : 0.9
        }}
        transition={{
          duration: 0.6,
          ease: [0.4, 0.0, 0.2, 1]
        }}
        layout
      >
        {isActive ? data.description : `${data.description.substring(0, 120)}${data.description.length > 120 ? '...' : ''}`}
      </motion.p>

      {/* Achievements (only show when active) */}
      {isActive && data.achievements && (
        <motion.div
          initial={{ opacity: 0, y: 15, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, y: -15, height: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.4, 0.0, 0.2, 1],
            delay: 0.2
          }}
          className="mb-5 p-4 rounded-lg bg-gradient-to-r from-orange-500/8 to-yellow-500/8 border border-orange-500/25 overflow-hidden"
        >
          <h5 className="text-sm font-semibold text-orange-400 mb-3 flex items-center gap-2">
            <span className="text-base">🏆</span>
            Key Achievements:
          </h5>
          <ul className="space-y-2">
            {data.achievements.map((achievement, i) => (
              <motion.li
                key={i}
                className="text-sm text-gray-300 flex items-start gap-3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.3 + (i * 0.1),
                  ease: [0.4, 0.0, 0.2, 1]
                }}
              >
                <span className="text-green-400 mt-0.5 flex-shrink-0">✓</span>
                <span className="leading-relaxed">{achievement}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Technologies - Always visible but condensed when collapsed */}
      {data.technologies && (
        <motion.div
          className="flex flex-wrap gap-2"
          animate={{
            opacity: isActive ? 1 : 0.8,
            marginBottom: isActive ? '0rem' : '0.5rem'
          }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0.0, 0.2, 1]
          }}
          layout
        >
          {(isActive ? data.technologies : data.technologies.slice(0, 4)).map((tech, i) => (
            <motion.span
              key={i}
              className="px-2.5 py-1 text-xs rounded-full border transition-all duration-300 font-medium"
              animate={{
                backgroundColor: isActive ? 'rgba(239, 68, 68, 0.12)' : 'rgba(31, 41, 55, 1)',
                borderColor: isActive ? 'rgba(239, 68, 68, 0.6)' : 'rgba(107, 114, 128, 1)',
                color: isActive ? '#fbbf24' : '#d1d5db'
              }}
              whileHover={{
                scale: 1.05,
                backgroundColor: 'rgba(239, 68, 68, 0.2)',
                borderColor: 'rgba(239, 68, 68, 0.8)'
              }}
              transition={{
                duration: 0.4,
                ease: [0.4, 0.0, 0.2, 1]
              }}
              layout
            >
              {tech}
            </motion.span>
          ))}
          {!isActive && data.technologies.length > 4 && (
            <motion.span
              className="px-2.5 py-1 text-xs rounded-full border border-gray-600 bg-gray-800 text-gray-400 font-medium"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.4,
                ease: [0.4, 0.0, 0.2, 1]
              }}
            >
              +{data.technologies.length - 4}
            </motion.span>
          )}
        </motion.div>
      )}
    </motion.div>
  </motion.div>
);

const Experience = () => {
  const [activeCard, setActiveCard] = useState<string | null>('senior-devops');
  
  const handleCardClick = (cardId: string) => {
    // If clicking on the active card, collapse it
    if (activeCard === cardId) {
      setActiveCard(null);
    } else {
      setActiveCard(cardId);
      // Smooth scroll to the clicked card
      setTimeout(() => {
        const element = document.getElementById(cardId);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'nearest'
          });
        }
      }, 100);
    }
  };

  const allExperiences: ExperienceData[] = [
    {
      id: 'senior-devops',
      title: "Senior DevOps Engineer",
      company: "Tech Solutions Inc.",
      period: "2023 - Present",
      description: "Leading enterprise-scale DevOps transformation initiatives, architecting cloud-native solutions, and mentoring development teams on best practices.",
      phase: "Optimization & Innovation",
      type: 'work',
      icon: '🚀',
      technologies: ["AWS", "Kubernetes", "Terraform", "Jenkins", "Docker", "Python", "Helm", "ArgoCD"],
      achievements: [
        "Reduced deployment time by 70% through advanced CI/CD pipeline optimization",
        "Implemented GitOps workflows serving 50+ microservices",
        "Led cloud migration reducing infrastructure costs by 40%",
        "Mentored 5 junior engineers in DevOps practices"
      ]
    },
    {
      id: 'devops-engineer',
      title: "DevOps Engineer",
      company: "Cloud Systems Ltd.",
      period: "2021 - 2023",
      description: "Spearheaded Infrastructure as Code initiatives and automated deployment pipelines across multiple cloud environments.",
      phase: "Automation & Scaling",
      type: 'work',
      icon: '⚙️',
      technologies: ["AWS", "Terraform", "CloudFormation", "Ansible", "Git", "Prometheus", "Grafana"],
      achievements: [
        "Automated 90% of infrastructure provisioning using Terraform",
        "Implemented comprehensive monitoring reducing downtime by 60%",
        "Standardized deployment processes across 10+ applications",
        "Achieved 99.9% uptime SLA for critical services"
      ]
    },
    {
      id: 'systems-admin',
      title: "Systems Administrator",
      company: "Data Solutions Corp.",
      period: "2020 - 2021",
      description: "Foundation building phase focusing on system reliability, automation scripting, and infrastructure management fundamentals.",
      phase: "Foundation & Learning",
      type: 'work',
      icon: '🔧',
      technologies: ["Linux", "Python", "Shell Scripting", "VMware", "Docker", "Git"],
      achievements: [
        "Automated backup systems reducing manual effort by 80%",
        "Improved server performance through optimization techniques",
        "Implemented monitoring solutions for 20+ servers",
        "Created documentation standards for team processes"
      ]
    },
    {
      id: 'msc-cs',
      title: "Master of Science in Computer Science",
      institution: "Tech University",
      period: "2018 - 2020",
      description: "Advanced studies in Cloud Computing, Distributed Systems, and Software Architecture with focus on scalable system design.",
      phase: "Academic Excellence",
      type: 'education',
      icon: '🎓',
      achievements: [
        "Thesis: 'Microservices Architecture Patterns for Cloud-Native Applications'",
        "Research published in IEEE Cloud Computing Conference",
        "Teaching Assistant for DevOps and Cloud Computing courses",
        "GPA: 3.8/4.0"
      ]
    },
    {
      id: 'btech-cs',
      title: "Bachelor of Technology in Computer Science",
      institution: "Engineering College",
      period: "2014 - 2018",
      description: "Comprehensive foundation in Computer Science with emphasis on Software Engineering, System Architecture, and Programming.",
      phase: "Core Learning",
      type: 'education',
      icon: '📚',
      achievements: [
        "Graduated Magna Cum Laude with 3.7/4.0 GPA",
        "Led final year project on 'Automated Deployment Systems'",
        "Active member of Computer Science Society",
        "Internship at local tech startup focusing on web development"
      ]
    }
  ];

  const workExperiences = allExperiences.filter(exp => exp.type === 'work');
  const educationExperiences = allExperiences.filter(exp => exp.type === 'education');

  return (
    <section id="experience" className="py-16 relative bg-black overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-0" />
      <div className="absolute right-0 bottom-0 w-[300px] h-[300px] bg-gradient-to-tr from-orange-500 to-red-500 opacity-10 rounded-full -z-0 blur-3xl" />
      <div className="absolute left-0 top-0 w-[300px] h-[300px] bg-gradient-to-br from-blue-500 to-purple-500 opacity-10 rounded-full -z-0 blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-12">
            <motion.h2
              className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent mb-2"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              Experience & Education
            </motion.h2>
            <motion.p
              className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              A visual journey through my DevOps evolution
              <span className="text-orange-400 font-semibold"> Click timeline nodes to expand details</span>
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-2 gap-20 xl:gap-24">
            {/* Professional Experience */}
            <motion.div
              className="space-y-8"
              layout
              transition={{
                duration: 0.6,
                ease: [0.4, 0.0, 0.2, 1]
              }}
            >
              <motion.h3
                className="text-3xl font-bold text-white mb-10 relative"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                Professional Journey
                <div className="absolute -bottom-4 left-0 w-28 h-1.5 bg-gradient-to-r from-red-500 to-orange-500 rounded-full" />
                <div className="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full" />
              </motion.h3>

              <div className="relative">
                {/* Background timeline */}
                <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-600 to-gray-800 rounded-full" />
                {workExperiences.map((exp, index) => (
                  <InteractiveTimelineCard
                    key={exp.id}
                    data={exp}
                    index={index}
                    isActive={activeCard === exp.id}
                    onClick={() => handleCardClick(exp.id)}
                  />
                ))}
              </div>
            </motion.div>

            {/* Educational Background */}
            <motion.div
              className="space-y-8"
              layout
              transition={{
                duration: 0.6,
                ease: [0.4, 0.0, 0.2, 1]
              }}
            >
              <motion.h3
                className="text-3xl font-bold text-white mb-16 relative"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                Educational Foundation
                <div className="absolute -bottom-4 left-0 w-28 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                <div className="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
              </motion.h3>

              <div className="relative">
                {/* Background timeline */}
                <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-600 to-gray-800 rounded-full" />
                {educationExperiences.map((exp, index) => (
                  <InteractiveTimelineCard
                    key={exp.id}
                    data={exp}
                    index={index + workExperiences.length}
                    isActive={activeCard === exp.id}
                    onClick={() => handleCardClick(exp.id)}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;