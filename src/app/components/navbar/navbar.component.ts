import { Component } from '@angular/core';
@Component({ selector: 'app-navbar', template: `<nav class="navbar"><a routerLink="/dashboard">Dashboard</a><a routerLink="/courses">Courses</a><a routerLink="/add-course">Add Course</a></nav>` })
export class NavbarComponent { }