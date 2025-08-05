import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Course from "../pages/student/Course";
import { useGetPublishedCourseQuery } from "@/features/api/courseApi";
import { Link } from "react-router-dom";

const CourseShowcase = () => {
  const { data, isLoading, isError } = useGetPublishedCourseQuery();

  if (isError) return <h1>Unable to load featured courses.</h1>;

  // Limit to 4 courses
  const limitedCourses = data?.courses?.slice(0, 4) || [];

  return (
    <section className="bg-white dark:bg-[#0e0e0e] py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Courses</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => <CourseSkeleton key={i} />)
            : limitedCourses.map((course, i) => (
                <Course key={i} course={course} />
              ))}
        </div>

        {/* Show More Button */}
        <div className="mt-10 flex justify-center">
          <Link
            to="/courses"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition"
          >
            Show More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CourseShowcase;

const CourseSkeleton = () => {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden">
      <Skeleton className="w-full h-36" />
      <div className="px-5 py-4 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  );
};
