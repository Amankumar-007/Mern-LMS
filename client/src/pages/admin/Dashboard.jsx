import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetPurchasedCoursesQuery } from "@/features/api/purchaseApi";
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
  hover: { 
    y: -3,
    transition: { duration: 0.2 }
  }
};

const Dashboard = () => {
  const {data, isSuccess, isError, isLoading} = useGetPurchasedCoursesQuery();

  if(isLoading) return <h1 className="text-gray-600 text-lg font-medium">Loading...</h1>
  if(isError) return <h1 className="text-red-500 text-lg font-medium">Failed to get purchased courses</h1>

  const {purchasedCourse} = data || [];
  
  const courseData = purchasedCourse.map((course)=> ({
    name: course.courseId.courseTitle,
    price: course.courseId.coursePrice
  }));

  const totalRevenue = purchasedCourse.reduce((acc,element) => acc+(element.amount || 0), 0);
  const totalSales = purchasedCourse.length;

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-6 bg-gray-50 min-h-screen">
      <motion.div variants={cardVariants} initial="hidden" animate="visible" whileHover="hover">
        <Card className="bg-white border border-gray-100 shadow-md rounded-xl">
          <CardHeader className="bg-indigo-50 pb-2">
            <CardTitle className="text-indigo-700 text-base font-medium uppercase tracking-wide">
              Total Sales
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-3xl font-semibold text-indigo-800">{totalSales}</p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={cardVariants} initial="hidden" animate="visible" whileHover="hover">
        <Card className="bg-white border border-gray-100 shadow-md rounded-xl">
          <CardHeader className="bg-emerald-50 pb-2">
            <CardTitle className="text-emerald-700 text-base font-medium uppercase tracking-wide">
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-3xl font-semibold text-emerald-800">{totalRevenue}</p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div 
        variants={cardVariants} 
        initial="hidden" 
        animate="visible" 
        whileHover="hover"
        className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4"
      >
        <Card className="bg-white border border-gray-100 shadow-md rounded-xl">
          <CardHeader className="bg-gray-50 pb-2">
            <CardTitle className="text-gray-700 text-base font-medium uppercase tracking-wide">
              Course Prices
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={courseData}>
                <CartesianGrid stroke="#e5e7eb" strokeDasharray="5 5" />
                <XAxis
                  dataKey="name"
                  stroke="#6b7280"
                  angle={-45}
                  textAnchor="end"
                  interval={0}
                  height={60}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                />
                <YAxis 
                  stroke="#6b7280"
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                />
                <Tooltip 
                  formatter={(value) => [`₹${value}`, 'Price']}
                  contentStyle={{ 
                    backgroundColor: '#ffffff',
                    border: '1.px solid #e5e7eb',
                    borderRadius: '6px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                    fontSize: '13px'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#6366f1" // Indigo-500
                  strokeWidth={2}
                  dot={{ stroke: '#6366f1', strokeWidth: 1, r: 4, fill: '#fff' }}
                  activeDot={{ r: 7, fill: '#6366f1', stroke: '#fff' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Dashboard;