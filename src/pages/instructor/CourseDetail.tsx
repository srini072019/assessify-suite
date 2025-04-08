
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Edit, ArrowLeft, Trash2 } from "lucide-react";
import InstructorLayout from "@/layouts/InstructorLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CourseForm from "@/components/course/CourseForm";
import SubjectList from "@/components/subject/SubjectList";
import { useCourses } from "@/hooks/useCourses";
import { CourseFormData } from "@/types/course.types";
import { ROUTES } from "@/constants/routes";

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { courses, updateCourse, deleteCourse, isLoading } = useCourses("instructor-1");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const course = courses.find(c => c.id === id);

  if (!course) {
    return (
      <InstructorLayout>
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">Course not found</p>
          <Button onClick={() => navigate(ROUTES.INSTRUCTOR_COURSES)}>Go back to courses</Button>
        </div>
      </InstructorLayout>
    );
  }

  const handleUpdateCourse = async (data: CourseFormData) => {
    if (id) {
      await updateCourse(id, data);
      setIsEditDialogOpen(false);
    }
  };

  const handleDeleteCourse = async () => {
    if (id) {
      await deleteCourse(id);
      navigate(ROUTES.INSTRUCTOR_COURSES);
    }
  };

  return (
    <InstructorLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => navigate(ROUTES.INSTRUCTOR_COURSES)}>
            <ArrowLeft size={18} />
          </Button>
          <h1 className="text-3xl font-bold">{course.title}</h1>
          
          <div className="ml-auto space-x-2">
            <Button 
              variant="outline" 
              className="flex items-center gap-1"
              onClick={() => setIsEditDialogOpen(true)}
            >
              <Edit size={16} />
              <span>Edit Course</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-1"
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              <Trash2 size={16} />
              <span>Delete</span>
            </Button>
          </div>
        </div>
        
        {!course.isPublished && (
          <div className="bg-yellow-50 border border-yellow-100 text-yellow-800 px-4 py-2 rounded-md">
            This course is currently in draft mode and not visible to students.
          </div>
        )}

        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="subjects">Subjects</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Details</CardTitle>
                <CardDescription>Overview of your course</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-1">Description</h3>
                  <p>{course.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h3 className="font-semibold mb-1 text-sm">Status</h3>
                    <div className={`inline-block px-2 py-1 rounded-full text-xs ${
                      course.isPublished 
                        ? "bg-green-100 text-green-800" 
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {course.isPublished ? "Published" : "Draft"}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-1 text-sm">Created</h3>
                    <p className="text-gray-600">{new Date(course.createdAt).toLocaleDateString()}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-1 text-sm">Students</h3>
                    <p className="text-gray-600">{course.enrollmentCount || 0} enrolled</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="subjects" className="mt-6">
            <SubjectList courseId={course.id} courses={courses} />
          </TabsContent>
          
          <TabsContent value="students" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Enrolled Students</CardTitle>
                <CardDescription>Students taking this course</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-500 py-8">
                  Student management will be implemented in a future update.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Edit Course Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Course</DialogTitle>
            <DialogDescription>
              Update the details of your course.
            </DialogDescription>
          </DialogHeader>
          <CourseForm
            initialData={{
              title: course.title,
              description: course.description,
              imageUrl: course.imageUrl,
              isPublished: course.isPublished,
            }}
            onSubmit={handleUpdateCourse}
            isSubmitting={isLoading}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Course</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this course? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteCourse} disabled={isLoading}>
              {isLoading ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </InstructorLayout>
  );
};

export default CourseDetail;
