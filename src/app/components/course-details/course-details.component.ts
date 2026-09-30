import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-details',
  template: `
    <div *ngIf="course" class="card">
      <h2>{{ course.name }}</h2>
      <p>{{ course.description }}</p>
      <p><strong>Duration:</strong> {{ course.duration }}</p>
      <p><strong>Lessons:</strong> {{ course.lessons }}</p>
      <p><strong>Status:</strong> {{ course.status }}</p>
      <button (click)="startOrContinue()" class="btn" *ngIf="course.status !== 'Completed'">
        {{ course.status === 'Not Started' ? 'Start Course' : 'Continue Course' }}
      </button>
      <button (click)="goBack()" class="btn" style="margin-left: 10px; background: #6c757d;">Back</button>
    </div>
    <div *ngIf="!course">
      <p>Course not found.</p>
      <button (click)="goBack()" class="btn">Back</button>
    </div>
  `
})
export class CourseDetailsComponent implements OnInit {
  course: Course | undefined;
  constructor(private route: ActivatedRoute, private courseService: CourseService, private router: Router) {}
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.course = this.courseService.getCourseById(id);
  }
  startOrContinue() {
    if (this.course) {
      this.courseService.updateCourseStatus(this.course.id, 'In Progress');
      this.course = this.courseService.getCourseById(this.course.id);
    }
  }
  goBack() { this.router.navigate(['/courses']); }
}