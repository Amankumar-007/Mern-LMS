import BuyCourseButton from "@/components/BuyCourseButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetCourseDetailWithStatusQuery } from "@/features/api/purchaseApi";
import { BadgeInfo, Clock, Globe, Lock, PlayCircle, Users } from "lucide-react";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

const CourseDetail = () => {
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();
  const { data, isLoading, isError } =
    useGetCourseDetailWithStatusQuery(courseId);

  const [selectedLecture, setSelectedLecture] = useState(null);

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-2xl font-semibold">Loading...</div>
    </div>
  );
  
  if (isError) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-2xl text-red-500">Failed to load course details</div>
    </div>
  );

  const { course, purchased } = data;

  const handleContinueCourse = () => {
    if (purchased) {
      navigate(`/course-progress/${courseId}`);
    }
  };

  const getFirstVideoLecture = () => {
    if (!course.lectures || course.lectures.length === 0) {
      return null;
    }

    return (
      course.lectures.find((lecture) => {
        return (
          lecture.videoUrl ||
          (lecture.videoInfo && lecture.videoInfo.videoUrl)
        );
      }) || course.lectures[0]
    );
  };

  const firstVideoLecture = getFirstVideoLecture();

  const getVideoUrl = (lecture) => {
    if (!lecture) return null;
    return lecture.videoUrl || (lecture.videoInfo && lecture.videoInfo.videoUrl);
  };

  const videoUrl = getVideoUrl(selectedLecture || firstVideoLecture);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="bg-[#1A1B1E] text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 md:px-8">
          <div className="max-w-3xl">
            <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {course?.courseTitle}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-6">
              {course?.subTitle || "Course Sub-title"}
            </p>
            <div className="flex flex-wrap gap-6 text-sm text-gray-300 mb-8">
              <div className="flex items-center gap-2">
                <Globe size={18} />
                <p>Created By{" "}
                  <span className="text-[#8B5CF6] hover:text-[#A78BFA] transition-colors cursor-pointer">
                    {course?.creator.name}
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} />
                <p>Last updated {new Date(course?.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-2">
                <Users size={18} />
                <p>{course?.enrolledStudents.length} students enrolled</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Section */}
          <div className="flex-1 space-y-8">
            <div className="bg-card rounded-xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Course Overview</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: course.description }}
              />
            </div>

            <Card className="shadow-lg border-0 bg-card/50 backdrop-blur">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">Course Content</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <PlayCircle size={16} />
                  {course.lectures.length} lectures
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {course.lectures.map((lecture, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        if (purchased || lecture.isPreviewFree) {
                          setSelectedLecture(lecture);
                        }
                      }}
                      className={`
                        flex items-center gap-4 p-4 rounded-lg transition-all
                        ${(selectedLecture?.lectureTitle === lecture.lectureTitle ||
                          (!selectedLecture && firstVideoLecture?.lectureTitle === lecture.lectureTitle))
                          ? "bg-primary/10 shadow-md"
                          : "hover:bg-primary/5"}
                        ${purchased || lecture.isPreviewFree ? "cursor-pointer" : "opacity-75"}
                      `}
                    >
                      <div className={`
                        p-2 rounded-full
                        ${purchased || lecture.isPreviewFree
                          ? "bg-primary/20 text-primary"
                          : "bg-muted text-muted-foreground"}
                      `}>
                        {purchased || lecture.isPreviewFree ? (
                          <PlayCircle size={20} />
                        ) : (
                          <Lock size={20} />
                        )}
                      </div>
                      <div>
                        <p className={`font-medium ${
                          (selectedLecture?.lectureTitle === lecture.lectureTitle ||
                            (!selectedLecture && firstVideoLecture?.lectureTitle === lecture.lectureTitle))
                            ? "text-primary"
                            : ""
                        }`}>
                          {lecture.lectureTitle}
                        </p>
                        {!purchased && !lecture.isPreviewFree && (
                          <p className="text-sm text-muted-foreground">Premium Content</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Section */}
          <div className="lg:w-[400px] flex flex-col gap-6">
            <Card className="shadow-lg border-0 bg-card/50 backdrop-blur sticky top-6">
              <CardContent className="p-6">
                <div className="w-full aspect-video rounded-lg overflow-hidden mb-6 shadow-xl">
                  {videoUrl ? (
                    <ReactPlayer
                      width="100%"
                      height="100%"
                      url={videoUrl}
                      controls={true}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-muted text-muted-foreground">
                      No video available
                    </div>
                  )}
                </div>
                <h3 className="font-medium text-lg mb-2">
                  {selectedLecture?.lectureTitle ||
                    firstVideoLecture?.lectureTitle ||
                    "Lecture title"}
                </h3>
                <Separator className="my-6" />
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">
                    {course.coursePrice ? (
                      <span className="flex items-baseline gap-2">
                        ${course.coursePrice.toFixed(2)}
                        <span className="text-sm text-muted-foreground">USD</span>
                      </span>
                    ) : (
                      "Free"
                    )}
                  </h3>
                  {purchased ? (
                    <Button
                      onClick={handleContinueCourse}
                      className="w-full text-lg py-6 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                    >
                      Continue Learning
                    </Button>
                  ) : (
                    <BuyCourseButton courseId={courseId} />
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;