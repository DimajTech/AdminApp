import { Routes } from '@angular/router';
import { RegistrationApplicationsComponent } from './components/registration-applications/registration-applications.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseFormComponent } from './components/course-form/course-form.component';
import { NewsComponent } from './components/news/news.component';
import { NewsDetailsComponent } from './components/news-details/news-details.component';
import { CreateNewsComponent } from './components/create-news/create-news.component';

export const routes: Routes = [
    {path: 'applications', component: RegistrationApplicationsComponent},
    {path: 'news', component: NewsComponent},
    {path: 'createNews', component: CreateNewsComponent},
    {path: 'news/:id', component: NewsDetailsComponent},
    {path: '', component: NewsComponent},
    {path: 'course-list', component: CourseListComponent},
    {path: 'course-form/:id', component: CourseFormComponent},
    {path: 'course-form', component: CourseFormComponent}
];
