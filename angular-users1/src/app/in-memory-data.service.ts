import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users = [
      { id: 11, name: 'Dr Nice' , age: 12},
      { id: 12, name: 'Narco', age: 23 },
      { id: 13, name: 'Bombasto', age: 13 },
      { id: 14, name: 'Celeritas', age: 77 },
      { id: 15, name: 'Magneta', age: 10 },
      { id: 16, name: 'RubberMan', age: 63 },
      { id: 17, name: 'Dynama', age: 18 },
      { id: 18, name: 'Dr IQ', age: 19 },
      { id: 19, name: 'Magma', age: 17},
      { id: 20, name: 'Tornado', age: 13 }
    ];
    return {users};
  }

  genId(users: User[]): number {
    return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 11;
  }
}
