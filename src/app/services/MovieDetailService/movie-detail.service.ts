import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environmemts';

@Injectable({
  providedIn: 'root',
})
export class MovieDetailService {
  constructor(private httpClient: HttpClient) {}

  // Movie
  getMovieDeatilInfo(movieId: string) {
    let url =
      'https://api.themoviedb.org/3/movie/' +
      movieId +
      '?api_key=e9e9d8da18ae29fc430845952232787c&append_to_response=videos';

    return this.httpClient.get(url);
  }

  getMovieCastInfo(movieId: string) {
    let url =
      'https://api.themoviedb.org/3/movie/' +
      movieId +
      '/casts?api_key=e9e9d8da18ae29fc430845952232787c';

    return this.httpClient.get(url);
  }

  // Tvshow
  getTvShowDeatilInfo(idTvShow: string) {
    let url =
      'https://api.themoviedb.org/3/tv/' +
      idTvShow +
      '?api_key=e9e9d8da18ae29fc430845952232787c&append_to_response=videos';

    return this.httpClient.get(url);
  }

  getTvShowCastInfo(idTvShow: string) {
    let url =
      'https://api.themoviedb.org/3/tv/' +
      idTvShow +
      '/credits?api_key=e9e9d8da18ae29fc430845952232787c';

    return this.httpClient.get(url);
  }

  addFavorite(id: any, type: string, isFavorite: boolean) {
    let urlFav = `https://api.themoviedb.org/3/account/${environment.account_id}/favorite?api_key=${environment.api_key}&session_id=${environment.session_id}`;
    return this.httpClient.post(urlFav, {
      media_type: type,
      media_id: id,
      favorite: isFavorite,
    });
  }
}
