import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-list',
  template: `
    <h2>Course List</h2>
    <div class="card">
      <input type="text" placeholder="Search courses..." [(ngModel)]="searchTerm" (input)="filterCourses()" style="padding: 8px; margin-right: 10px;">
      <select [(ngModel)]="statusFilter" (change)="filterCourses()" style="padding: 8px; margin-right: 10px;">
        <option value="All">All Statuses</option>
        <option value="Not Started">Not Started</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <button (click)="sortCourses()" class="btn">Sort by Name</button>
    </div>
    <div class="grid">
      <div class="card" *ngFor="let c of filteredCourses">
        <h3>{{ c.name }}</h3>
        <p>{{ c.description }}</p>
        <p><strong>Status:</strong> {{ c.status }}</p>
        <p><strong>Duration:</strong> {{ c.duration }}</p>
        <a [routerLink]="['/courses', c.id]" class="btn">View Details</a>
      </div>
    </div>
  `
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  searchTerm = '';
  statusFilter = 'All';
  sortAsc = true;

  constructor(private courseService: CourseService) {}
  ngOnInit() {
    this.courseService.getCourses().subscribe(data => {
      this.courses = data;
      this.filterCourses();
    });
  }
  filterCourses() {
    this.filteredCourses = this.courses.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus = this.statusFilter === 'All' || c.status === this.statusFilter;
      return matchesSearch && matchesStatus;
    });
  }
  sortCourses() {
    this.sortAsc = !this.sortAsc;
    this.filteredCourses.sort((a, b) => {
      return this.sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    });
  }
}