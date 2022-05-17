import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Group } from '../models/group.model';

const baseURL = 'http://localhost:3000/api/groups';

@Injectable({
    providedIn: 'root'
})
export class GroupService {

    constructor(private httpClient: HttpClient) { }

    readAllGroup(): Observable<Group[]> {
        return this.httpClient.get<Group[]>(`${baseURL}/all`);
    }

    readAllQuery(currentPage, pageSize, name): Observable<Group[]> {
        let params = new HttpParams();
        params = params.append('currentPage', currentPage);
        params = params.append('pageSize', pageSize);

        if (name) {
            params = params.append('search', name);
        }

        return this.httpClient.get<Group[]>(`${baseURL}`, { params: params });
    }

    getGroup(currentPage, pageSize): Observable<Group[]> {
        return this.httpClient.get<Group[]>(`${baseURL}?currentPage=${currentPage}&pageSize=${pageSize}`);
    }

    read(id): Observable<any> {
        return this.httpClient.get(`${baseURL}/${id}`);
    }

    create(data): Observable<any> {
        return this.httpClient.post(baseURL, data);
    }

    delete(id): Observable<any> {
        return this.httpClient.delete(`${baseURL}/${id}`);
    }
}
