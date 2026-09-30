import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-add-course',
  template: `
    <div class="card">
      <h2>Add New Course</h2>
      <form [formGroup]="courseForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label>Course Name</label>
          <input formControlName="name" type="text">
          <div *ngIf="courseForm.get('name')?.invalid && courseForm.get('name')?.touched" class="error">Name is required.</div>
        </div>
        <div class="form-group">
          <label>Description</label>
          <textarea formControlName="description"></textarea>
          <div *ngIf="courseForm.get('description')?.invalid && courseForm.get('description')?.touched" class="error">Description is required.</div>
        </div>
        <div class="form-group">
          <label>Duration</label>
          <input formControlName="duration" type="text">
          <div *ngIf="courseForm.get('duration')?.invalid && courseForm.get('duration')?.touched" class="error">Duration is required.</div>
        </div>
        <div class="form-group">
          <label>Number of Lessons</label>
          <input formControlName="lessons" type="number">
          <div *ngIf="courseForm.get('lessons')?.invalid && courseForm.get('lessons')?.touched" class="error">Valid number required (min 1).</div>
        </div>
        <div class="form-group">
          <label>Status</label>
          <select formControlName="status">
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <button type="submit" [disabled]="courseForm.invalid" class="btn">Save Course</button>
      </form>
    </div>
  `
})
export class AddCourseComponent {
  courseForm: FormGroup;
  constructor(private fb: FormBuilder, private courseService: CourseService, private router: Router) {
    this.courseForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      duration: ['', Validators.required],
      lessons: [1, [Validators.required, Validators.min(1)]],
      status: ['Not Started']
    });
  }
  onSubmit() {
    if (this.courseForm.valid) {
      this.courseService.addCourse(this.courseForm.value);
      this.router.navigate(['/courses']);
    }
  }
}