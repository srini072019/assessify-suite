
import { useState } from "react";
import { toast } from "sonner";
import { Question, QuestionFormData, QuestionType, DifficultyLevel } from "@/types/question.types";

// Mock data for now - will be replaced with Supabase integration
const mockQuestions: Question[] = [
  {
    id: "question-1",
    text: "What is the capital of France?",
    type: QuestionType.MULTIPLE_CHOICE,
    options: [
      { id: "opt-1", text: "London", isCorrect: false },
      { id: "opt-2", text: "Paris", isCorrect: true },
      { id: "opt-3", text: "Berlin", isCorrect: false },
      { id: "opt-4", text: "Madrid", isCorrect: false }
    ],
    subjectId: "subject-1",
    difficultyLevel: DifficultyLevel.EASY,
    createdAt: new Date("2025-03-15"),
    updatedAt: new Date("2025-03-15")
  },
  {
    id: "question-2",
    text: "Is JavaScript a statically typed language?",
    type: QuestionType.TRUE_FALSE,
    options: [
      { id: "opt-1", text: "True", isCorrect: false },
      { id: "opt-2", text: "False", isCorrect: true }
    ],
    subjectId: "subject-2",
    difficultyLevel: DifficultyLevel.MEDIUM,
    explanation: "JavaScript is a dynamically typed language",
    createdAt: new Date("2025-03-16"),
    updatedAt: new Date("2025-03-16")
  },
  {
    id: "question-3",
    text: "Which of the following are primary colors?",
    type: QuestionType.MULTIPLE_ANSWER,
    options: [
      { id: "opt-1", text: "Red", isCorrect: true },
      { id: "opt-2", text: "Green", isCorrect: false },
      { id: "opt-3", text: "Blue", isCorrect: true },
      { id: "opt-4", text: "Yellow", isCorrect: true }
    ],
    subjectId: "subject-3",
    difficultyLevel: DifficultyLevel.HARD,
    createdAt: new Date("2025-03-17"),
    updatedAt: new Date("2025-03-17")
  }
];

export const useQuestions = (subjectId?: string) => {
  const [questions, setQuestions] = useState<Question[]>(subjectId 
    ? mockQuestions.filter(question => question.subjectId === subjectId)
    : mockQuestions);
  const [isLoading, setIsLoading] = useState(false);

  const createQuestion = async (data: QuestionFormData): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Mock API call - will be replaced with Supabase
      const newQuestion: Question = {
        id: `question-${Date.now()}`,
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      setQuestions([...questions, newQuestion]);
      toast.success("Question created successfully");
      return true;
    } catch (error) {
      console.error("Error creating question:", error);
      toast.error("Failed to create question");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuestion = async (id: string, data: QuestionFormData): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Mock API call - will be replaced with Supabase
      const updatedQuestions = questions.map(question => 
        question.id === id 
          ? { ...question, ...data, updatedAt: new Date() } 
          : question
      );
      
      setQuestions(updatedQuestions);
      toast.success("Question updated successfully");
      return true;
    } catch (error) {
      console.error("Error updating question:", error);
      toast.error("Failed to update question");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteQuestion = async (id: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Mock API call - will be replaced with Supabase
      const filteredQuestions = questions.filter(question => question.id !== id);
      setQuestions(filteredQuestions);
      toast.success("Question deleted successfully");
      return true;
    } catch (error) {
      console.error("Error deleting question:", error);
      toast.error("Failed to delete question");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const getQuestion = (id: string): Question | undefined => {
    return questions.find(question => question.id === id);
  };

  const getQuestionsBySubject = (subjectId: string): Question[] => {
    return questions.filter(question => question.subjectId === subjectId);
  };

  return {
    questions,
    isLoading,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    getQuestion,
    getQuestionsBySubject,
  };
};
