import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private httpClient: HttpClient) {}

  getGenres(type: any) {
    let urlGenres = `https://api.themoviedb.org/3/genre/${type}/list?api_key=774ec2a08bc7536a449fe5728331c78a&language=en-US`;

    return this.httpClient.get(urlGenres);
  }

  // getLanguage() {
  //   return this.httpClient.get(this.urlGenres);
  // }

  getPopularMovies(page: number, sort: string, genres: any, type: any) {
    let url = `https://api.themoviedb.org/3/discover/${type}?api_key=774ec2a08bc7536a449fe5728331c78a&language=en-US&sort_by=${sort}&with_genres=${genres}&page=${page}`;

    console.log(url);
    return this.httpClient.get(url);
  }
}
