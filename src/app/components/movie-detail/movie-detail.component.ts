import { Component, OnInit } from '@angular/core';
import { MovieDetailService } from 'src/app/services/MovieDetailService/movie-detail.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent implements OnInit {
  movieId: any;
  movieInfo: any = {};
  castInfo: any = {};
  objValue: any;
  activeItem: string = 'Most popular';
  isHidden = false;
  statusTrailer = 'hide';
  response: boolean = true;
  addFavoriteMessage: string = '';
  isFavorite: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private service: MovieDetailService,
    private sanitizer: DomSanitizer,
    private movieService: ProfileService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.movieId = parseInt(params['id'], 10);
    });

    this.service.getMovieDeatilInfo(this.movieId).subscribe((response) => {
      this.response = true;
      this.movieInfo = response;

    });

    this.service.getMovieCastInfo(this.movieId).subscribe((response) => {
      this.castInfo = response;
    });

    this.movieService
      .getMovies('favorite', 'movies')
      .subscribe((response: any) => {
        let isFavorite = response['results'].some(
          (x: any) => x.id === this.movieInfo.id
        );
        if (isFavorite) this.isFavorite = true;
      });

    this.hideElement(this.statusTrailer);
  }

  formatRuntime(runtime: number): string {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}m`;
  }

  isActive(item: string): boolean {
    return this.activeItem === item;
  }

  setActive(item: string): void {
    this.activeItem = item;
  }

  getEmbeddedVideoUrl(videoId: string): SafeResourceUrl {
    const url = `https://www.youtube.com/embed/${videoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getTrailer(listResults: any[]): SafeResourceUrl {
    let trailer: any = null;

    listResults.forEach((item) => {
      if (item.name === 'Official Trailer') {
        trailer = item;
      }
    });

    if (trailer !== null) {
      const url = `https://www.youtube.com/embed/${trailer.key}`;

      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    } else {
      return false;
    }
  }

  hideElement(status: string) {
    if (status === 'hide') {
      this.isHidden = true;
    } else {
      this.isHidden = false;
    }
  }

  addFavorite() {
    this.service
      .addFavorite(this.movieId, 'movie', !this.isFavorite)
      .subscribe((response: any) => {
        this.addFavoriteMessage = response['status_message'];
        setTimeout(() => {
          this.addFavoriteMessage = '';
        }, 2000);
        this.isFavorite = !this.isFavorite;
      });
  }
}
