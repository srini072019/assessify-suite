
import { useState } from "react";
import { Plus } from "lucide-react";
import InstructorLayout from "@/layouts/InstructorLayout";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CourseForm from "@/components/course/CourseForm";
import CourseCard from "@/components/course/CourseCard";
import { useCourses } from "@/hooks/useCourses";
import { CourseFormData } from "@/types/course.types";
import { Link } from "react-router-dom";

const InstructorCourses = () => {
  const { courses, createCourse, isLoading } = useCourses("instructor-1"); // Will use actual instructor ID from auth context
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreateCourse = async (data: CourseFormData) => {
    await createCourse(data);
    setIsDialogOpen(false);
  };

  const publishedCourses = courses.filter(course => course.isPublished);
  const draftCourses = courses.filter(course => !course.isPublished);

  return (
    <InstructorLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Courses</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus size={18} />
                <span>Create Course</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Course</DialogTitle>
                <DialogDescription>
                  Fill in the details to create a new course.
                </DialogDescription>
              </DialogHeader>
              <CourseForm
                onSubmit={handleCreateCourse}
                isSubmitting={isLoading}
              />
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">All Courses ({courses.length})</TabsTrigger>
            <TabsTrigger value="published">Published ({publishedCourses.length})</TabsTrigger>
            <TabsTrigger value="drafts">Drafts ({draftCourses.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.length > 0 ? (
                courses.map(course => (
                  <CourseCard 
                    key={course.id} 
                    course={course} 
                    actionButton={
                      <Link to={`/instructor/courses/${course.id}`}>
                        <Button variant="outline" size="sm">Manage</Button>
                      </Link>
                    }
                  />
                ))
              ) : (
                <div className="col-span-3 text-center py-12">
                  <p className="text-gray-500 mb-4">You haven't created any courses yet</p>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus size={16} className="mr-2" />
                      Create Your First Course
                    </Button>
                  </DialogTrigger>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="published" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {publishedCourses.length > 0 ? (
                publishedCourses.map(course => (
                  <CourseCard 
                    key={course.id} 
                    course={course} 
                    actionButton={
                      <Link to={`/instructor/courses/${course.id}`}>
                        <Button variant="outline" size="sm">Manage</Button>
                      </Link>
                    }
                  />
                ))
              ) : (
                <div className="col-span-3 text-center py-12">
                  <p className="text-gray-500">No published courses yet</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="drafts" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {draftCourses.length > 0 ? (
                draftCourses.map(course => (
                  <CourseCard 
                    key={course.id} 
                    course={course} 
                    actionButton={
                      <Link to={`/instructor/courses/${course.id}`}>
                        <Button variant="outline" size="sm">Edit</Button>
                      </Link>
                    }
                  />
                ))
              ) : (
                <div className="col-span-3 text-center py-12">
                  <p className="text-gray-500">No draft courses</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </InstructorLayout>
  );
};

export default InstructorCourses;
