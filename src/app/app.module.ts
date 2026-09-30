import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [ AppComponent, DashboardComponent, CourseListComponent, CourseDetailsComponent, AddCourseComponent, NavbarComponent ],
  imports: [ BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule ],
  providers: [], bootstrap: [AppComponent]
})
export class AppModule { }