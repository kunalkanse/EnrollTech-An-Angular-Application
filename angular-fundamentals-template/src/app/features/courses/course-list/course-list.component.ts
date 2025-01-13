import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
})
export class CourseListComponent {
  @Input() courses:any;
  @Input() editable:boolean = true;

  @Output() showCourse = new EventEmitter<string>();
  @Output() editCourse = new EventEmitter<string>();
  @Output() deleteCourse = new EventEmitter<string>();
}
