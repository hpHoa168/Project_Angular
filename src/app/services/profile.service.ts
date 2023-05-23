import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environmemts';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private httpClient: HttpClient) {}

  isLogin: boolean = false;

  getMovies(type: any, movieOrTV: any) {
    let urlFav = `https://api.themoviedb.org/3/account/19421463/${type}/${movieOrTV}?api_key=${environment.api_key}&session_id=${environment.session_id}`;
    return this.httpClient.get(urlFav);
  }

  removeFavorite(id: any, movieOrTV: any) {
    console.log(id, movieOrTV);
    let urlFav = `https://api.themoviedb.org/3/account/${environment.account_id}/favorite?api_key=${environment.api_key}&session_id=${environment.session_id}`;
    return this.httpClient.post(urlFav, {
      media_type: movieOrTV == 'movies' ? 'movie' : 'tv',
      media_id: id,
      favorite: false,
    });
  }
}
