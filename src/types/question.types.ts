
export enum QuestionType {
  MULTIPLE_CHOICE = "multipleChoice",
  TRUE_FALSE = "trueFalse",
  MULTIPLE_ANSWER = "multipleAnswer"
}

export enum DifficultyLevel {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard"
}

export interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  options: QuestionOption[];
  subjectId: string;
  difficultyLevel: DifficultyLevel;
  explanation?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface QuestionFormData {
  text: string;
  type: QuestionType;
  options: QuestionOption[];
  subjectId: string;
  difficultyLevel: DifficultyLevel;
  explanation?: string;
}
