import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
const jsonData = '../../data/lista.json';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class HomeService {
  lista$:Observable<any[]> = this.http.get<any[]>(`${environment.apiUrl}/data/lista.json`);
  constructor(private http: HttpClient) {

   }
}
