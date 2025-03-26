import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Questionnaire } from '../../domain/questionnaire/questionnaire.model';

@Injectable({
  providedIn: 'root',
})
export class QuestionnaireService {
  private readonly apiUrl = import.meta.env['NG_APP_PUBLIC_API_URL'];

  constructor(private http: HttpClient) {}

  getQuestionnaires(
    page: number = 1,
    pageSize: number = 10
  ): Observable<{ items: Questionnaire[]; totalCount: number }> {
    return this.http.get<{ items: Questionnaire[]; totalCount: number }>(
      `${this.apiUrl}/questionnaires?page=${page}&pageSize=${pageSize}`
    );
  }

  getQuestionnaireById(id: number): Observable<Questionnaire> {
    return this.http.get<Questionnaire>(`${this.apiUrl}/questionnaires/${id}`);
  }

  createQuestionnaire(questionnaire: Questionnaire): Observable<Questionnaire> {
    return this.http.post<Questionnaire>(
      `${this.apiUrl}/questionnaires`,
      questionnaire
    );
  }

  updateQuestionnaire(
    id: number,
    questionnaire: Questionnaire
  ): Observable<Questionnaire> {
    return this.http.put<Questionnaire>(
      `${this.apiUrl}/questionnaires/${id}`,
      questionnaire
    );
  }

  deleteQuestionnaire(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/questionnaires/${id}`);
  }

  submitAnswers(responses: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/questionnaires/submit`, responses);
  }

}
