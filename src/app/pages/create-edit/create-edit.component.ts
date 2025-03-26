import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionnaireService } from '../../core/services/questionnaire.service';
import { Questionnaire } from '../../domain/questionnaire/questionnaire.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.scss'],
})
export class CreateEditComponent implements OnInit {
  questionnaire: Questionnaire = {
    id: 0,
    title: '',
    description: '',
    questionCount: 0,
    responseCount: 0,
    questions: [],
  };

  constructor(
    private route: ActivatedRoute,
    private questionnaireService: QuestionnaireService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loadQuestionnaire(id);
    }
  }

  loadQuestionnaire(id: number): void {
    this.questionnaireService.getQuestionnaireById(id).subscribe((data) => {
      this.questionnaire = data;
    });
  }

  saveQuestionnaire(): void {
    const request$ = this.questionnaire.id
      ? this.questionnaireService.updateQuestionnaire(
          this.questionnaire.id,
          this.questionnaire
        )
      : this.questionnaireService.createQuestionnaire(this.questionnaire);

    request$.subscribe(() => {
      this.router.navigate(['/catalog']);
    });
  }

  addQuestion(): void {
    this.questionnaire.questions.push({
      text: '',
      type: 'text',
      choices: [],
    });
  }

  removeQuestion(index: number): void {
    this.questionnaire.questions.splice(index, 1);
  }

  addChoice(questionIndex: number): void {
    if (!this.questionnaire.questions[questionIndex].choices) {
      this.questionnaire.questions[questionIndex].choices = [];
    }
    this.questionnaire.questions[questionIndex].choices.push('');
  }

  removeChoice(questionIndex: number, choiceIndex: number): void {
    this.questionnaire.questions[questionIndex].choices?.splice(choiceIndex, 1);
  }
}
