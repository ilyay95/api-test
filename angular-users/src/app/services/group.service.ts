import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Group } from '../models/group.model'

const baseURL = 'http://localhost:3000/api/groups';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private httpClient: HttpClient) { }

  readAllGroup():Observable<Group[]> {
    return this.httpClient.get<Group[]>(baseURL);
  }

  read(id): Observable<any> {
    return this.httpClient.get(`${baseURL}/${id}`);
  }

  create(data): Observable<any> {
    return this.httpClient.post(baseURL, data);
  }

  searchByName(name): Observable<Group[]> {
    return this.httpClient.get<Group[]>(`${baseURL}?name=${name}`);
  }
  
  delete(id): Observable<any> {
    return this.httpClient.delete(`${baseURL}/${id}`);
  }
}
