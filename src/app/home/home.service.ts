import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
const jsonData = '../../data/lista.json';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HomeService {
  lista$!:Observable<any[]>;
  constructor(private http: HttpClient) {
    if(environment.production){
      this.lista$ = this.http.get<any[]>(`${environment.apiUrl}/data/lista.json`);
    }else{
      this.lista$ = this.http.get<any[]>(jsonData);
    }
  }
}
