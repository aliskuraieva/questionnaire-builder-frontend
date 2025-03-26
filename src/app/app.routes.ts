import { Routes } from '@angular/router';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { CreateEditComponent } from './pages/create-edit/create-edit.component';
import { TakeComponent } from './pages/take/take.component';

export const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'catalog', component: CatalogComponent },
  { path: 'create-edit/:id', component: CreateEditComponent },
  { path: 'create-edit', component: CreateEditComponent },
  { path: 'take/:id', component: TakeComponent },
  { path: 'take', component: TakeComponent },
];
