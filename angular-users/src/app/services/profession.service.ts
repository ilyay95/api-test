import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profession } from '../models/profession.model'

const baseURL = 'http://localhost:3000/api/professions';

@Injectable({
  providedIn: 'root'
})
export class ProfessionService {

  constructor(private httpClient: HttpClient) { }

  readAllProfession(): Observable<Profession[]> {
    return this.httpClient.get<Profession[]>(baseURL);
  }
}
