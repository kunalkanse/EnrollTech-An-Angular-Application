import { Component, EventEmitter, inject, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { Author } from '@app/Models/author.model';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
})
export class CourseCardComponent implements OnInit {
  @Input() editable: boolean = true;
  @Input() course: {
    id: string;
    title: string;
    description: string;
    creationDate: string;
    duration: number;
    authors: string[];
  } | null = null;

  @Output() clickOnShow = new EventEmitter<string>();

  authorsList: Author[] = [];
  router: Router = inject(Router);
  private coursesStore: CoursesStoreService = inject(CoursesStoreService);

  ngOnInit(): void {
    this.fetchAuthors();
  }

  fetchAuthors(): void {
    this.coursesStore.getAllAuthors().subscribe({
      next: (response: { successful: boolean, result: Author[] }) => {
        if (response.successful) {
          this.authorsList = response.result; 
        } else {
          console.error('Failed to fetch authors');
        }
      },
      error: (error) => {
        console.error('Error fetching authors:', error);
      },
    });
  }

  getAuthors(authorsArray: string[] | undefined): string {
    if (!authorsArray || authorsArray.length === 0) return '';;

    return this.authorsList
      .filter((author) => authorsArray.includes(author.id))
      .map((author) => author.name)
      .join(', ');
  }

  minuteToHours(min: number | undefined): string {
    if (min) {
      return `${Math.floor(min / 60)}:${min % 60}`;
    }
    return '0:00';
  }

  onShowCourse(courseId: string): void {
    this.router.navigate(['courses', courseId]);
  }

  onEditCourse(courseId: string): void {
    this.router.navigate(['courses/edit', courseId]);
  }
}
