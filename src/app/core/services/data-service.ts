import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private records = [
    { id: 1, name: 'Alice', role: 'User', status: 'Active' },
    { id: 2, name: 'Bob', role: 'User', status: 'Inactive' },
    { id: 3, name: 'Charlie', role: 'Admin', status: 'Active' },
    { id: 4, name: 'David', role: 'User', status: 'Active' }
  ];

  getRecords(): Observable<any[]> {
    return of(this.records).pipe(delay(1500));
  }
}