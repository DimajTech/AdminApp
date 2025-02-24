import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course.service';

interface Professor {
  id: string;
  name: string;
}

@Component({
  selector: 'app-course-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.css'
})
export class CourseFormComponent implements OnInit {
  @Input() course: Course = {
    id: '',
    code: '',
    name: '',
    professorId: '',
    professorName: '',
    semester: '',
    year: new Date().getFullYear(),
    isActive: true
  };

  professors: Professor[] = [];

  constructor(
    private courseService: CourseService,
    private activeroute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProfessors();
    
    const id = this.activeroute.snapshot.params['id'];
    if (id) {
      this.courseService.getCourseById(id).subscribe((data: any) => {
        this.course = data;
      });
    }
  }

  loadProfessors() {
    this.courseService.getProfessors().subscribe((data: any) => {
      this.professors = data;
    });
  }

  onProfessorChange(event: any) {
    const selectedProfessor = this.professors.find(
      prof => prof.id === event.target.value
    );
    if (selectedProfessor) {
      this.course.professorName = selectedProfessor.name;
    }
  }

  onSubmit() {
    const id = this.activeroute.snapshot.params['id'];
    if (id){
      this.courseService.saveCourseInAdmin(this.course).subscribe({
        next: (course) => {
          this.updateCourseInProfessor(course)
          this.updateCourseInStudent(course)
        },
        error: (e) => console.error(e),
        complete: () => this.router.navigate(['/courses'])
      });
    }else{
      this.courseService.saveCourseInAdmin(this.course).subscribe({
        next: (course) => {
          this.saveCourseInProfessor(course)
          this.saveCourseInStudent(course)
        },
        error: (e) => console.error(e),
        complete: () => this.router.navigate(['/courses'])
      });
    }
    
  }

  onDelete() {
    if (this.course.id && confirm('¿Está seguro que desea eliminar este curso?')) {
      this.courseService.deleteCourse(this.course.id).subscribe({
        next: () => this.router.navigate(['/courses']),
        error: (e) => console.error(e)
      });
    }
  }

  Cancel(){
    this.router.navigate(['/courses']);
  }

  //----------PROFESSOR METHODS----------
  saveCourseInProfessor(course: Course) {
    this.courseService.saveCourseInProfessor(course).subscribe({
      error: (e) => console.error(e),
    });
  }

  updateCourseInProfessor(course: Course) {
    this.courseService.updateCourseInProfessor(course).subscribe({
      error: (e) => console.error(e),
    });
  }

  //----------STUDENT METHODS----------
  saveCourseInStudent(course: Course) {
    this.courseService.saveCourseInStudent(course).subscribe({
      error: (e) => console.error(e)
    });
  }
  
  updateCourseInStudent(course: Course) {
    this.courseService.updateCourseInStudent(course).subscribe({
      error: (e) => console.error(e)
    });
  }
  
}