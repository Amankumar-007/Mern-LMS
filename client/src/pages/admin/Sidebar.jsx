import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import { motion } from "framer-motion";

const linkVariants = {
  hover: {
    x: 5,
    color: "#6366f1", // indigo-500
    transition: { duration: 0.2 },
  },
};

const Sidebar = () => {
  return (
    <div className="flex">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="hidden lg:block w-[250px] bg-white border-r border-gray-200 shadow-sm p-6 sticky top-0 h-screen"
      >
        <div className="space-y-6">
          <motion.div variants={linkVariants} whileHover="hover">
            <Link
              to="dashboard"
              className="flex items-center gap-3 text-gray-700 hover:text-indigo-500 text-base font-medium"
            >
              <ChartNoAxesColumn size={20} className="text-gray-500" />
              <h1>Dashboard</h1>
            </Link>
          </motion.div>
          <motion.div variants={linkVariants} whileHover="hover">
            <Link
              to="course"
              className="flex items-center gap-3 text-gray-700 hover:text-indigo-500 text-base font-medium"
            >
              <SquareLibrary size={20} className="text-gray-500" />
              <h1>Courses</h1>
            </Link>
          </motion.div>
        </div>
      </motion.div>
      <div className="flex-1 p-8 bg-gray-50">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;