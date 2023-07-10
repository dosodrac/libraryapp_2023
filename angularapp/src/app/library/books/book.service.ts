import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, tap, throwError } from "rxjs";
import { IBook } from "./books";

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'https://www.googleapis.com/books/v1/volumes?q=trees';

  constructor(private http: HttpClient) { }

  getBooks(): Observable<IBook[]> {
    return this.http.get<IBook[]>(this.apiUrl).pipe(
      map((response: any) => {
        return response.items.map((item: any) => {
          const book: IBook = {
            id: item.id,
            volumeInfo: {
              title: item.volumeInfo.title,
              authors: item.volumeInfo.authors,
              description: item.volumeInfo.description,
              price: item.saleInfo?.listPrice?.amount,
            },
          };
          return book;
        });
      }),
      tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  searchBooks(query: string) {
    const url = `${this.apiUrl}?q=${query}`;
    return this.http.get(url);
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';

    if (err.error instanceof ErrorEvent) {
      errorMessage = `The following error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }

    return throwError(() => errorMessage);
  }
}
