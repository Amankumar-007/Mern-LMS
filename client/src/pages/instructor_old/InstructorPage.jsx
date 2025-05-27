import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Users, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

const instructorPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/register");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const stats = [
    {
      icon: <Users className="w-6 h-6 text-primary" />,
      value: "50M+",
      label: "Students Worldwide",
    },
    {
      icon: <BookOpen className="w-6 h-6 text-primary" />,
      value: "12K+",
      label: "Active Courses",
    },
    {
      icon: <Trophy className="w-6 h-6 text-primary" />,
      value: "$50M+",
      label: "Instructor Earnings",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background to-background" />
        
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 relative"
        >
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm mb-6"
            >
              <GraduationCap className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Join Our Teaching Community</span>
            </motion.div>
            
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent mb-6"
            >
              Transform Lives Through Teaching
            </motion.h1>
            
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed"
            >
              Share your expertise with millions of students worldwide. Create engaging courses
              and build your teaching career on our platform.
            </motion.p>

            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={handleClick}
                className="px-8 py-6 text-lg bg-gradient-to-r from-primary via-primary/90 to-primary/80 hover:from-primary/90 hover:via-primary/80 hover:to-primary/70 shadow-xl shadow-primary/20"
              >
                Start Teaching Today
              </Button>
            </motion.div>
          </div>

          {/* Stats Section */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-card/50 backdrop-blur-sm p-8 rounded-2xl border border-border/50"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Features Grid */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Share Your Knowledge",
              description: "Create engaging video courses and help students learn new skills.",
              image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071"
            },
            {
              title: "Earn Money Teaching",
              description: "Get paid for every student who enrolls in your courses.",
              image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070"
            },
            {
              title: "Join Global Community",
              description: "Connect with other instructors and share teaching experiences.",
              image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * index }}
              className="group relative overflow-hidden rounded-2xl"
            >
              <div className="absolute inset-0">
                <img 
                  src={feature.image} 
                  alt={feature.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
              </div>
              <div className="relative p-8 h-full flex flex-col justify-end min-h-[320px]">
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default instructorPage;