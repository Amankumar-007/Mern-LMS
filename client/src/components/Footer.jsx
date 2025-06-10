import { Facebook, Twitter, Instagram, Linkedin, Mail, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 80, damping: 12 }
    },
    hover: {
      scale: 1.05,
      boxShadow: '0 4px 24px 0 rgba(80, 80, 255, 0.15)',
      transition: { type: 'spring', stiffness: 200, damping: 10 }
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-[#1a1a2e] via-[#23234b] to-[#1a1a2e] text-white pt-20 pb-10 overflow-hidden">
      {/* Animated sparkles background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        className="absolute inset-0 pointer-events-none z-0"
      >
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.7, y: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0.7, 1.1, 1, 0.7],
              y: [0, -30, 30, 0]
            }}
            transition={{
              duration: 6 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.4
            }}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              zIndex: 0
            }}
          >
            <Sparkles className="w-6 h-6 text-blue-400/80" />
          </motion.div>
        ))}
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          <motion.div variants={itemVariants} whileHover="hover" className="transition-all">
            <h3 className="text-3xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent flex items-center gap-2">
              <Sparkles className="w-7 h-7 animate-pulse text-blue-300" /> EduLearn
            </h3>
            <motion.p className="text-gray-300" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.7 }}>
              Empowering minds through quality online education. Join millions of learners worldwide.
            </motion.p>
          </motion.div>
          <motion.div variants={itemVariants} whileHover="hover" className="transition-all">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {['About Us', 'Contact', 'Careers', 'Support'].map((item) => (
                <motion.li
                  key={item}
                  whileHover={{ x: 8, scale: 1.08, color: '#fff' }}
                  transition={{ type: 'spring', stiffness: 200, damping: 12 }}
                  className="transform transition-transform"
                >
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          <motion.div variants={itemVariants} whileHover="hover" className="transition-all">
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-3">
              {['Development', 'Business', 'Design', 'Marketing'].map((item) => (
                <motion.li
                  key={item}
                  whileHover={{ x: 8, scale: 1.08, color: '#fff' }}
                  transition={{ type: 'spring', stiffness: 200, damping: 12 }}
                  className="transform transition-transform"
                >
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          <motion.div variants={itemVariants} whileHover="hover" className="transition-all">
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4 mb-6">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ y: -8, scale: 1.18, backgroundColor: '#23234b' }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gray-800 p-2 rounded-full hover:bg-blue-700 transition-colors shadow-lg"
                >
                  <Icon className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
                </motion.a>
              ))}
            </div>
            <motion.a
              href="mailto:contact@edulearn.com"
              whileHover={{ x: 8, scale: 1.05, color: '#fff' }}
              className="flex items-center text-gray-400 hover:text-white transition-colors"
            >
              <Mail className="h-5 w-5 mr-2" />
              contact@edulearn.com
            </motion.a>
          </motion.div>
        </div>
        <motion.div
          variants={itemVariants}
          className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="tracking-wide"
          >
            &copy; 2024 EduLearn. All rights reserved.
          </motion.p>
        </motion.div>
      </motion.div>
    </footer>
  );
}