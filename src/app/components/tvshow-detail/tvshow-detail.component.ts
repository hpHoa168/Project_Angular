import { Component, OnInit } from '@angular/core';
import { MovieDetailService } from 'src/app/services/MovieDetailService/movie-detail.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tvshow-detail',
  templateUrl: './tvshow-detail.component.html',
  styleUrls: ['./tvshow-detail.component.scss'],
})
export class TvshowDetailComponent implements OnInit {
  tvshowId: any;
  tvshowInfo: any = {};
  castInfo: any = {};
  objValue: any;
  activeItem: string = 'Most popular';
  isHidden = false;
  statusTrailer = 'hide';
  response = false;
  addFavoriteMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private service: MovieDetailService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.tvshowId = parseInt(params['id'], 10);
      console.log(this.tvshowId);
    });

    this.service.getTvShowDeatilInfo(this.tvshowId).subscribe((response) => {
      this.tvshowInfo = response;
      this.response = true;
      console.log(response);
      console.log(this.tvshowInfo);
    });

    this.service.getTvShowCastInfo(this.tvshowId).subscribe((response) => {
      // console.log(response);
      this.castInfo = response;
    });

    this.hideElement(this.statusTrailer);
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
      .addFavorite(this.tvshowId, 'tv', true)
      .subscribe((response: any) => {
        console.log(response);
        this.addFavoriteMessage = response['status_message'];

        setTimeout(() => {
          this.addFavoriteMessage = '';
        }, 2000);
      });
  }
}
