import RichTextEditor from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useEditCourseMutation,
  useGetCourseByIdQuery,
  usePublishCourseMutation,
} from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";

const CourseTab = () => {
  
  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: "",
  });

  const params = useParams();
  const courseId = params.courseId;
  const { data: courseByIdData, isLoading: courseByIdLoading , refetch} =
    useGetCourseByIdQuery(courseId);

    const [publishCourse] = usePublishCourseMutation();
 
  useEffect(() => {
    if (courseByIdData?.course) { 
        const course = courseByIdData?.course;
      setInput({
        courseTitle: course.courseTitle,
        subTitle: course.subTitle,
        description: course.description,
        category: course.category,
        courseLevel: course.courseLevel,
        coursePrice: course.coursePrice,
        courseThumbnail: "",
      });
    }
  }, [courseByIdData]);

  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const navigate = useNavigate();

  const [editCourse, { data, isLoading, isSuccess, error }] =
    useEditCourseMutation();

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const selectCategory = (value) => {
    setInput({ ...input, category: value });
  };
  const selectCourseLevel = (value) => {
    setInput({ ...input, courseLevel: value });
  };
  // get file
  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, courseThumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  const updateCourseHandler = async () => {
    const formData = new FormData();
    formData.append("courseTitle", input.courseTitle);
    formData.append("subTitle", input.subTitle);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("courseLevel", input.courseLevel);
    formData.append("coursePrice", input.coursePrice);
    formData.append("courseThumbnail", input.courseThumbnail);

    await editCourse({ formData, courseId });
  };

  const publishStatusHandler = async (action) => {
    try {
      const response = await publishCourse({courseId, query:action});
      if(response.data){
        refetch();
        toast.success(response.data.message);
      }
    } catch {
      toast.error("Failed to publish or unpublish course");
    }
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success((data && data.message) || "Course update.");
    }
    if (error) {
      toast.error((error.data && error.data.message) || "Failed to update course");
    }
  }, [isSuccess, error, data]);

  if(courseByIdLoading) return <h1>Loading...</h1>

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-300 py-8 px-2 flex flex-col items-center">
      {/* Stepper/Progress Bar */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-3xl mb-6">
        <div className="flex items-center justify-center gap-2">
          <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
          <div className="h-1 w-32 bg-blue-200 rounded" />
          <div className="h-2 w-2 rounded-full bg-blue-200" />
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="w-full max-w-3xl">
        <Card className="shadow-xl rounded-2xl border-0 bg-white/90 backdrop-blur-md">
          <CardHeader className="flex flex-row justify-between items-center border-b pb-4">
            <div>
              <CardTitle className="text-2xl font-bold text-blue-700">Basic Course Information</CardTitle>
              <CardDescription className="text-gray-500">Make changes to your courses here. Click save when you&apos;re done.</CardDescription>
            </div>
            <motion.div className="space-x-2 flex" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <Button disabled={courseByIdData?.course.lectures.length === 0} variant="outline" onClick={()=> publishStatusHandler(courseByIdData?.course.isPublished ? "false" : "true")}
                className="transition-all duration-200 hover:scale-105 hover:bg-blue-50">
                {courseByIdData?.course.isPublished ? "Unpublished" : "Publish"}
              </Button>
              <Button className="bg-red-100 text-red-600 hover:bg-red-200 transition-all duration-200 hover:scale-105">Remove Course</Button>
            </motion.div>
          </CardHeader>
          <CardContent>
            <motion.div className="space-y-6 mt-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <motion.div whileHover={{ scale: 1.02 }} className="bg-slate-50 rounded-xl p-4 shadow-sm transition-all">
                <Label className="font-semibold">Title</Label>
                <Input
                  type="text"
                  name="courseTitle"
                  value={input.courseTitle}
                  onChange={changeEventHandler}
                  placeholder="Ex. Fullstack developer"
                  className="mt-1 focus:ring-2 focus:ring-blue-200"
                />
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} className="bg-slate-50 rounded-xl p-4 shadow-sm transition-all">
                <Label className="font-semibold">Subtitle</Label>
                <Input
                  type="text"
                  name="subTitle"
                  value={input.subTitle}
                  onChange={changeEventHandler}
                  placeholder="Ex. Become a Fullstack developer from zero to hero in 2 months"
                  className="mt-1 focus:ring-2 focus:ring-blue-200"
                />
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} className="bg-slate-50 rounded-xl p-4 shadow-sm transition-all">
                <Label className="font-semibold">Description</Label>
                <RichTextEditor input={input} setInput={setInput} />
              </motion.div>
              <div className="flex flex-col md:flex-row items-center gap-5">
                <motion.div whileHover={{ scale: 1.02 }} className="bg-slate-50 rounded-xl p-4 shadow-sm transition-all w-full md:w-1/3">
                  <Label className="font-semibold">Category</Label>
                  <Select
                    defaultValue={input.category}
                    onValueChange={selectCategory}
                  >
                    <SelectTrigger className="w-full mt-1">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Category</SelectLabel>
                        <SelectItem value="Next JS">Next JS</SelectItem>
                        <SelectItem value="Data Science">Data Science</SelectItem>
                        <SelectItem value="Frontend Development">Frontend Development</SelectItem>
                        <SelectItem value="Fullstack Development">Fullstack Development</SelectItem>
                        <SelectItem value="MERN Stack Development">MERN Stack Development</SelectItem>
                        <SelectItem value="Javascript">Javascript</SelectItem>
                        <SelectItem value="Python">Python</SelectItem>
                        <SelectItem value="Docker">Docker</SelectItem>
                        <SelectItem value="MongoDB">MongoDB</SelectItem>
                        <SelectItem value="HTML">HTML</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} className="bg-slate-50 rounded-xl p-4 shadow-sm transition-all w-full md:w-1/3">
                  <Label className="font-semibold">Course Level</Label>
                  <Select
                    defaultValue={input.courseLevel}
                    onValueChange={selectCourseLevel}
                  >
                    <SelectTrigger className="w-full mt-1">
                      <SelectValue placeholder="Select a course level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Course Level</SelectLabel>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Advance">Advance</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} className="bg-slate-50 rounded-xl p-4 shadow-sm transition-all w-full md:w-1/3">
                  <Label className="font-semibold">Price in (INR)</Label>
                  <Input
                    type="number"
                    name="coursePrice"
                    value={input.coursePrice}
                    onChange={changeEventHandler}
                    placeholder="199"
                    className="w-full mt-1 focus:ring-2 focus:ring-blue-200"
                  />
                </motion.div>
              </div>
              <motion.div whileHover={{ scale: 1.02 }} className="bg-slate-50 rounded-xl p-4 shadow-sm transition-all">
                <Label className="font-semibold">Course Thumbnail</Label>
                <Input
                  type="file"
                  onChange={selectThumbnail}
                  accept="image/*"
                  className="w-fit mt-1"
                />
                {previewThumbnail && (
                  <motion.img
                    src={previewThumbnail}
                    className="h-40 my-2 rounded-xl shadow-md border border-slate-200 object-cover"
                    alt="Course Thumbnail"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  />
                )}
              </motion.div>
              <div className="flex gap-3 justify-end mt-6">
                <Button onClick={() => navigate("/admin/course")} variant="outline" className="transition-all duration-200 hover:scale-105">Cancel</Button>
                <Button disabled={isLoading} onClick={updateCourseHandler} className="bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 hover:scale-105">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    "Save"
                  )}
                </Button>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default CourseTab;
