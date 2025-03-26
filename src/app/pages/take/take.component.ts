import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionnaireService } from '../../core/services/questionnaire.service';
import { Questionnaire } from '../../domain/questionnaire/questionnaire.model';

@Component({
  selector: 'app-take',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './take.component.html',
  styleUrls: ['./take.component.scss'],
})
export class TakeComponent implements OnInit {
  questionnaire: Questionnaire | null = null;
  userAnswers: any[] = [];
  startTime: number = 0;
  endTime: number = 0;

  constructor(
    private questionnaireService: QuestionnaireService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.loadQuestionnaire(id);
  }

  loadQuestionnaire(id: number): void {
    this.questionnaireService.getQuestionnaireById(id).subscribe((data) => {
      this.questionnaire = data;
      this.startTime = Date.now();
    });
  }

  onAnswerChange(questionId: number | undefined, newValue: any): void {
    if (questionId !== undefined) {
      this.userAnswers[questionId] = newValue;
    }
  }

  onSubmit(): void {
    this.endTime = Date.now();
    const timeTaken = (this.endTime - this.startTime) / 1000;

    const responses = {
      questionnaireId: this.questionnaire?.id,
      userAnswers: this.userAnswers,
      timeTaken,
    };

    this.questionnaireService.submitAnswers(responses).subscribe((result) => {
      this.router.navigate(['/catalog']);
    });
  }
}
