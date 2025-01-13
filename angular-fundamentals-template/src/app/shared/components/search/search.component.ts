// import { Component, EventEmitter, Input, Output } from '@angular/core';

// @Component({
//   selector: 'app-search',
//   templateUrl: './search.component.html',
//   styleUrls: ['./search.component.scss']
// })
// export class SearchComponent {
//   @Input() placeholder: string = "Search Courses"
//   @Output() onSearchInputChanges: EventEmitter<string> = new EventEmitter<string>();

//   searchText: string;

//   onSearchButtonClicked() {
//     this.onSearchInputChanges.emit(this.searchText)
//   }
// }



import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchText: string = ''; // Initialize searchText to an empty string
  @Output() onSearchInputChanges: EventEmitter<string> = new EventEmitter<string>();

  // When the button is clicked, emit the current search text
  onSearchButtonClicked() {
    this.onSearchInputChanges.emit(this.searchText);
  }
}
