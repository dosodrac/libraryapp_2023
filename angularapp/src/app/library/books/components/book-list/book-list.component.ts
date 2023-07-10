import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { BookService } from '../../book.service';
import { IBook } from '../../books';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})

export class BookListComponent implements OnInit {
  pageTitle = 'Book List';
  errorMessage = '';
  sub!: Subscription;

  private _listFilter: string = '';

  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredBooks = this.performFilter(value);
  }

  filteredBooks: IBook[] = [];
  books: IBook[] = [];
  selectedBook!: IBook | null;

  constructor(private bookService: BookService) { }

  searchBooks(query: string) {
    this.bookService.searchBooks(query)
      .subscribe((data: any) => {
        this.books = data.items;
      });
  }

  performFilter(filterBy: string): IBook[] {
    filterBy = filterBy.toLowerCase();
    return this.books.filter((book: IBook) =>
      book.volumeInfo.title.toLocaleLowerCase().includes(filterBy));
  }

  @Output() bookSelected = new EventEmitter<IBook>();

  selectBook(book: IBook) {
    this.selectedBook = book;
    this.bookSelected.emit(book);
  }

  ngOnInit(): void {
    this.sub = this.bookService.getBooks().subscribe({
      next: books => {
        this.books = books;
        this.filteredBooks = this.books;
      },
      error: err => this.errorMessage = err
    })

    throw new Error('Function not implemented.');
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
