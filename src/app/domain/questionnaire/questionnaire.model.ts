export interface Questionnaire {
  id: number;
  title: string;
  description: string;
  questions: Question[];
}

export interface Question {
  id?: number;
  questionText: string;
  type: 'text' | 'single-choice' | 'multiple-choice';
  choices: string[];
  answers: string[]

}

export interface UserResponse {
  questionId: number;
  answer: string;
  timeSpent: number;
}
