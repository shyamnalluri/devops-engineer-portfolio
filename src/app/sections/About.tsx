'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const About = () => {
  return (<section id="about" className="min-h-screen flex items-center bg-black py-12 relative overflow-hidden">
    {/* Background effects */}
    <div className="absolute inset-0 bg-grid-white/[0.02] -z-0" />
    <div className="absolute right-0 bottom-0 w-[300px] h-[300px] bg-gradient-to-tr from-orange-500 to-red-500 opacity-10 rounded-full -z-0 blur-3xl" />
    <div className="absolute left-0 top-0 w-[300px] h-[300px] bg-gradient-to-br from-blue-500 to-purple-500 opacity-10 rounded-full -z-0 blur-3xl" />
    <div className="container mx-auto px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto"
      >          <h2 className="text-5xl font-bold mb-4 text-center text-white">
          <span className="relative">
            About Me
            <motion.div
              className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-red-500"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            />
          </span>
        </h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="p-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Add decorative image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative hidden md:block"
            >
              <div className="relative w-full h-[500px]">
                <div className="absolute top-10 left-10 w-[280px] h-[280px] rounded-full bg-orange-500/20 animate-pulse-slow" />
                <div className="absolute bottom-10 right-10 w-[220px] h-[220px] rounded-full bg-purple-500/20 animate-pulse-slow" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-[320px] h-[400px] overflow-hidden border-[8px] border-gray-800 bg-gray-900 shadow-xl transform rotate-3">
                    <Image
                      src="/images/profile.jpg"
                      alt="Shyam Nalluri"
                      fill
                      className="object-cover"
                      style={{ objectFit: 'cover', objectPosition: 'center' }}
                    />
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-red-500"></div>
                  <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-red-500"></div>
                </div>
              </div>
            </motion.div>              {/* About Text Column */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="space-y-6"
            >                <div className="prose prose-lg max-w-none prose-invert">
                <p className="text-gray-300 text-lg leading-relaxed first-letter:text-3xl first-letter:font-bold first-letter:text-red-500 first-letter:mr-1">
                  I&apos;m a passionate DevOps Engineer with 5 years of experience streamlining
                  development processes and optimizing infrastructure. My expertise lies in
                  bridging the gap between development and operations, creating robust,
                  scalable, and highly available systems that empower development teams.
                </p>
                <p className="text-gray-400 text-lg leading-relaxed">
                  My approach combines automation with security best practices.
                  I&apos;ve helped organizations reduce deployment time by <span className="text-red-500 font-semibold">75%</span> through
                  implementing efficient CI/CD pipelines and infrastructure as code solutions. Every project is an
                  opportunity to improve reliability and accelerate software delivery.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  </section>
  );
};

export default About;