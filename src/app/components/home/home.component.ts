import { Component, OnInit, HostListener  } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { Router } from '@angular/router';
import { SearchMovieService } from 'src/app/services/search-movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  data: any;
  id: any;
  trailer: any;
  popular: any;
  selected: boolean = true;
  selectedTrailer: boolean = true;
  selectedPopular: boolean = true;
  backgroundImage: string = '';
  isTrailer: boolean = false;
  trailerType: string = 'tv';
  searchWord!: string; 
  trailerName!: string;
  isLoad: boolean[] = [false, false, false, false];
  screenWidth: number;

  constructor( private homeService: HomeService, private router: Router, private searchService: SearchMovieService ) {
    this.screenWidth = window.innerWidth;
  }
  ngOnInit(): void {
    this.homeService.getTodayTrend().subscribe((value) => {
      this.data = value.results;
    });
    this.homeService.getTrailerTV().subscribe((value) => {
      // const countTrailer = value.results.slice(0, 7);
      this.trailer = value.results.filter((item: any) => {
        return item.backdrop_path !== null;
      });
      const src =
        'https://www.themoviedb.org/t/p/w355_and_h200_multi_faces/' +
        this.trailer[0].backdrop_path;
      this.backgroundImage = `url(${src})`;
    });
    this.homeService.getTvPopular().subscribe((value) => {
      this.popular = value.results;
    });
  }

  getThisWeek = () => {
    this.selected = false;
    this.isLoad[0] = true;
    this.isLoad[1] = true;

    this.homeService.getThisWeekTrend().subscribe((value) => {
      setTimeout(()=>{
        this.isLoad[0] = false;
        this.isLoad[1] = false;

        this.data = value.results;
      },1000);
    });
  };
  getThisDay = () => {
    this.selected = true;
    this.isLoad[0] = true;
    this.isLoad[1] = true;

    this.homeService.getTodayTrend().subscribe((value) => {
      setTimeout(()=>{
        this.isLoad[0] = false;
        this.isLoad[1] = false;

        this.data = value.results;
      },1000);
    });
  };

  getTrailerTV = () => {
    this.selectedTrailer = true;
    this.isLoad[0] = true;
    this.isLoad[2] = true;

    this.homeService.getTrailerTV().subscribe((value) => {
      setTimeout(()=>{
        this.isLoad[0] = false;
        this.isLoad[2] = false;
        this.trailer = value.results.filter((item: any) => {
          return item.backdrop_path !== null;
        });
        const src =
          'https://www.themoviedb.org/t/p/w355_and_h200_multi_faces/' +
          this.trailer[0].backdrop_path;
        this.backgroundImage = `url(${src})`;
        this.isTrailer = false;
        this.trailerType = 'tv';
      },1000);
    });
  };
  getTrailerMovie = () => {
    this.selectedTrailer = false;
    this.isLoad[0] = true;
    this.isLoad[2] = true;

    this.homeService.getTrailerMovie().subscribe((value) => {
      setTimeout(()=>{
        this.isLoad[0] = false;
        this.isLoad[2] = false;

        this.trailer = value.results;
        const src =
          'https://www.themoviedb.org/t/p/w355_and_h200_multi_faces/' +
          value.results[0].backdrop_path;
        this.backgroundImage = `url(${src})`;
        this.isTrailer = false;
        this.trailerType = 'movie';
      },1000);
    });
  };

  getPopularTV = () => {
    this.selectedPopular = true;
    this.isLoad[0] = true;
    this.isLoad[3] = true;

    this.homeService.getTvPopular().subscribe((value) => {
      setTimeout(()=>{
        this.isLoad[0] = false;
        this.isLoad[3] = false;

        this.popular = value.results;
      },1000);
    });
  };
  getPopularMovie = () => {
    this.selectedPopular = false;
    this.isLoad[0] = true;
    this.isLoad[3] = true;

    this.homeService.getMoviePopular().subscribe((value) => {
      setTimeout(()=>{
        this.isLoad[0] = false;
        this.isLoad[3] = false;
        this.popular = value.results;
      },1000);
    });
  };

  setHovered = (src: string) => {
    this.backgroundImage = `url(${src})`;
  };

  openTrailer = (id: string, typeTrailer: string) => {
      this.homeService.getTrailer(id, typeTrailer).subscribe((value) => {
        if(value.videos.results[0]?.key !== undefined){
          const id = value.videos.results[0].key;
          this.trailerName = value.name ? value.name : value.original_title;
          this.id = id;
          this.isTrailer = false ? true : true;
          
        }else{
          this.trailerName = value.name;
          this.id = 'none';
          this.isTrailer = false ? true : true;
        }
      });
  };

  closeTrailer(){
    this.isTrailer = false;
  }

  onSubmit() {
    if(!this.searchWord){
      console.log('Type sth');
    }else{
      this.searchService.setSearchWord(this.searchWord);
      this.router.navigate(['/search', this.searchWord]);
    }
  }
  
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
  }
}
