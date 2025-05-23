'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaCalendarAlt, FaArrowRight, FaRegClock } from 'react-icons/fa';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  url: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Future of Digital Product Design",
    excerpt: "Exploring emerging trends in product design and what they mean for designers and users alike.",
    date: "May 12, 2023",
    readTime: "6 min read",
    category: "Design Trends",
    image: "/projects/blog-1.jpg",
    url: "#"
  },
  {
    id: 2,
    title: "User Research Techniques for Better Products",
    excerpt: "Effective research methods that help you understand your users and create products they'll love.",
    date: "April 28, 2023",
    readTime: "8 min read",
    category: "User Research",
    image: "/projects/blog-2.jpg",
    url: "#"
  },
  {
    id: 3,
    title: "Color Psychology in UI Design",
    excerpt: "How color choices impact user perception and behavior, and how to use this knowledge in your designs.",
    date: "April 15, 2023",
    readTime: "5 min read",
    category: "UI Design",
    image: "/projects/blog-3.jpg",
    url: "#"
  },
  {
    id: 4,
    title: "Building Design Systems That Scale",
    excerpt: "Best practices for creating robust design systems that grow with your product and team.",
    date: "March 30, 2023",
    readTime: "7 min read",
    category: "Design Systems",
    image: "/projects/blog-4.jpg",
    url: "#"
  }
];

const Blogs = () => {
  const [featuredPost] = useState<BlogPost>(blogPosts[0]);
  const [otherPosts] = useState<BlogPost[]>(blogPosts.slice(1));

  return (
    <section id="blogs" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4">
            <span className="relative">
              My Blog
              <motion.div 
                className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-pink-500"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              />
            </span>
          </h2>
          <p className="text-gray-700 text-xl max-w-3xl mx-auto">
            Thoughts, insights, and perspectives on design, user experience, and product development.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Featured Post */}
          <motion.div
            className="lg:col-span-2 bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="relative h-80 overflow-hidden">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4">
                <span className="inline-block px-3 py-1 bg-black text-white text-sm font-medium">
                  Featured
                </span>
              </div>
            </div>
            <div className="p-8">
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                <span className="flex items-center">
                  <FaCalendarAlt className="mr-2" size={14} />
                  {featuredPost.date}
                </span>
                <span className="flex items-center">
                  <FaRegClock className="mr-2" size={14} />
                  {featuredPost.readTime}
                </span>
                <span className="bg-gray-100 px-3 py-1 rounded-full">
                  {featuredPost.category}
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-3 hover:text-orange-500 transition-colors duration-300">
                <a href={featuredPost.url}>{featuredPost.title}</a>
              </h3>
              <p className="text-gray-600 mb-4">
                {featuredPost.excerpt}
              </p>
              <a
                href={featuredPost.url}
                className="inline-flex items-center text-black font-medium hover:text-orange-500 transition-colors duration-300"
              >
                Read More <FaArrowRight className="ml-2" size={14} />
              </a>
            </div>
          </motion.div>

          {/* Other Posts */}
          <div className="lg:col-span-1 space-y-8">
            {otherPosts.slice(0, 2).map((post, index) => (
              <motion.div
                key={post.id}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 text-xs text-gray-600 mb-2">
                    <span className="flex items-center">
                      <FaCalendarAlt className="mr-1" size={12} />
                      {post.date}
                    </span>
                    <span className="bg-gray-100 px-2 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 hover:text-orange-500 transition-colors duration-300 flex-grow">
                    <a href={post.url}>{post.title}</a>
                  </h3>
                  <a
                    href={post.url}
                    className="inline-flex items-center text-black font-medium hover:text-orange-500 transition-colors duration-300 mt-2"
                  >
                    Read More <FaArrowRight className="ml-2" size={12} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Additional Posts Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherPosts.slice(2).map((post, index) => (
            <motion.div
              key={post.id}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="h-56 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <span className="flex items-center">
                    <FaCalendarAlt className="mr-2" size={14} />
                    {post.date}
                  </span>
                  <span className="bg-gray-100 px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3 hover:text-orange-500 transition-colors duration-300">
                  <a href={post.url}>{post.title}</a>
                </h3>
                <p className="text-gray-600 mb-4">
                  {post.excerpt}
                </p>
                <a
                  href={post.url}
                  className="inline-flex items-center text-black font-medium hover:text-orange-500 transition-colors duration-300"
                >
                  Read More <FaArrowRight className="ml-2" size={14} />
                </a>
              </div>
            </motion.div>
          ))}
          
          <motion.div
            className="bg-gradient-to-br from-orange-100 to-pink-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center p-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div>
              <h3 className="text-2xl font-bold mb-4">Want to read more?</h3>
              <p className="text-gray-700 mb-6">Check out all my articles on design, user experience, and product development.</p>
              <a
                href="/blog"
                className="inline-flex items-center justify-center bg-black text-white px-6 py-3 text-sm font-medium hover:bg-gray-800 transition-all"
              >
                View All Posts
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Blogs;
