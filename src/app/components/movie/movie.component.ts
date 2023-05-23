import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

export interface IGenres {
  [key: string]: any;
  genres: Array<String>;
}

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit, OnDestroy {
  sortArr: string[] = [
    'Popularity Ascending',
    'Rating Descending',
    'Rating Ascending',
    'Release Date Descending',
    'Title(A-Z)',
  ];

  showMeArr: string[] = [
    'Everything',
    "Movies I Haven't Seen",
    'Movies I Have Seen',
  ];

  movieTypeArr: string[] = ['Now Playing', 'Upcoming'];

  releaseDateArr: string[] = [
    'Search all releases?',
    'Search all countries?',
    'Premiere',
    'Theatrical (limited)',
    'Theatrical',
    'Physical',
    'TV',
  ];

  isDisplayBtnSearch: boolean = false;
  popularGenres: any;
  popularMovie: any;
  page: number = 1;
  sortValue: any = 'popularity.desc';
  genres: any = '';
  isBot: boolean = false;
  subscribe?: Subscription;
  type: string = 'movie';
  isOpen = {
    sortOpen: false,
    filterOpen: false,
  };

  numSequence(n: number): Array<number> {
    return Array(n);
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (this.page != 1) {
      let pos = window.innerHeight + window.scrollY;
      let max = document.documentElement.scrollHeight;

      console.log(max);
      console.log(pos);

      if (pos >= max - 500 && this.isBot == false) {
        this.isBot = true;
        this.loadMore();
      }
      // if (pos > 1000) this.isBot = false;
    } else return;
  }

  constructor(
    private service: MoviesService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {
    route.url.subscribe((val) => {
      console.log(val);
      this.type = val[0].path;
    });
  }

  ngOnInit() {
    this.loading();
    this.service.getGenres(this.type).subscribe((response) => {
      this.popularGenres = Object.values(response)[0];
    });

    this.subscribe = this.service
      .getPopularMovies(this.page, this.sortValue, this.genres, this.type)
      .subscribe((response) => {
        console.log(response);
        this.popularMovie = Object.values(response)[1];
        console.log(this.popularMovie);
      });
  }

  getMovies() {
    this.subscribe = this.service
      .getPopularMovies(this.page, this.sortValue, this.genres, this.type)
      .subscribe((response) => {
        this.popularMovie = Object.values(response)[1];
        console.log(this.popularMovie);
      });
  }

  loading() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }

  open(type: string) {
    type === 'sort'
      ? (this.isOpen.sortOpen = !this.isOpen.sortOpen)
      : (this.isOpen.filterOpen = !this.isOpen.filterOpen);
  }
  loadMore() {
    if (this.page < 1000) {
      this.page++;
      this.subscribe = this.service
        .getPopularMovies(this.page, this.sortValue, this.genres, this.type)
        .subscribe((response) => {
          this.popularMovie = [
            ...this.popularMovie,
            ...Object.values(response)[1],
          ];
          console.log(this.popularMovie);
          this.isBot = false;
        });
    }
  }

  onSubmit(form: NgForm) {
    this.page = 1;
    this.loading();
    console.log(form.value.sort);
    this.sort(form.value.sort);
    this.filterGenre(form.value);
    this.getMovies();
  }

  // search() {
  //   this.isDisplayBtnSearch = true;
  // }

  filterGenre(genres: any) {
    this.genres = '';
    for (const [key, value] of Object.entries(genres)) {
      if (value) this.genres = this.genres + key + '%2C';
    }
  }

  sort(value: string) {
    switch (value) {
      case '0':
        this.sortValue = 'popularity.desc';
        break;
      case '1':
        this.sortValue = 'popularity.asc';
        break;
      case '2':
        this.sortValue = 'vote_average.desc';
        break;
      case '3':
        this.sortValue = 'vote_average.asc';
        break;
      case '4':
        this.sortValue = 'release_date.desc';
        break;
      case '5':
        this.sortValue = 'original_title.asc';
        break;
      default:
        this.sortValue = 'popularity.desc';
        break;
    }
  }

  ngOnDestroy() {
    if (this.subscribe) {
      this.subscribe.unsubscribe();
    }
  }
}
