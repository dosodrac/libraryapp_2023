import { Component, Input } from '@angular/core';
import { IBook } from '../../books';

@Component({
  selector: 'app-book-editor',
  templateUrl: './book-editor.component.html',
})
export class BookEditorComponent {
  @Input() book: IBook | null | undefined;
}
