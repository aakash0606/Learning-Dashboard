import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-dashboard',
  template: `
    <h2>Dashboard</h2>
    <div class="grid">
      <div class="card"><h3>Total Courses</h3><p>{{ total }}</p></div>
      <div class="card"><h3>Completed</h3><p>{{ completed }}</p></div>
      <div class="card"><h3>In Progress</h3><p>{{ inProgress }}</p></div>
      <div class="card"><h3>Not Started</h3><p>{{ notStarted }}</p></div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  total = 0; completed = 0; inProgress = 0; notStarted = 0;
  constructor(private courseService: CourseService) {}
  ngOnInit() {
    this.courseService.getCourses().subscribe(courses => {
      this.total = courses.length;
      this.completed = courses.filter(c => c.status === 'Completed').length;
      this.inProgress = courses.filter(c => c.status === 'In Progress').length;
      this.notStarted = courses.filter(c => c.status === 'Not Started').length;
    });
  }
}