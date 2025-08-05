import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import Course from "./Course";
import { useGetPublishedCourseQuery } from "@/features/api/courseApi";
import { motion, AnimatePresence } from "framer-motion";

const Courses = () => {
  const { data, isLoading, isError } = useGetPublishedCourseQuery();

  if (isError) return <h1 className="text-center text-red-500 text-2xl mt-10">Some error occurred while fetching courses.</h1>;

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-[#1a1a1a] dark:to-[#141414] min-h-screen">
      <div className="max-w-7xl mx-auto p-6 lg:p-8">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-bold text-4xl text-center mb-12 text-gray-800 dark:text-gray-100"
        >
          Our Courses
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <AnimatePresence>
            {isLoading ? (
              Array.from({ length: 8 }).map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <CourseSkeleton />
                </motion.div>
              ))
            ) : (
              data?.courses && data.courses.map((course, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Course course={course} />
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Courses;

const CourseSkeleton = () => {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl overflow-hidden"
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2 }}
    >
      <Skeleton className="w-full h-48 bg-gray-200 dark:bg-gray-700" />
      <div className="p-6 space-y-4">
        <Skeleton className="h-7 w-4/5 bg-gray-200 dark:bg-gray-700" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Skeleton className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-5 w-24 bg-gray-200 dark:bg-gray-700" />
          </div>
          <Skeleton className="h-5 w-20 bg-gray-200 dark:bg-gray-700" />
        </div>
        <Skeleton className="h-5 w-1/3 bg-gray-200 dark:bg-gray-700" />
      </div>
    </motion.div>
  );
};