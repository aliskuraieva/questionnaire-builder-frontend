import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Questionnaire,
  UserResponse,
} from '../../domain/questionnaire/questionnaire.model';

@Injectable({
  providedIn: 'root',
})
export class QuestionnaireService {
  private readonly apiUrl = import.meta.env['NG_APP_PUBLIC_API_URL'];

  constructor(private http: HttpClient) {}

  getQuiz(
    page: number = 1,
    pageSize: number = 10
  ): Observable<{ items: Questionnaire[]; totalCount: number }> {
    return this.http.get<{ items: Questionnaire[]; totalCount: number }>(
      `${this.apiUrl}/questionnaires?page=${page}&pageSize=${pageSize}`
    );
  }

  getQuizById(id: number): Observable<Questionnaire> {
    if (!id) throw new Error('Quiz ID is required');
    return this.http.get<Questionnaire>(`${this.apiUrl}/questionnaires/${id}`);
  }

  submitQuizResults(
    responses: UserResponse[],
    timeTaken: number
  ): Observable<any> {
    const results = {
      responses: responses,
      timeTaken: timeTaken,
    };

    return this.http.post('/questionnaires/submit-quiz', results);
  }

  getQuizResults(quizId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/results/${quizId}`);
  }

  createQuiz(questionnaire: Questionnaire): Observable<Questionnaire> {
    return this.http.post<Questionnaire>(
      `${this.apiUrl}/questionnaires`,
      questionnaire
    );
  }

  editQuiz(
    id: number,
    questionnaire: Questionnaire
  ): Observable<Questionnaire> {
    return this.http.put<Questionnaire>(
      `${this.apiUrl}/questionnaires/${id}`,
      questionnaire
    );
  }

  deleteQuiz(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/questionnaires/${id}`);
  }

}
