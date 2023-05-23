import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(private http: HttpClient) { }

  getTodayTrend(): Observable<any> {
    return this.http.get<any>("https://api.themoviedb.org/3/trending/all/day?api_key=774ec2a08bc7536a449fe5728331c78a");
  }

  getThisWeekTrend(): Observable<any>{
    return this.http.get<any>("https://api.themoviedb.org/3/trending/all/week?api_key=774ec2a08bc7536a449fe5728331c78a");
  }

  getTrailerMovie(): Observable<any>{
    return this.http.get<any>("https://api.themoviedb.org/3/discover/movie?api_key=774ec2a08bc7536a449fe5728331c78a&with_genres=35");
  }

  getTrailerTV(): Observable<any>{
    return this.http.get<any>("https://api.themoviedb.org/3/discover/tv?api_key=774ec2a08bc7536a449fe5728331c78a&language=en-US&sort_by=first_air_date.desc&page=1&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0");
  }

  getTvPopular(): Observable<any> {
    return this.http.get<any>("https://api.themoviedb.org/3/tv/popular?api_key=774ec2a08bc7536a449fe5728331c78a&language=en-US&page=1");
  }

  getMoviePopular(): Observable<any>{
    return this.http.get<any>("https://api.themoviedb.org/3/movie/popular?api_key=774ec2a08bc7536a449fe5728331c78a&language=en-US&page=1");
  }

  getTrailer(id: string, type: string ): Observable<any>{
    return this.http.get<any>(`https://api.themoviedb.org/3/${type}/${id}?api_key=e9e9d8da18ae29fc430845952232787c&append_to_response=videos`);
  }
}
