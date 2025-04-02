import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { QuestionnaireService } from '../../core/services/questionnaire.service';
import { Questionnaire } from '../../domain/questionnaire/questionnaire.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quiz-catalog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  quizzes: Questionnaire[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;
  totalItems: number = 0;
  selectedQuiz: Questionnaire | null = null;
  isModalOpen: boolean = false;

  constructor(
    private questionnaireService: QuestionnaireService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadQuizzes();
  }

  loadQuizzes(): void {
    this.questionnaireService
      .getQuiz(this.currentPage, this.pageSize)
      .subscribe((data) => {
        this.quizzes = data.items;
        this.totalItems = data.totalCount;
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);
      });
  }

  onPageChange(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    this.loadQuizzes();
  }

  createQuiz(): void {
    this.router.navigate(['/create-edit']);
  }

  startQuiz(quizId: number | undefined): void {
    if (quizId !== undefined) {
      this.router.navigate(['/take', quizId]);
    } else {
      console.error('Quiz ID is undefined');
    }
  }

  editQuiz(quizId: number): void {
    this.router.navigate(['/create-edit', quizId]);
  }

  deleteQuiz(quizId: number): void {
    if (confirm('Are you sure you want to delete this quiz?')) {
      this.questionnaireService.deleteQuiz(quizId).subscribe({
        next: () => {
          this.loadQuizzes();
        },
        error: (error) => {
          console.error('Error deleting quiz:', error);
        },
      });
    }
  }
}
