import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Coffee } from './coffee';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CoffeeService {
  constructor(private httpClient: HttpClient) {}

  getAllCoffees(): Observable<Coffee[]> {
    return this.httpClient.get<Coffee[]>(environment.coffeListUrl);
  }
}
