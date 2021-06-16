import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from './user';
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class UserService {

  private usersUrl = 'http://localhost:3000/api/users';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl)
      .pipe(
        tap(_ => this.log('fetched users')),
        catchError(this.handleError<User[]>('getUsers', []))
      );
  }

  getUserNo404<Data>(id: number): Observable<User> {
    const url = `${this.usersUrl}/?id=${id}`;
    return this.http.get<User[]>(url)
      .pipe(
        map(users => users[0]),
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} user id=${id}`);
        }),
        catchError(this.handleError<User>(`getUser id=${id}`))
      );
  }

  getUser(id: number): Observable<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<User>(url).pipe(
      tap(_ => this.log(`fetched user id=${id}`)),
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  searchUsers(term: string): Observable<User[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<User[]>(`${this.usersUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found users matching "${term}"`) :
        this.log(`no users matching "${term}"`)),
      catchError(this.handleError<User[]>('searchUsers', []))
    );
  }

  addUser(data: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, data, this.httpOptions).pipe(
      tap((newUser: User) => this.log(`added user w/ id=${newUser.id}`)),
      catchError(this.handleError<User>('addUser'))
    );
  }

  deleteUser(data: User | number): Observable<User> {
    const id = typeof data['users'] === 'number' ? data['users'] : data['users'].id;
    const url = `${this.usersUrl}/${id}`;

    return this.http.delete<User>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted user id=${id}`)),
      catchError(this.handleError<User>('deleteUser'))
    );
  }

  updateUser(data: User): Observable<any> {
    return this.http.put(this.usersUrl, data['users'], this.httpOptions).pipe(
      tap(_ => this.log(`updated user id=${data['users'].id}`)),
      catchError(this.handleError<any>('updateUser'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
  private log(message: string) {
    this.messageService.add(`UserService: ${message}`);
  }
}
