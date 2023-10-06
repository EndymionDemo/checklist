import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
const jsonData = '../../data/lista.json';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HomeService {
  lista$:Observable<any[]> = this.http.get<any[]>(jsonData);
  constructor(private http: HttpClient) {

   }
}
