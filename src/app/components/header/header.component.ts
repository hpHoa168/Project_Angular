import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchMovieService } from 'src/app/services/search-movie.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isSearch: boolean = false;
  openSearch: string =
    'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-28-search-blue-177462d06db81ff2a02aa022c1c0be5ba4200d7bd3f51091ed9298980e3a26a1.svg';
  closeSearch: string =
    'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-599-menu-close-7400e9a2ea92ad8d7cccf18d1ea34cd690790638a6e7768922eaef6e07109723.svg';
  data: any;
  searchWord!: string;
  isProfile: boolean = false;
  isNavbarExpanded = false;
  isLoginPage: any;
  isLogin: boolean = false;

  constructor(
    private router: Router,
    private searchService: SearchMovieService,
    private loginService: LoginService
  ) {
    this.isLogin = loginService.isLogin;
  }

  ngOnInit(): void {
    this.router.events.subscribe((val) => {
      this.searchWord = this.searchService.searchWord;
      this.isLogin = this.loginService.isLogin;
      this.isProfile = false;    
      if (this.router.url.includes('search')) {
        this.isSearch = true;
      } else {
        this.isSearch = false;
      }
    });
  }

  searchMovie = () => {
    if (this.isSearch) {
      this.isSearch = false;
    } else {
      this.isSearch = true;
      this.isProfile = false;
    }
  };

  filterType() {
    if (!this.isSearch) {
      return { filter: 'none' };
    } else {
      return { filter: 'invert(1)' };
    }
  }

  getStyle(){
    if (this.isLogin) {
      return {
        'display': 'none'
      };
    } else {
      return {
        'display': 'block'
      };
    }
  }

  onValueChange(value: string) {
    this.searchService.setSearchWord(this.searchWord);
    this.router.navigate(['/search', value]);
  }

  profile() {
    this.isProfile = !this.isProfile;
    this.isSearch = false;
  }

  toggleNavbar() {
    this.isNavbarExpanded = !this.isNavbarExpanded;
    // this.isSearch = false;
  }

  logOut(){
    this.loginService.setLogout();
  }
}
