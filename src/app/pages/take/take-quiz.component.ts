import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuestionnaireService } from '../../core/services/questionnaire.service';
import {
  Questionnaire,
  UserResponse,
} from '../../domain/questionnaire/questionnaire.model';

@Component({
  selector: 'app-take-quiz',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './take-quiz.component.html',
  styleUrls: ['./take-quiz.component.scss'],
})
export class TakeQuizComponent implements OnInit {
  quiz: Questionnaire | null = null;
  responses: UserResponse[] = [];
  quizStartedAt: number = 0;
  quizFinishedAt: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private questionnaireService: QuestionnaireService
  ) {}

  ngOnInit(): void {
    const quizId = +this.route.snapshot.paramMap.get('id')!;
    if (isNaN(quizId)) {
      return;
    }
    this.questionnaireService.getQuizById(quizId).subscribe((quiz) => {
      this.quiz = quiz;
    });
  }

  submitQuiz(): void {
    if (this.quiz) {
      const timeTaken = this.quizFinishedAt! - this.quizStartedAt;
      const formattedTime = this.formatTime(timeTaken);
      console.log('Час на проходження тесту:', formattedTime);
    }
  }

  formatTime(milliseconds: number): string {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
}
