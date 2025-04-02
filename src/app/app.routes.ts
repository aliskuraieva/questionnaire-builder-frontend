import { Routes } from '@angular/router';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { CreateQuizComponent } from './pages/create-edit/create-quiz.component';
import { TakeQuizComponent } from './pages/take/take-quiz.component';

export const routes: Routes = [
  { path: 'catalog', component: CatalogComponent },
  { path: 'create-edit', component: CreateQuizComponent },
  { path: 'create-edit/:id', component: CreateQuizComponent },
  { path: 'take/:id', component: TakeQuizComponent },
  { path: '', redirectTo: '/catalog', pathMatch: 'full' },
  { path: '**', redirectTo: '/catalog' },
];

