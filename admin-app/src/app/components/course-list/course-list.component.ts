import { CommonModule} from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Course } from '../../models/course.model';
import { Router, RouterLink } from '@angular/router';
import { CourseService } from '../../services/course.service';
import Swal from 'sweetalert2';

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
    Swal.fire({
      title: '¿Seguro que lo desea eliminar?',
      text: 'Esta acción no se puede deshacer.',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result: any) => {
      if (result.isConfirmed) {
        try{
          this.courseService.deleteCourse(course.id!).subscribe({
            next: () => {
              this.deleteCourseInProfessor(course.id);
              this.deleteCourseInStudent(course.id);
              Swal.fire('Eliminado', 'El curso ha sido eliminado exitosamente.', 'success');
              this.loadCourses();
            },
            error: (e) => console.error(e),
          });
        }catch(error){
          console.error('Error deleting course:', error);
          Swal.fire('Error', 'Un error ha ocurrido al eliminar el curso.', 'error');
        }

      }
    });
  }

  add(){
    this.router.navigate(['/course-form/'], );
  }

  update(course: Course){
    this.router.navigate(['/course-form/', course.id]);
  }

  //----------PROFESSOR METHODS----------
  deleteCourseInProfessor(id: string | undefined) {
    this.courseService.deleteCourseInProfessor(id).subscribe({
      error: (e) => console.error(e)
    });
  }


  //----------STUDENT METHODS----------
  deleteCourseInStudent(id : string | undefined) {
    this.courseService.deleteCourseInStudent(id).subscribe({
      error: (e) => console.error(e)
    });
  }
}
