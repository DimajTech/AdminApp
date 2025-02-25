import { Routes } from '@angular/router';
import { RegistrationApplicationsComponent } from './components/registration-applications/registration-applications.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseFormComponent } from './components/course-form/course-form.component';
import { NewsComponent } from './components/news/news.component';
import { NewsDetailsComponent } from './components/news-details/news-details.component';
import { CreateNewsComponent } from './components/create-news/create-news.component';
import { RegisterProfessorComponent } from './components/register-professor/register-professor.component';
import { AdvisementsComponent } from './components/advisements/advisements.component'; 

import { authGuard } from './auth.guard';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [

    { path: 'applications', component: RegistrationApplicationsComponent, canActivate: [authGuard] },
    { path: 'news', component: NewsComponent, canActivate: [authGuard] },
    { path: 'createNews', component: CreateNewsComponent, canActivate: [authGuard] },
    { path: 'courses', component: CourseListComponent, canActivate: [authGuard] },
    { path: 'news/:id', component: NewsDetailsComponent, canActivate: [authGuard]},
    { path: 'course-form/:id', component: CourseFormComponent, canActivate: [authGuard]}, 
    { path: 'course-form', component: CourseFormComponent, canActivate: [authGuard] },
    { path: 'registerProfessor', component: RegisterProfessorComponent }, //todo canActivate
    { path: 'advisements', component: AdvisementsComponent, canActivate: [authGuard] }, 
    { path: 'login', component: LoginComponent },
    { path: '', component: NewsComponent, canActivate: [authGuard]}
];
