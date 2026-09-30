import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Course } from '../models/course.model';

@Injectable({ providedIn: 'root' })
export class CourseService {
  private initialCourses: Course[] = [
    { id: '1', name: 'Angular Basics', description: 'Learn the fundamentals of Angular', status: 'Completed', duration: '2 hours', lessons: 10 },
    { id: '2', name: 'Advanced TypeScript', description: 'Deep dive into TS', status: 'In Progress', duration: '3 hours', lessons: 15 },
    { id: '3', name: 'RxJS for Beginners', description: 'Reactive programming', status: 'Not Started', duration: '1.5 hours', lessons: 8 }
  ];
  private coursesSubject = new BehaviorSubject<Course[]>(this.initialCourses);
  public courses$ = this.coursesSubject.asObservable();

  getCourses(): Observable<Course[]> { return this.courses$; }
  getCourseById(id: string): Course | undefined { return this.coursesSubject.value.find(c => c.id === id); }
  addCourse(course: Course): void { course.id = (this.coursesSubject.value.length + 1).toString(); this.coursesSubject.next([...this.coursesSubject.value, course]); }
  updateCourseStatus(id: string, newStatus: 'Not Started' | 'In Progress' | 'Completed'): void { const updated = this.coursesSubject.value.map(c => c.id === id ? { ...c, status: newStatus } : c); this.coursesSubject.next(updated); }
}