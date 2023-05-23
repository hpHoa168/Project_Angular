import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchMovieService } from 'src/app/services/search-movie.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  totalPage: number = 0;
  contentSearch: any;
  pagination: number = 1;
  tableSize: number = 1;
  searchWord!: string;
  totalMovie!: number;
  totalTV!: number;
  totalPeople!: number;
  type: string = 'movie';

  imgNotFound: string =
    'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg';
  constructor(
    private searchService: SearchMovieService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.searchWord = this.searchService.searchWord;
      this.type = 'movie';
      this.pagination = 1;
      this.fetchMovies(this.searchWord);
      this.searchService
        .searchTV(this.searchWord, this.pagination)
        .subscribe((item) => {
          this.totalTV = item.total_results;
        });
      this.searchService
        .searchPeople(this.searchWord, this.pagination)
        .subscribe((item) => {
          this.totalPeople = item.total_results;
        });
    });
  }

  fetchMovies(name: any) {
    this.searchService.searchMovie(name, this.pagination).subscribe((item) => {
      this.totalPage = item.total_pages;
      this.contentSearch = item.results;
      this.totalMovie = item.total_results;
    });
  }

  fetchTVs(name: any) {
    this.searchService.searchTV(name, this.pagination).subscribe((item) => {
      this.totalPage = item.total_pages;
      this.contentSearch = item.results;
    });
  }

  fetchPeople(name: any) {
    this.searchService.searchPeople(name, this.pagination).subscribe((item) => {
      this.totalPage = item.total_pages;
      this.contentSearch = item.results;
    });
  }

  chooseType(type: string) {
    if (type === 'movie') {
      this.fetchMovies(this.searchWord);
      this.type = 'movie';
    } else if (type === 'tv') {
      this.fetchTVs(this.searchWord);
      this.type = 'tv';
    } else {
      this.fetchPeople(this.searchWord);
      this.type = 'people';
    }
  }

  renderPage(event: number) {
    this.pagination = event;
    if (this.type === 'movie') {
      this.fetchMovies(this.searchWord);
    } else if (this.type === 'tv') {
      this.fetchTVs(this.searchWord);
    } else {
      this.fetchPeople(this.searchWord);
    }
  }
}
