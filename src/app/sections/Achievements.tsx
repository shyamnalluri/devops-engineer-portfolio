'use client';

import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { FaServer, FaCloud, FaCode, FaUserFriends } from 'react-icons/fa';

const achievements = [
  {
    icon: <FaServer className="w-6 h-6 sm:w-8 sm:h-8" />,
    count: 150,
    suffix: '+',
    title: 'Servers Managed',
    description: 'Successfully managed and maintained production servers'
  },
  {
    icon: <FaCloud className="w-6 h-6 sm:w-8 sm:h-8" />,
    count: 50,
    suffix: 'TB',
    title: 'Data Migrated',
    description: 'Data successfully migrated to cloud infrastructure'
  },
  {
    icon: <FaCode className="w-6 h-6 sm:w-8 sm:h-8" />,
    count: 99.9,
    suffix: '%',
    title: 'Uptime Achieved',
    description: 'Average uptime maintained across projects'
  },
  {
    icon: <FaUserFriends className="w-6 h-6 sm:w-8 sm:h-8" />,
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
          className="text-center mb-12"        >
          <div className="w-full flex flex-col items-center">
            <h2 className="text-mobile-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent mb-2 sm:mb-4">
              Achievements
            </h2>
            {/* Full-width decorative underline */}
            <div className="w-full max-w-xs sm:max-w-md lg:max-w-lg h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent rounded-full mb-2 sm:mb-4"></div>
          </div>
          <p className="text-mobile-lg sm:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-2">
            Key metrics and milestones
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-900 p-6 rounded-lg text-center shadow-lg hover:shadow-xl transition-all"
            >
              <div className="text-blue-500 mb-4 flex justify-center">
                {achievement.icon}
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                <CountUp
                  end={achievement.count}
                  duration={2.5}
                  decimals={achievement.count % 1 !== 0 ? 1 : 0}
                  suffix={achievement.suffix}
                  enableScrollSpy
                  scrollSpyOnce
                />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-200 mb-2">
                {achievement.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-400">{achievement.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;