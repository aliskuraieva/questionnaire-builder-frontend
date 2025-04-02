import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { QuestionnaireService } from '../../core/services/questionnaire.service';
import {
  Questionnaire,
  Question,
} from '../../domain/questionnaire/questionnaire.model';

@Component({
  selector: 'app-create-quiz',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.scss'],
})
export class CreateQuizComponent implements OnInit {
  quiz: Questionnaire = {
    id: 0,
    title: 'New Quiz',
    description: 'A description of the new quiz',
    questions: [],
  };

  constructor(
    private questionnaireService: QuestionnaireService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  addQuestion(): void {
    this.quiz.questions.push({
      questionText: '',
      type: 'text',
      choices: [],
      answers: [],
    });
  }

  removeQuestion(index: number): void {
    this.quiz.questions.splice(index, 1);
  }

  addChoice(questionIndex: number): void {
    this.quiz.questions[questionIndex].choices.push('');
  }

  removeChoice(questionIndex: number, choiceIndex: number): void {
    this.quiz.questions[questionIndex].choices.splice(choiceIndex, 1);
  }

  addAnswerInput(questionIndex: number): void {
    this.quiz.questions[questionIndex].answers.push('');
  }

  removeAnswer(questionIndex: number, answerIndex: number): void {
    this.quiz.questions[questionIndex].answers.splice(answerIndex, 1);
  }

  saveQuiz(): void {
    this.questionnaireService.createQuiz(this.quiz).subscribe(() => {
      this.router.navigate(['/catalog']);
    });
  }

  goToCatalog(): void {
    this.router.navigate(['/catalog']);
  }
}
