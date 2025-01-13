import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesService } from '@app/services/courses.service'; // Adjust the path as per your project structure
import { CoursesStoreService } from '@app/services/courses-store.service'; // Adjust the path as per your project structure
import { Course } from '@app/Models/course.model'; // Replace with your actual Course model path

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courseList: Course[] = [];
  filteredCourseList: Course[] = []; 
  errorMessage: string | null = null;
  isLoading = true;

  constructor(
    private router: Router,
    private courseService: CoursesService,
    private courseStore: CoursesStoreService
  ) {}
  

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.courseService.getAll().subscribe({
      next: (response: any) => {
        if (response && response.successful && Array.isArray(response.result)) {
          this.courseList = response.result;
          this.filteredCourseList = [...this.courseList];
        } else {
          this.errorMessage = 'Invalid response structure from the server.';
        }
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error fetching courses:', error);
        this.errorMessage = 'Failed to load courses. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  onSearchInputChanges(searchTerm: string): void {
    if (searchTerm.trim() === '') {
      // If search term is empty, show all courses
      this.filteredCourseList = [...this.courseList];
    } else {
      // Filter courses locally based on the search term
      this.filteredCourseList = this.courseList.filter((course) =>
        course.title.toLowerCase().includes(searchTerm.trim().toLowerCase())
      );
    }
  }

  onAddCourse(): void {
    this.router.navigate(['/courses/addCourse']);
  }
}
