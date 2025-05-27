import React from "react";
import { useLoadUserQuery } from "@/features/api/authApi";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { BookOpen, PlayCircle } from "lucide-react";

const MyLearning = () => {
  const { data, isLoading } = useLoadUserQuery();
  const navigate = useNavigate();
  const myLearning = data?.user.enrolledCourses || [];

  const handleContinueLearning = (courseId) => {
    navigate(`/course-progress/${courseId}`);
  };

  return (
    <div className="max-w-7xl mx-auto my-10 px-4 md:px-6 lg:px-8">
      <h1 className="font-bold text-3xl mb-6">My Learning</h1>
      <div className="my-5">
        {isLoading ? (
          <MyLearningSkeleton />
        ) : myLearning.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              No courses yet
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              You haven't enrolled in any courses yet.
            </p>
            <Button
              className="mt-4"
              onClick={() => navigate("/courses")}
            >
              Browse Courses
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myLearning.map((course) => (
              <Card
                key={course._id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <CardHeader className="p-0">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-xl mb-2">{course.title}</CardTitle>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Progress</span>
                      <span>{course.progress || 0}%</span>
                    </div>
                    <Progress value={course.progress || 0} className="h-2" />
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <PlayCircle className="h-4 w-4" />
                      <span>{course.lectures?.length || 0} lectures</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button
                    className="w-full"
                    onClick={() => handleContinueLearning(course._id)}
                  >
                    Continue Learning
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLearning;

// Skeleton component for loading state
const MyLearningSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[...Array(3)].map((_, index) => (
      <Card key={index} className="overflow-hidden">
        <div className="w-full h-48 bg-gray-200 animate-pulse" />
        <CardContent className="p-4 space-y-3">
          <div className="h-6 bg-gray-200 rounded animate-pulse" />
          <div className="space-y-2">
            <div className="flex justify-between">
              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="h-2 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <div className="w-full h-9 bg-gray-200 rounded animate-pulse" />
        </CardFooter>
      </Card>
    ))}
  </div>
);
