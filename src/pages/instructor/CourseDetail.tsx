
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import InstructorLayout from "@/layouts/InstructorLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Edit } from "lucide-react";
import { useCourses } from "@/hooks/useCourses";
import { useSubjects } from "@/hooks/useSubjects";
import { useQuestions } from "@/hooks/useQuestions";
import SubjectList from "@/components/subject/SubjectList";
import ExamList from "@/components/exam/ExamList";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import CourseForm from "@/components/course/CourseForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ROUTES } from "@/constants/routes";

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { courses, getCourse, updateCourse } = useCourses();
  const { subjects } = useSubjects();
  const { questions } = useQuestions();
  const [course, setCourse] = useState<any>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    if (id) {
      const foundCourse = getCourse(id);
      if (foundCourse) {
        setCourse(foundCourse);
      } else {
        // Course not found, redirect
        navigate(ROUTES.INSTRUCTOR_COURSES);
      }
    }
  }, [id, getCourse, navigate]);

  const handleUpdateCourse = async (data: any) => {
    if (course) {
      setIsSubmitting(true);
      const success = await updateCourse(course.id, data);
      setIsSubmitting(false);
      
      if (success) {
        setIsEditDialogOpen(false);
        // Update the local state with the new course data
        setCourse({ ...course, ...data });
      }
    }
  };

  if (!course) {
    return (
      <InstructorLayout>
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">Loading course details...</p>
        </div>
      </InstructorLayout>
    );
  }

  return (
    <InstructorLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="mb-2"
              onClick={() => navigate(ROUTES.INSTRUCTOR_COURSES)}
            >
              <ArrowLeft size={16} className="mr-1" />
              Back to Courses
            </Button>
            <h1 className="text-3xl font-bold">{course.title}</h1>
            <p className="text-gray-500 mt-1">{course.description}</p>
          </div>
          <Button 
            variant="outline"
            onClick={() => setIsEditDialogOpen(true)}
          >
            <Edit size={16} className="mr-2" />
            Edit Course
          </Button>
        </div>

        <Card>
          <CardContent className="p-6">
            <Tabs defaultValue="subjects" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="subjects">Subjects</TabsTrigger>
                <TabsTrigger value="exams">Exams</TabsTrigger>
              </TabsList>
              
              <TabsContent value="subjects">
                <SubjectList courseId={course.id} courses={courses} />
              </TabsContent>
              
              <TabsContent value="exams">
                <ExamList courseId={course.id} courses={courses} questions={questions} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      
      {/* Edit Course Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Course</DialogTitle>
            <DialogDescription>
              Update the details of this course.
            </DialogDescription>
          </DialogHeader>
          <CourseForm 
            initialData={{
              title: course.title,
              description: course.description,
              isPublished: course.isPublished,
            }}
            onSubmit={handleUpdateCourse}
            isSubmitting={isSubmitting}
          />
        </DialogContent>
      </Dialog>
    </InstructorLayout>
  );
};

export default CourseDetail;
