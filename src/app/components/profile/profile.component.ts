import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProfileService } from 'src/app/services/profile.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  subscribe?: Subscription;
  removeSub?: Subscription;
  type: string = 'favorite';
  movieOrTV: string = 'movies';
  movies: any;
  removeFavoriteMessage: string = '';

  constructor(private service: ProfileService, private route: ActivatedRoute) {
    route.url.subscribe((val) => {
      console.log(val);
      this.type = val[1].path;
    });
  }

  ngOnInit(): void {
    this.loadMovies(this.type, this.movieOrTV);
  }

  changeMovieTV(type: string) {
    this.movieOrTV = this.movieOrTV === 'movies' ? 'tv' : 'movies';
    this.loadMovies(this.type, type);
  }

  loadMovies(type: string, movieOrTV: string) {
    this.subscribe = this.service
      .getMovies(type, movieOrTV)
      .subscribe((response) => {
        this.movies = Object.values(response)[1];
        console.log(this.movies);
      });
  }

  removeFavorite(id: string) {
    this.removeSub = this.service
      .removeFavorite(id, this.movieOrTV === 'movies' ? 'movies' : 'tv')
      .subscribe((response: any) => {
        this.movies = this.movies.filter((e: any) => e.id !== id);
        console.log(response);
        this.removeFavoriteMessage = response['status_message'];

        setTimeout(() => {
          this.removeFavoriteMessage = '';
        }, 2000);
      });
  }

  ngOnDestroy(): void {
    if (this.subscribe) {
      this.subscribe.unsubscribe();
    }
    if (this.removeSub) {
      this.removeSub.unsubscribe();
    }
  }
}
