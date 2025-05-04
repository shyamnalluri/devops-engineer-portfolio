'use client';

import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { FaServer, FaCloud, FaCode, FaUserFriends } from 'react-icons/fa';

const achievements = [
  {
    icon: <FaServer className="w-8 h-8" />,
    count: 150,
    suffix: '+',
    title: 'Servers Managed',
    description: 'Successfully managed and maintained production servers'
  },
  {
    icon: <FaCloud className="w-8 h-8" />,
    count: 50,
    suffix: 'TB',
    title: 'Data Migrated',
    description: 'Data successfully migrated to cloud infrastructure'
  },
  {
    icon: <FaCode className="w-8 h-8" />,
    count: 99.9,
    suffix: '%',
    title: 'Uptime Achieved',
    description: 'Average uptime maintained across projects'
  },
  {
    icon: <FaUserFriends className="w-8 h-8" />,
    count: 25,
    suffix: '+',
    title: 'Clients Served',
    description: 'Successful project deliveries for clients'
  }
];

const Achievements = () => {
  return (
    <section className="py-16 pt-20 bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Achievements</h2>
          <p className="text-gray-400">Key metrics and milestones</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-900 p-6 rounded-lg text-center"
            >
              <div className="text-blue-500 mb-4 flex justify-center">
                {achievement.icon}
              </div>
              <div className="text-4xl font-bold text-white mb-2">
                <CountUp
                  end={achievement.count}
                  duration={2.5}
                  decimals={achievement.count % 1 !== 0 ? 1 : 0}
                  suffix={achievement.suffix}
                  enableScrollSpy
                  scrollSpyOnce
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-200 mb-2">
                {achievement.title}
              </h3>
              <p className="text-gray-400">{achievement.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;