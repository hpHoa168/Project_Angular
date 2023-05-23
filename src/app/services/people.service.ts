import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(private httpClient: HttpClient) { }

  private urlPeople = "https://api.themoviedb.org/3/person/popular?api_key=774ec2a08bc7536a449fe5728331c78a&language=en-US&page=";
  
  getPeople(page: number): Observable<any>{
    return this.httpClient.get<any>(this.urlPeople + page);
  }

}
