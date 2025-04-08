
import { useState } from "react";
import { toast } from "sonner";
import { Subject, SubjectFormData } from "@/types/subject.types";

// Mock data for now - will be replaced with Supabase integration
const mockSubjects: Subject[] = [
  {
    id: "subject-1",
    title: "Programming Fundamentals",
    description: "Learn the basics of programming concepts.",
    courseId: "course-1",
    order: 1,
    createdAt: new Date("2025-03-01"),
    updatedAt: new Date("2025-03-01"),
  },
  {
    id: "subject-2",
    title: "Object-Oriented Programming",
    description: "Master object-oriented programming principles.",
    courseId: "course-1",
    order: 2,
    createdAt: new Date("2025-03-02"),
    updatedAt: new Date("2025-03-02"),
  },
  {
    id: "subject-3",
    title: "Calculus",
    description: "Explore differential and integral calculus.",
    courseId: "course-2",
    order: 1,
    createdAt: new Date("2025-03-05"),
    updatedAt: new Date("2025-03-05"),
  },
  {
    id: "subject-4",
    title: "Linear Algebra",
    description: "Study vector spaces and linear transformations.",
    courseId: "course-2",
    order: 2,
    createdAt: new Date("2025-03-06"),
    updatedAt: new Date("2025-03-06"),
  },
];

export const useSubjects = (courseId?: string) => {
  const [subjects, setSubjects] = useState<Subject[]>(courseId 
    ? mockSubjects.filter(subject => subject.courseId === courseId)
    : mockSubjects);
  const [isLoading, setIsLoading] = useState(false);

  const createSubject = async (data: SubjectFormData): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Mock API call - will be replaced with Supabase
      const subjectsInCourse = subjects.filter(s => s.courseId === data.courseId);
      const newOrder = data.order || subjectsInCourse.length + 1;
      
      const newSubject: Subject = {
        id: `subject-${subjects.length + 1}`,
        ...data,
        order: newOrder,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      setSubjects([...subjects, newSubject]);
      toast.success("Subject created successfully");
      return true;
    } catch (error) {
      console.error("Error creating subject:", error);
      toast.error("Failed to create subject");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateSubject = async (id: string, data: SubjectFormData): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Mock API call - will be replaced with Supabase
      const updatedSubjects = subjects.map(subject => 
        subject.id === id 
          ? { ...subject, ...data, updatedAt: new Date() } 
          : subject
      );
      
      setSubjects(updatedSubjects);
      toast.success("Subject updated successfully");
      return true;
    } catch (error) {
      console.error("Error updating subject:", error);
      toast.error("Failed to update subject");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteSubject = async (id: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Mock API call - will be replaced with Supabase
      const filteredSubjects = subjects.filter(subject => subject.id !== id);
      setSubjects(filteredSubjects);
      toast.success("Subject deleted successfully");
      return true;
    } catch (error) {
      console.error("Error deleting subject:", error);
      toast.error("Failed to delete subject");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const getSubject = (id: string): Subject | undefined => {
    return subjects.find(subject => subject.id === id);
  };

  const getSubjectsByCourse = (courseId: string): Subject[] => {
    return subjects.filter(subject => subject.courseId === courseId)
      .sort((a, b) => a.order - b.order);
  };

  return {
    subjects,
    isLoading,
    createSubject,
    updateSubject,
    deleteSubject,
    getSubject,
    getSubjectsByCourse,
  };
};
