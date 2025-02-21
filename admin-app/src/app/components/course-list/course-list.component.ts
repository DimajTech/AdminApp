import { CommonModule} from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Course } from '../../models/course.model';
import { CourseFormComponent } from '../course-form/course-form.component';
import { Router, RouterLink } from '@angular/router';
import { CourseService } from '../../services/course.service';


@Component({
  selector: 'app-course-list',
  imports: [CommonModule,
    MatIconModule,],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent implements OnInit {
  constructor(
    private courseService: CourseService,
    private router: Router
  ) { }

  courses: Course[] = [];
  displayedColumns: string[] = ['code', 'name', 'semester', 'year', 'isActive', 'actions'];

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getCourses().subscribe(
      courses => this.courses = courses
    );
  }

  deleteCourse(course: Course): void {
    if (confirm('¿Está seguro de eliminar este curso?')) {
      this.courseService.deleteCourse(course.id!).subscribe(() => {
        this.loadCourses();
      });
    }
  }

  add(){
    this.router.navigate(['/course-form/'], );
  }

  update(course: Course){
    this.router.navigate(['/course-form/', course.id]);
  }
}
