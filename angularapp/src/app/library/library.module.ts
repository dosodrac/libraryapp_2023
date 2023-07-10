import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BookEditorComponent } from './books/components/book-editor/book-editor.component';
import { BookListComponent } from './books/components/book-list/book-list.component';
import { LibraryRoutingModule } from './library-routing.module';

@NgModule({
  declarations: [
    BookListComponent,
    BookEditorComponent
  ],
  imports: [
    CommonModule,
    LibraryRoutingModule
  ]
})
export class LibraryModule { }
