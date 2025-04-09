import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetCreatorCourseQuery } from "@/features/api/courseApi";
import { Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CourseTable = () => {
  const { data, isLoading } = useGetCreatorCourseQuery();
  const navigate = useNavigate();

  if (isLoading) return <h1 className="text-gray-600 text-lg font-medium">Loading...</h1>;

  return (
    <div className="p-6 bg-gray-50 rounded-xl shadow-sm">
      <Button
        onClick={() => navigate(`create`)}
        className="mb-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg"
      >
        Create a New Course
      </Button>
      <Table className="bg-white border border-gray-100 rounded-lg overflow-hidden">
        <TableCaption className="text-gray-500 mt-4">A list of your recent courses.</TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-50 border-b border-gray-200">
            <TableHead className="w-[100px] text-gray-700 font-semibold py-4">Price</TableHead>
            <TableHead className="text-gray-700 font-semibold py-4">Status</TableHead>
            <TableHead className="text-gray-700 font-semibold py-4">Title</TableHead>
            <TableHead className="text-right text-gray-700 font-semibold py-4">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.courses.map((course) => (
            <TableRow
              key={course._id}
              className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <TableCell className="font-medium text-gray-800 py-4">
                {course?.coursePrice ? `₹${course.coursePrice}` : "N/A"}
              </TableCell>
              <TableCell className="py-4">
                <Badge
                  className={`${
                    course.isPublished
                      ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  } font-medium`}
                >
                  {course.isPublished ? "Published" : "Draft"}
                </Badge>
              </TableCell>
              <TableCell className="text-gray-800 py-4">{course.courseTitle}</TableCell>
              <TableCell className="text-right py-4">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => navigate(`${course._id}`)}
                  className="text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-full"
                >
                  <Edit size={18} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CourseTable;