
import { useState } from "react";
import { toast } from "sonner";
import { Course, CourseFormData } from "@/types/course.types";

// Mock data for now - will be replaced with Supabase integration
const mockCourses: Course[] = [
  {
    id: "course-1",
    title: "Introduction to Computer Science",
    description: "Learn the basics of computer science and programming.",
    instructorId: "instructor-1",
    createdAt: new Date("2025-03-01"),
    updatedAt: new Date("2025-03-01"),
    enrollmentCount: 125,
    isPublished: true,
  },
  {
    id: "course-2",
    title: "Advanced Mathematics",
    description: "Explore complex mathematical concepts and theories.",
    instructorId: "instructor-2",
    createdAt: new Date("2025-03-05"),
    updatedAt: new Date("2025-03-05"),
    enrollmentCount: 89,
    isPublished: true,
  },
  {
    id: "course-3",
    title: "Introduction to Biology",
    description: "Discover the fascinating world of living organisms.",
    instructorId: "instructor-1",
    createdAt: new Date("2025-03-10"),
    updatedAt: new Date("2025-03-10"),
    enrollmentCount: 110,
    isPublished: true,
  },
];

export const useCourses = (instructorId?: string) => {
  const [courses, setCourses] = useState<Course[]>(instructorId 
    ? mockCourses.filter(course => course.instructorId === instructorId)
    : mockCourses);
  const [isLoading, setIsLoading] = useState(false);

  const createCourse = async (data: CourseFormData): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Mock API call - will be replaced with Supabase
      const newCourse: Course = {
        id: `course-${courses.length + 1}`,
        ...data,
        instructorId: instructorId || "current-user",
        createdAt: new Date(),
        updatedAt: new Date(),
        enrollmentCount: 0,
      };
      
      setCourses([...courses, newCourse]);
      toast.success("Course created successfully");
      return true;
    } catch (error) {
      console.error("Error creating course:", error);
      toast.error("Failed to create course");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateCourse = async (id: string, data: CourseFormData): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Mock API call - will be replaced with Supabase
      const updatedCourses = courses.map(course => 
        course.id === id 
          ? { ...course, ...data, updatedAt: new Date() } 
          : course
      );
      
      setCourses(updatedCourses);
      toast.success("Course updated successfully");
      return true;
    } catch (error) {
      console.error("Error updating course:", error);
      toast.error("Failed to update course");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCourse = async (id: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Mock API call - will be replaced with Supabase
      const filteredCourses = courses.filter(course => course.id !== id);
      setCourses(filteredCourses);
      toast.success("Course deleted successfully");
      return true;
    } catch (error) {
      console.error("Error deleting course:", error);
      toast.error("Failed to delete course");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const getCourse = (id: string): Course | undefined => {
    return courses.find(course => course.id === id);
  };

  return {
    courses,
    isLoading,
    createCourse,
    updateCourse,
    deleteCourse,
    getCourse,
  };
};
