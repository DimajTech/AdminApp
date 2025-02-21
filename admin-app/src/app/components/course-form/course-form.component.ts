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
    this.courseService.saveCourse(this.course).subscribe({
      error: (e) => console.error(e),
      complete: () => this.router.navigate(['/course-list'])
    });
  }

  onDelete() {
    if (this.course.id && confirm('¿Está seguro que desea eliminar este curso?')) {
      this.courseService.deleteCourse(this.course.id).subscribe({
        next: () => this.router.navigate(['/course-list']),
        error: (e) => console.error(e)
      });
    }
  }

  Cancel(){
    this.router.navigate(['/course-list']);
  }
}