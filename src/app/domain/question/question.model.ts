export interface Question {
  id?: number;
  text: string;
  type: 'text' | 'single-choice' | 'multiple-choice';
  choices: string[];
}
