import { Question } from '../../domain/question/question.model';

export interface Questionnaire {
  id: number;
  title: string;
  description: string;
  questionCount: number;
  responseCount: number;
  questions: Question[];
}


