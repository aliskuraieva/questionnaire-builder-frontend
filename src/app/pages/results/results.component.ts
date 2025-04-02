import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuestionnaireService } from '../../core/services/questionnaire.service';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
  quizResults: any;

  constructor(
    private questionnaireService: QuestionnaireService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    const quizId = +this.route.snapshot.paramMap.get('id')!;
    if (isNaN(quizId)) {
      return;
    }

    this.questionnaireService.getQuizResults(quizId).subscribe((results) => {
      this.quizResults = results;
    });
  }
}
