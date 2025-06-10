import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetPurchasedCoursesQuery } from "@/features/api/purchaseApi";
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Legend } from "recharts";

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

const COLORS = ["#6366f1", "#10b981", "#f59e42", "#f43f5e", "#3b82f6", "#a21caf", "#eab308", "#14b8a6"];

const Dashboard = () => {
  const {data, isError, isLoading} = useGetPurchasedCoursesQuery();

  // Mocked recent sales (frontend only)
  const recentSales = [
    { name: "React Mastery", buyer: "Alice", amount: 499, date: "2025-06-09" },
    { name: "Python Bootcamp", buyer: "Bob", amount: 299, date: "2025-06-08" },
    { name: "Next.js Pro", buyer: "Charlie", amount: 399, date: "2025-06-07" },
    { name: "Docker Essentials", buyer: "Diana", amount: 199, date: "2025-06-06" },
  ];

  if(isLoading) return <h1 className="text-gray-600 text-lg font-medium">Loading...</h1>
  if(isError) return <h1 className="text-red-500 text-lg font-medium">Failed to get purchased courses</h1>

  const {purchasedCourse} = data || { purchasedCourse: [] };
  const courseData = purchasedCourse.map((course)=> ({
    name: course.courseId.courseTitle,
    price: course.courseId.coursePrice
  }));
  const totalRevenue = purchasedCourse.reduce((acc,element) => acc+(element.amount || 0), 0);
  const totalSales = purchasedCourse.length;

  // Pie chart data for course sales distribution
  const courseSales = {};
  purchasedCourse.forEach((c) => {
    const title = c.courseId.courseTitle;
    courseSales[title] = (courseSales[title] || 0) + 1;
  });
  const pieData = Object.entries(courseSales).map(([name, value]) => ({ name, value }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-6">
      {/* Welcome header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8">
        <h1 className="text-3xl font-bold text-indigo-700 mb-1">Welcome, instructor 👋</h1>
        <p className="text-gray-500 text-lg">Here&apos;s a quick overview of your platform&apos;s performance.</p>
      </motion.div>
      {/* Summary cards */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-8">
        <motion.div variants={cardVariants} initial="hidden" animate="visible" whileHover="hover">
          <Card className="bg-white border-0 shadow-lg rounded-2xl">
            <CardHeader className="bg-indigo-50 pb-2 rounded-t-2xl">
              <CardTitle className="text-indigo-700 text-base font-medium uppercase tracking-wide">Total Sales</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <motion.p className="text-3xl font-semibold text-indigo-800" initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.6 }}>{totalSales}</motion.p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={cardVariants} initial="hidden" animate="visible" whileHover="hover">
          <Card className="bg-white border-0 shadow-lg rounded-2xl">
            <CardHeader className="bg-emerald-50 pb-2 rounded-t-2xl">
              <CardTitle className="text-emerald-700 text-base font-medium uppercase tracking-wide">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <motion.p className="text-3xl font-semibold text-emerald-800" initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.6 }}>₹{totalRevenue}</motion.p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={cardVariants} initial="hidden" animate="visible" whileHover="hover">
          <Card className="bg-white border-0 shadow-lg rounded-2xl">
            <CardHeader className="bg-yellow-50 pb-2 rounded-t-2xl">
              <CardTitle className="text-yellow-700 text-base font-medium uppercase tracking-wide">Active Courses</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <motion.p className="text-3xl font-semibold text-yellow-800" initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.6 }}>{Object.keys(courseSales).length}</motion.p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      {/* Charts and recent sales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Line chart */}
        <motion.div variants={cardVariants} initial="hidden" animate="visible" whileHover="hover">
          <Card className="bg-white border-0 shadow-lg rounded-2xl h-full">
            <CardHeader className="bg-gray-50 pb-2 rounded-t-2xl">
              <CardTitle className="text-gray-700 text-base font-medium uppercase tracking-wide">Course Prices</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={courseData}>
                  <CartesianGrid stroke="#e5e7eb" strokeDasharray="5 5" />
                  <XAxis dataKey="name" stroke="#6b7280" angle={-45} textAnchor="end" interval={0} height={60} tick={{ fill: '#6b7280', fontSize: 12 }} />
                  <YAxis stroke="#6b7280" tick={{ fill: '#6b7280', fontSize: 12 }} />
                  <Tooltip formatter={(value) => [`₹${value}`, 'Price']} contentStyle={{ backgroundColor: '#ffffff', border: '1.px solid #e5e7eb', borderRadius: '6px', boxShadow: '0 2px 6px rgba(0,0,0,0.05)', fontSize: '13px' }} />
                  <Line type="monotone" dataKey="price" stroke="#6366f1" strokeWidth={2} dot={{ stroke: '#6366f1', strokeWidth: 1, r: 4, fill: '#fff' }} activeDot={{ r: 7, fill: '#6366f1', stroke: '#fff' }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
        {/* Pie chart */}
        <motion.div variants={cardVariants} initial="hidden" animate="visible" whileHover="hover">
          <Card className="bg-white border-0 shadow-lg rounded-2xl h-full">
            <CardHeader className="bg-gray-50 pb-2 rounded-t-2xl">
              <CardTitle className="text-gray-700 text-base font-medium uppercase tracking-wide">Course Sales Distribution</CardTitle>
            </CardHeader>
            <CardContent className="p-6 flex justify-center items-center">
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      {/* Recent sales table */}
      <motion.div variants={cardVariants} initial="hidden" animate="visible" whileHover="hover">
        <Card className="bg-white border-0 shadow-lg rounded-2xl">
          <CardHeader className="bg-blue-50 pb-2 rounded-t-2xl">
            <CardTitle className="text-blue-700 text-base font-medium uppercase tracking-wide">Recent Sales</CardTitle>
          </CardHeader>
          <CardContent className="p-6 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-gray-600">
                  <th className="px-4 py-2 text-left">Course</th>
                  <th className="px-4 py-2 text-left">Buyer</th>
                  <th className="px-4 py-2 text-left">Amount</th>
                  <th className="px-4 py-2 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentSales.map((sale, idx) => (
                  <tr key={idx} className="hover:bg-blue-50 transition-all">
                    <td className="px-4 py-2 font-medium text-gray-800">{sale.name}</td>
                    <td className="px-4 py-2 text-gray-600">{sale.buyer}</td>
                    <td className="px-4 py-2 text-green-600 font-semibold">₹{sale.amount}</td>
                    <td className="px-4 py-2 text-gray-500">{sale.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Dashboard;