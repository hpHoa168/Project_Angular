import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchMovieService {
  searchWord: string = '';

  constructor(private http: HttpClient) { }

  setSearchWord(word: string){
    this.searchWord = word
  }

  searchMovie(searchWord: any, page: number): Observable<any>{    
    return this.http.get<any>(`https://api.themoviedb.org/3/search/movie?api_key=774ec2a08bc7536a449fe5728331c78a&query=${searchWord}&include_adult=false&language=en-US&page=${page}`);
  }

  searchTV(searchWord: any, page: number){
    return this.http.get<any>(`https://api.themoviedb.org/3/search/tv?api_key=774ec2a08bc7536a449fe5728331c78a&query=${searchWord}&include_adult=false&language=en-US&page=${page}`);
  }

  searchPeople(searchWord: any, page: number){
    return this.http.get<any>(`https://api.themoviedb.org/3/search/person?api_key=774ec2a08bc7536a449fe5728331c78a&query=${searchWord}&include_adult=false&language=en-US&page=${page}`);
  }
}
