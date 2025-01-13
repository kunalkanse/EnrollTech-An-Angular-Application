import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from '@app/services/courses.service';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {

  courseForm!: FormGroup;
  courseId: string | null = null;
  isEditMode: boolean = false;
  allAuthors: { id: string; name: string }[] = [];
  courseAuthors: { id: string; name: string }[] = [];

  constructor(
    public fb: FormBuilder,
    public library: FaIconLibrary,
    private activatedRoute: ActivatedRoute,
    private coursesService: CoursesService,
    private coursesStoreService: CoursesStoreService,
    private router: Router
  ) {
    library.addIconPacks(fas);
  }

  ngOnInit(): void {
    // Initialize the form
    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      duration: ['', [Validators.required, Validators.min(1)]],
      newAuthor: this.fb.group({
        newAuthorName: ['', Validators.minLength(2)]
      })
    });

    this.loadAuthors();

    // Check for courseId from route params to handle edit mode
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      
      if (id) {
        this.courseId = id;
        this.isEditMode = true;
        this.loadAuthors();
        this.loadCourseData(id);
      }
    });
  }

  loadAuthors(): void {
    this.coursesStoreService.getAllAuthors().subscribe({
      next: (authors) => {
        this.allAuthors = authors.result;
      },
      error: (error) => {
        console.error('Error fetching authors:', error);
        alert('Error fetching authors');
      },
    });
  }

  // Load existing course data for editing
  loadCourseData(id: string): void {
    this.coursesStoreService.getCourse(id).subscribe({
      next: (course) => {
        this.courseForm.patchValue({
          title: course.result.title,
          description: course.result.description,
          duration: course.result.duration
        });
        this.courseAuthors = this.allAuthors.filter(author => course.result.authors.includes(author.id));
        this.allAuthors = this.allAuthors.filter(author => !course.result.authors.includes(author.id));
      },
      error: (error) => {
        console.error(error);
        alert('Error loading course data');
      }
    });
  }

  createAuthor(): void {
    const authorName = this.courseForm.get('newAuthor.newAuthorName')?.value;
    if (authorName && authorName.length >= 2) {
      const newAuthor = { name: authorName };
      this.coursesStoreService.createAuthor(newAuthor).subscribe({
        next: (createdAuthor) => {
          this.loadAuthors();
          this.courseForm.get('newAuthor.newAuthorName')?.reset();
        },
        error: (error) => {
          console.error('Error creating author:', error);
          alert('Error creating author');
        },
      });
    }
  }

  addAuthorToCourse(authorId: string): void {
    const author = this.allAuthors.find(a => a.id === authorId);
    if (author) {
      this.courseAuthors.push(author);
      this.allAuthors = this.allAuthors.filter(a => a.id !== authorId);
    }
  }

  // Remove an author from the permanent list
  removeAuthorPermenant(authorId: string): void {
    this.coursesStoreService.deleteAuthor(authorId).subscribe({
      next: () => {
        this.loadAuthors();
      },
      error: (error) => {
        console.error('Error deleting author:', error);
      },
    });
  }

  // Remove an author from the course authors
  removeFromCourseAuthor(authorId: string): void {
    const author = this.courseAuthors.find(a => a.id === authorId);
    if (author) {
      this.allAuthors.push(author);
      this.courseAuthors = this.courseAuthors.filter(a => a.id !== authorId);
    }
  }

  // Handle form submission (either create or update course)
  onSubmit(): void {
    const courseData = {
      title: this.courseForm.get('title').value,
      description: this.courseForm.get('description').value,
      duration: this.courseForm.get('duration').value,
      authors: this.courseAuthors.map(author => author.id)
    };

    if (this.isEditMode && this.courseId) {
      this.coursesService.editCourse(this.courseId, courseData).subscribe({
        next: () => this.router.navigate(['/courses']),
        error: (error) => {
          alert('Error updating course');
          console.error(error);
        }
      });
    } else {
      this.coursesService.createCourse(courseData).subscribe({
        next: () => this.router.navigate(['/courses']),
        error: (error) => {
          alert('Error creating course');
          console.error(error);
        }
      });
    }
  }

  onCancel(){
    this.router.navigate(['/courses']);
  }
}
