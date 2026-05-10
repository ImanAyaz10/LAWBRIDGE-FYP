import React from 'react';
import { motion } from 'framer-motion';

function PageHeader({ title, subtitle }) {
  return (
    <div className="relative pt-32 pb-16 bg-emerald-950 overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        {/* Modern Emerald Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-emerald-900 to-emerald-950" />
        {/* Subtle mesh pattern or texture effect */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-white mb-4 font-poppins tracking-tight"
        >
          {title}
        </motion.h1>
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
          className="h-1 w-20 bg-emerald-400 mx-auto mb-6 rounded-full"
        />
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-emerald-400 font-medium text-lg max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      </div>
    </div>
  );
}

export default PageHeader;
