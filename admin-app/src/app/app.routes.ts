import { Routes } from '@angular/router';
import { RegistrationApplicationsComponent } from './components/registration-applications/registration-applications.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseFormComponent } from './components/course-form/course-form.component';

export const routes: Routes = [
    {path: 'applications', component: RegistrationApplicationsComponent},
    {path: 'course-list', component: CourseListComponent},
    {path: 'course-form/:id', component: CourseFormComponent},
    {path: 'course-form', component: CourseFormComponent}
];
