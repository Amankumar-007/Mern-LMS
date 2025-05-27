import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  useCompleteCourseMutation,
  useGetCourseProgressQuery,
  useInCompleteCourseMutation,
  useUpdateLectureProgressMutation,
} from "@/features/api/courseProgressApi";
import { CheckCircle, CirclePlay, BookOpen, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import ReactPlayer from "react-player";

const CourseProgress = () => {
  const params = useParams();
  const courseId = params.courseId;
  const { data, isLoading, isError, refetch } = useGetCourseProgressQuery(courseId);

  const [updateLectureProgress] = useUpdateLectureProgressMutation();
  const [completeCourse, { data: markCompleteData, isSuccess: completedSuccess }] = useCompleteCourseMutation();
  const [inCompleteCourse, { data: markInCompleteData, isSuccess: inCompletedSuccess }] = useInCompleteCourseMutation();
  const [currentLecture, setCurrentLecture] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  useEffect(() => {
    if (completedSuccess) {
      refetch();
      toast.success(markCompleteData?.message || "Course marked as complete");
    }
    if (inCompletedSuccess) {
      refetch();
      toast.success(markInCompleteData?.message || "Course marked as incomplete");
    }
  }, [completedSuccess, inCompletedSuccess, markCompleteData?.message, markInCompleteData?.message, refetch]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <BookOpen className="h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-xl font-semibold">Failed to load course</h2>
        <p className="text-gray-600 mt-2">Please try again later</p>
      </div>
    );
  }

  const { courseDetails, progress, completed } = data.data;
  const { courseTitle, lectures } = courseDetails;
  const initialLecture = currentLecture || (lectures && lectures[0]);
  const completedLectures = progress.filter((p) => p.viewed).length;
  const progressPercentage = Math.round((completedLectures / lectures.length) * 100);

  const isLectureCompleted = (lectureId) => {
    return progress.some((prog) => prog.lectureId === lectureId && prog.viewed);
  };

  const handleLectureProgress = async (lectureId) => {
    await updateLectureProgress({ courseId, lectureId });
    refetch();
  };

  const handleSelectLecture = (lecture) => {
    setCurrentLecture(lecture);
    setIsVideoPlaying(false);
    handleLectureProgress(lecture._id);
  };

  const handleVideoProgress = (progress) => {
    if (progress.played >= 0.9 && !isLectureCompleted(currentLecture._id)) {
      handleLectureProgress(currentLecture._id);
    }
  };

  const handleCompleteCourse = async () => {
    await completeCourse(courseId);
  };
  const handleInCompleteCourse = async () => {
    await inCompleteCourse(courseId);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold">{courseTitle}</h1>
          <div className="flex items-center gap-2 mt-2">
            <Progress value={progressPercentage} className="w-40" />
            <span className="text-sm text-gray-600">{progressPercentage}% complete</span>
          </div>
        </div>
        <Button
          onClick={completed ? handleInCompleteCourse : handleCompleteCourse}
          variant={completed ? "outline" : "default"}
          className="shrink-0"
        >
          {completed ? (
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>Completed</span>
            </div>
          ) : (
            "Mark as completed"
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {initialLecture && (
            <>
              <div className="rounded-lg overflow-hidden bg-black aspect-video">
                <ReactPlayer
                  url={initialLecture.videoUrl}
                  width="100%"
                  height="100%"
                  controls
                  playing={isVideoPlaying}
                  onPlay={() => setIsVideoPlaying(true)}
                  onPause={() => setIsVideoPlaying(false)}
                  onProgress={handleVideoProgress}
                />
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>{initialLecture.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{initialLecture.description}</p>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              Course Content
              <Badge variant="secondary">
                {completedLectures}/{lectures.length} lectures
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {lectures.map((lecture, index) => (
                <button
                  key={lecture._id}
                  onClick={() => handleSelectLecture(lecture)}
                  className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-100 transition-colors ${
                    currentLecture?._id === lecture._id ? "bg-gray-100" : ""
                  }`}
                >
                  {isLectureCompleted(lecture._id) ? (
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                  ) : (
                    <CirclePlay className="h-5 w-5 text-gray-400 shrink-0" />
                  )}
                  <div className="text-left">
                    <p className="font-medium">
                      {index + 1}. {lecture.title}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CourseProgress;
