'use client';

import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

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
}) => {
  const { ref, isVisible } = useScrollAnimation();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      ref={ref}
      className={`relative cursor-pointer transition-all duration-500 group ${
        isActive ? 'mb-8' : 'mb-4'
      } ${
        isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-8'
      }`}
      style={{ 
        animationDelay: `${index * 150}ms`,
        minHeight: isActive ? 'auto' : '80px'
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      id={data.id}
    >
      {/* Dynamic Timeline connector */}
      <div
        className={`absolute left-[23px] top-0 bg-gradient-to-b from-red-500 via-orange-500 to-blue-500 rounded-full transition-all duration-500 ease-spring ${
          isActive ? 'w-1 h-full opacity-100' : 'w-0.5 h-16 opacity-70'
        }`}
      />

      {/* Interactive Timeline Node */}
      <div
        className={`absolute left-0 top-3 h-10 w-10 rounded-full border-2 flex items-center justify-center cursor-pointer z-10 transition-all duration-500 ease-spring ${
          isActive 
            ? 'border-red-500 bg-gray-800 scale-115 shadow-glow-red' 
            : 'border-gray-500 bg-gray-900 scale-100 shadow-subtle'
        } ${
          isHovered && !isActive ? 'scale-110 shadow-glow-red-soft' : ''
        }`}
      >
        <span 
          className={`text-lg transition-transform duration-300 ${
            isActive ? 'scale-110' : 'scale-100'
          }`}
        >
          {data.icon}
        </span>
      </div>

      {/* Content Card */}
      <div
        className={`group transition-all duration-600 ease-spring ${
          isActive 
            ? 'bg-gray-800/90 p-8 pr-6 pl-16 rounded-xl border border-red-500/40 ml-2 shadow-glow-subtle backdrop-blur-sm' 
            : 'bg-transparent p-2 pr-0 pl-16 rounded-lg border border-transparent ml-0'
        }`}
      >
        <h4
          className={`font-bold transition-all duration-600 ease-spring cursor-pointer ${
            isActive 
              ? 'text-amber-400 text-xl mb-3' 
              : 'text-white text-lg mb-2'
          }`}
        >
          {data.title}
        </h4>

        <div
          className={`flex flex-wrap items-center gap-3 text-sm transition-all duration-500 ease-spring ${
            isActive ? 'mb-4 opacity-100' : 'mb-2 opacity-80'
          }`}
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
        </div>

        {/* Description */}
        <p
          className={`text-gray-300 leading-relaxed transition-all duration-500 ease-spring ${
            isActive 
              ? 'text-base leading-relaxed mb-5 opacity-100' 
              : 'text-sm leading-normal mb-3 opacity-90'
          }`}
        >
          {isActive ? data.description : `${data.description.substring(0, 120)}${data.description.length > 120 ? '...' : ''}`}
        </p>

        {/* Achievements (only show when active) */}
        {isActive && data.achievements && (
          <div
            className={`p-4 rounded-lg bg-gradient-to-r from-orange-500/8 to-yellow-500/8 border border-orange-500/25 mb-5 overflow-hidden transition-all duration-600 ease-spring animate-fade-in`}
            style={{ animationDelay: '100ms' }}
          >
            <h5 className="text-sm font-semibold text-orange-400 mb-3 flex items-center gap-2 animate-slide-up" style={{ animationDelay: '200ms' }}>
              <span className="text-base">🏆</span>
              Key Achievements:
            </h5>
            <ul className="space-y-2">
              {data.achievements.map((achievement, i) => (
                <li
                  key={i}
                  className="text-sm text-gray-300 flex items-start gap-3 animate-slide-up"
                  style={{ animationDelay: `${300 + (i * 50)}ms` }}
                >
                  <span className="text-green-400 mt-0.5 flex-shrink-0">✓</span>
                  <span className="leading-relaxed">{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Technologies */}
        {data.technologies && (
          <div className={`flex flex-wrap gap-2 transition-opacity duration-400 ${isActive ? 'opacity-100' : 'opacity-80'}`}>
            {(isActive ? data.technologies : data.technologies.slice(0, 4)).map((tech, i) => (
              <span
                key={tech}
                className={`px-2.5 py-1 text-xs rounded-full border transition-all duration-300 font-medium hover:scale-105 ${
                  isActive 
                    ? 'bg-red-500/12 border-red-500/60 text-amber-400 hover:bg-red-500/20 hover:border-red-500/80' 
                    : 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-red-500/12 hover:border-red-500/60'
                } animate-scale-in`}
                style={{ animationDelay: `${isActive ? 100 + (i * 30) : 0}ms` }}
              >
                {tech}
              </span>
            ))}
            {!isActive && data.technologies.length > 4 && (
              <span className="px-2.5 py-1 text-xs rounded-full border border-gray-600 bg-gray-800 text-gray-400 font-medium animate-scale-in">
                +{data.technologies.length - 4}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const Experience = () => {
  const [activeCard, setActiveCard] = useState<string | null>('senior-devops');
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: workRef, isVisible: workVisible } = useScrollAnimation();
  const { ref: educationRef, isVisible: educationVisible } = useScrollAnimation();

  const handleCardClick = (cardId: string) => {
    // If clicking on the active card, collapse it
    if (activeCard === cardId) {
      setActiveCard(null);
    } else {
      setActiveCard(cardId);
      // Smooth scroll to the clicked card with reduced delay
      setTimeout(() => {
        const element = document.getElementById(cardId);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'nearest'
          });
        }
      }, 50);
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
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div 
            ref={headerRef}
            className={`text-center mb-12 transition-all duration-800 ${
              headerVisible ? 'animate-fade-in' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className={`text-5xl md:text-6xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent mb-2 ${
              headerVisible ? 'animate-hero-title' : ''
            }`}>
              Experience & Education
            </h2>
            <p className={`text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed ${
              headerVisible ? 'animate-hero-subtitle' : ''
            }`}>
              A visual journey through my DevOps evolution
              <span className="text-orange-400 font-semibold"> Click timeline nodes to expand details</span>
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-20 xl:gap-24">
            {/* Professional Experience */}
            <div 
              ref={workRef}
              className={`space-y-4 transition-all duration-800 ${
                workVisible ? 'animate-slide-up' : 'opacity-0 translate-y-8'
              }`}
              style={{ animationDelay: '200ms' }}
            >
              <h3 className="text-3xl font-bold text-white mb-10 relative">
                Professional Journey
                <div className="absolute -bottom-4 left-0 w-28 h-1.5 bg-gradient-to-r from-red-500 to-orange-500 rounded-full animate-scale-in" style={{ animationDelay: '400ms' }} />
                <div className="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full animate-scale-in" style={{ animationDelay: '500ms' }} />
              </h3>

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
            </div>

            {/* Educational Background */}
            <div 
              ref={educationRef}
              className={`space-y-4 transition-all duration-800 ${
                educationVisible ? 'animate-slide-up' : 'opacity-0 translate-y-8'
              }`}
              style={{ animationDelay: '400ms' }}
            >
              <h3 className="text-3xl font-bold text-white mb-16 relative">
                Educational Foundation
                <div className="absolute -bottom-4 left-0 w-28 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-scale-in" style={{ animationDelay: '600ms' }} />
                <div className="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-scale-in" style={{ animationDelay: '700ms' }} />
              </h3>

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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
