
import { useState } from "react";
import { Card } from "@/components/ui/card";
import InstructorLayout from "@/layouts/InstructorLayout";
import { BookOpen, FileSpreadsheet, Users, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, icon }: StatCardProps) => {
  return (
    <Card className="p-6">
      <div className="flex items-center">
        <div className="p-2 bg-assessify-accent rounded-md">
          {icon}
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
      </div>
    </Card>
  );
};

interface CourseCardProps {
  title: string;
  studentsCount: number;
  examsCount: number;
  onClick: () => void;
}

const CourseCard = ({ title, studentsCount, examsCount, onClick }: CourseCardProps) => {
  return (
    <Card className="p-6 hover:shadow-md transition-shadow duration-300 cursor-pointer" onClick={onClick}>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
      <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
        <Users size={16} className="mr-1" />
        <span>{studentsCount} Students</span>
        <span className="mx-2">•</span>
        <FileSpreadsheet size={16} className="mr-1" />
        <span>{examsCount} Exams</span>
      </div>
      <div className="mt-4">
        <Button variant="outline" size="sm">
          View Course
        </Button>
      </div>
    </Card>
  );
};

const Dashboard = () => {
  // Mock data - will be replaced with actual data from Supabase
  const [stats] = useState([
    {
      title: "Total Courses",
      value: 8,
      icon: <BookOpen size={24} className="text-assessify-primary" />,
    },
    {
      title: "Exams Created",
      value: 24,
      icon: <FileSpreadsheet size={24} className="text-assessify-primary" />,
    },
    {
      title: "Total Students",
      value: 156,
      icon: <Users size={24} className="text-assessify-primary" />,
    },
    {
      title: "Questions Created",
      value: 418,
      icon: <CheckCircle size={24} className="text-assessify-primary" />,
    },
  ]);

  const [courses] = useState([
    { 
      id: 1, 
      title: "Introduction to Computer Science", 
      studentsCount: 45, 
      examsCount: 6 
    },
    { 
      id: 2, 
      title: "Advanced Mathematics", 
      studentsCount: 32, 
      examsCount: 8 
    },
    { 
      id: 3, 
      title: "Physics 101", 
      studentsCount: 38, 
      examsCount: 5 
    },
    { 
      id: 4, 
      title: "Digital Marketing Fundamentals", 
      studentsCount: 41, 
      examsCount: 5 
    },
  ]);

  const handleCourseClick = (courseId: number) => {
    console.log(`Navigate to course ${courseId}`);
    // Will implement navigation to course page
  };

  return (
    <InstructorLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Instructor Dashboard</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Welcome back! Here's an overview of your courses and exams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
            />
          ))}
        </div>

        {/* My Courses */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">My Courses</h2>
            <Button className="bg-assessify-primary hover:bg-assessify-primary/90">
              Create Course
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                title={course.title}
                studentsCount={course.studentsCount}
                examsCount={course.examsCount}
                onClick={() => handleCourseClick(course.id)}
              />
            ))}
          </div>
        </div>

        {/* Upcoming Exams */}
        <Card className="p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Upcoming Exams</h2>
          <div className="mt-4 space-y-4">
            <div className="flex justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Introduction to Programming - Final Exam</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">April 15, 2025 • 10:00 AM</p>
              </div>
              <Button variant="outline" size="sm">View</Button>
            </div>
            <div className="flex justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Data Structures - Mid Term</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">April 20, 2025 • 2:00 PM</p>
              </div>
              <Button variant="outline" size="sm">View</Button>
            </div>
          </div>
        </Card>
      </div>
    </InstructorLayout>
  );
};

export default Dashboard;
