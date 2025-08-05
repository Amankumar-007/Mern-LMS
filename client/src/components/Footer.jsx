import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-blue-600 text-white-800 pt-12 pb-8 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
          {/* Brand Column */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-semibold text-white-900 mb-3">EduLearn</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Quality education for everyone, everywhere.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <h4 className="text-xs font-medium uppercase tracking-wider text-white-500 mb-3">Resources</h4>
            <ul className="space-y-2">
              {['About', 'Courses', 'Pricing', 'Blog'].map((item, index) => (
                <motion.li key={index} whileHover={{ x: 2 }}>
                  <a href="#" className="text-white-600 hover:text-white-900 text-sm transition-colors">
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <h4 className="text-xl font-medium uppercase tracking-wider text-white-500 mb-3">Support</h4>
            <ul className="space-y-2">
              {['Help Center', 'Contact', 'Privacy', 'Terms'].map((item, index) => (
                <motion.li key={index} whileHover={{ x: 2 }}>
                  <a href="#" className="text-white-600 hover:text-white-900 text-sm transition-colors">
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="space-y-3"
          >
            <h4 className="text-xl font-medium uppercase tracking-wider text-white-500">Connect</h4>
            <div className="flex space-x-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-1.5 rounded-full bg-gray-50 hover:bg-white-100 transition-colors"
                >
                  <Icon className="h-3.5 w-3.5 text-white-500 hover:text-white-700 transition-colors" />
                </motion.a>
              ))}
            </div>
            <motion.a
              href="mailto:contact@edulearn.com"
              whileHover={{ x: 2 }}
              className="flex items-center text-white-600 hover:text-white-900 text-xl transition-colors mt-2"
            >
              <Mail className="h-3.5 w-3.5 mr-1.5" />
              contact@edulearn.com
            </motion.a>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="border-t border-white-100 mt-8 pt-6 text-center"
        >
          <p className="text-xl text-white-400">
            &copy; {new Date().getFullYear()} EduLearn. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}