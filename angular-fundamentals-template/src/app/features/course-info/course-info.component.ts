import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Author } from '@app/Models/author.model';
import { Course } from '@app/Models/course.model';
import { CoursesStoreService } from '@app/services/courses-store.service';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent {
  course: Course = null;

  activatedRoute:ActivatedRoute = inject(ActivatedRoute);
  router:Router = inject(Router);

  authors:Author[];

  constructor(private coursesStoreService: CoursesStoreService){}
  
  ngOnInit(): void {
    const courseId = this.activatedRoute.snapshot.paramMap.get('id');
    
    if (courseId) {
      this.loadCourseData(courseId);
      this.loadAuthors();
    }
  }

  loadAuthors(): void {
    this.coursesStoreService.getAllAuthors().subscribe({
      next: (authors) => {
        this.authors = authors.result;
      },
      error: (error) => {
        console.error('Error fetching authors:', error);
        alert('Error fetching authors');
      },
    });
  }

  loadCourseData(id: string): void {
    this.coursesStoreService.getCourse(id).subscribe({
      next: (course) => {
        this.course = course.result
      },
      error: (error) => {
        console.error(error);
        alert('Error loading course data');
      }
    });
  }

  getAuthors(authorsArray:string[]|undefined){    
    return this.authors
      .filter(author => authorsArray?.includes(author.id))
      .map(author => author.name)
      .join();
  }

  minuteToHours(min:number|undefined){
    if(min){
      return Math.floor(min/60) + ":" + min%60;
    }
    return 0;
  }

  onBack() {
    this.router.navigate(['/courses']);
  }
}
