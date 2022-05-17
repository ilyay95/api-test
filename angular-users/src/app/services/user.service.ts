import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

const baseURL = 'http://localhost:3000/api/users';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    users: any;

    constructor(private httpClient: HttpClient) { }

    readAll(): Observable<User[]> {
        return this.httpClient.get<User[]>(`${baseURL}/all`);
    }

    readAllQuery(currentPage, pageSize, firstName): Observable<User[]> {
        let params = new HttpParams();
        params = params.append('currentPage', currentPage);
        params = params.append('pageSize', pageSize);

        if (firstName) {
            params = params.append('search', firstName);
        }

        return this.httpClient.get<User[]>(`${baseURL}`, { params: params });
    }

    read(id): Observable<any> {
        return this.httpClient.get(`${baseURL}/${id}`);
    }

    create(data): Observable<any> {
        return this.httpClient.post(baseURL, data);
    }

    update(id, data): Observable<any> {
        return this.httpClient.put(`${baseURL}/${id}`, data);
    }

    delete(id): Observable<any> {
        return this.httpClient.delete(`${baseURL}/${id}`);
    }

    readUsers(): void {
        this.readAll()
            .subscribe(
                data => {
                    this.users = data['users'];
                },
                error => {
                    console.log(error);
                });
    }
}
