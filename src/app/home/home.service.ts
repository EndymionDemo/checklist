import { Injectable } from '@angular/core';
import data from '../../data/lista.json';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HomeService {
  lista$ = of(data);
  constructor() { }
}
