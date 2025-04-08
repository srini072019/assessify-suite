
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { X, PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { QuestionType, DifficultyLevel } from "@/types/question.types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Subject } from "@/types/subject.types";

const questionSchema = z.object({
  text: z.string().min(5, "Question text must be at least 5 characters"),
  type: z.nativeEnum(QuestionType),
  subjectId: z.string().min(1, "Subject is required"),
  difficultyLevel: z.nativeEnum(DifficultyLevel),
  explanation: z.string().optional(),
  options: z.array(
    z.object({
      id: z.string(),
      text: z.string().min(1, "Option text is required"),
      isCorrect: z.boolean(),
    })
  ).nonempty("At least one option is required"),
});

interface QuestionFormProps {
  initialData?: {
    text?: string;
    type?: QuestionType;
    subjectId?: string;
    difficultyLevel?: DifficultyLevel;
    explanation?: string;
    options?: { id: string; text: string; isCorrect: boolean }[];
  };
  subjects: Subject[];
  onSubmit: (data: any) => void;
  isSubmitting: boolean;
}

const QuestionForm = ({
  initialData,
  subjects,
  onSubmit,
  isSubmitting,
}: QuestionFormProps) => {
  const form = useForm({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      text: initialData?.text || "",
      type: initialData?.type || QuestionType.MULTIPLE_CHOICE,
      subjectId: initialData?.subjectId || "",
      difficultyLevel: initialData?.difficultyLevel || DifficultyLevel.MEDIUM,
      explanation: initialData?.explanation || "",
      options: initialData?.options || [
        { id: uuidv4(), text: "", isCorrect: false },
        { id: uuidv4(), text: "", isCorrect: false },
      ],
    },
  });

  const questionType = form.watch("type");

  const addOption = () => {
    const currentOptions = form.getValues("options");
    form.setValue("options", [
      ...currentOptions,
      { id: uuidv4(), text: "", isCorrect: false },
    ]);
  };

  const removeOption = (index: number) => {
    const currentOptions = form.getValues("options");
    form.setValue(
      "options",
      currentOptions.filter((_, i) => i !== index)
    );
  };

  // Set isCorrect based on question type
  const handleCorrectOption = (index: number, checked: boolean) => {
    const currentOptions = form.getValues("options");
    
    if (questionType === QuestionType.MULTIPLE_CHOICE) {
      // For multiple choice, only one option can be correct
      const updatedOptions = currentOptions.map((option, i) => ({
        ...option,
        isCorrect: i === index ? checked : false,
      }));
      form.setValue("options", updatedOptions);
    } else if (questionType === QuestionType.TRUE_FALSE) {
      // For true/false, only one option can be correct
      const updatedOptions = currentOptions.map((option, i) => ({
        ...option,
        isCorrect: i === index ? checked : false,
      }));
      form.setValue("options", updatedOptions);
    } else {
      // For multiple answer, multiple options can be correct
      const updatedOptions = [...currentOptions];
      updatedOptions[index].isCorrect = checked;
      form.setValue("options", updatedOptions);
    }
  };

  // Reset options when question type changes
  const handleQuestionTypeChange = (type: QuestionType) => {
    form.setValue("type", type);
    
    if (type === QuestionType.TRUE_FALSE) {
      form.setValue("options", [
        { id: uuidv4(), text: "True", isCorrect: false },
        { id: uuidv4(), text: "False", isCorrect: false },
      ]);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question Text</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter question text"
                  className="resize-none"
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Question Type</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => handleQuestionTypeChange(value as QuestionType)}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select question type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={QuestionType.MULTIPLE_CHOICE}>
                        Multiple Choice
                      </SelectItem>
                      <SelectItem value={QuestionType.TRUE_FALSE}>
                        True/False
                      </SelectItem>
                      <SelectItem value={QuestionType.MULTIPLE_ANSWER}>
                        Multiple Answer
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subjectId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject.id} value={subject.id}>
                          {subject.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="difficultyLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Difficulty Level</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={DifficultyLevel.EASY}>Easy</SelectItem>
                      <SelectItem value={DifficultyLevel.MEDIUM}>
                        Medium
                      </SelectItem>
                      <SelectItem value={DifficultyLevel.HARD}>Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <FormLabel>Options</FormLabel>
            {questionType !== QuestionType.TRUE_FALSE && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addOption}
              >
                <PlusCircle size={16} className="mr-1" /> Add Option
              </Button>
            )}
          </div>

          {form.watch("options").map((option, index) => (
            <div key={option.id} className="flex items-start space-x-2">
              <FormField
                control={form.control}
                name={`options.${index}.isCorrect`}
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2 space-y-0 mt-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) =>
                          handleCorrectOption(index, checked as boolean)
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`options.${index}.text`}
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormControl>
                      <Input
                        placeholder="Option text"
                        {...field}
                        disabled={
                          questionType === QuestionType.TRUE_FALSE && index < 2
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {questionType !== QuestionType.TRUE_FALSE && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeOption(index)}
                  disabled={form.watch("options").length <= 2}
                >
                  <X size={16} />
                </Button>
              )}
            </div>
          ))}
          {form.formState.errors.options?.message && (
            <p className="text-sm font-medium text-destructive">
              {form.formState.errors.options?.message}
            </p>
          )}
        </div>

        <FormField
          control={form.control}
          name="explanation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Explanation (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Explain the correct answer"
                  className="resize-none"
                  rows={2}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Provide an explanation for the correct answer
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Question"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default QuestionForm;
