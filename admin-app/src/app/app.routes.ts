import { Routes } from '@angular/router';
import { RegistrationApplicationsComponent } from './components/registration-applications/registration-applications.component';
import { NewsComponent } from './components/news/news.component';
import { NewsDetailsComponent } from './components/news-details/news-details.component';
import { CreateNewsComponent } from './components/create-news/create-news.component';
import { RegisterProfessorComponent } from './components/register-professor/register-professor.component';

export const routes: Routes = [
  { path: 'applications', component: RegistrationApplicationsComponent },
  { path: 'news', component: NewsComponent },
  { path: 'createNews', component: CreateNewsComponent },
  { path: 'news/:id', component: NewsDetailsComponent },
  { path: 'registerProfessor', component: RegisterProfessorComponent },
  { path: '', component: NewsComponent },
];
