import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { CommonModule } from '@angular/common';
// Import library module
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';

import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { MovieComponent } from './components/movie/movie.component';
import { SortAndFilterComponent } from './components/movie/sort-and-filter/sort-and-filter.component';
import { PeopleComponent } from './components/people/people.component';
import { SearchComponent } from './components/search/search.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { ProfileComponent } from './components/profile/profile.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import {MatProgressBarModule} from '@angular/material/progress-bar'
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { TvshowDetailComponent } from './components/tvshow-detail/tvshow-detail.component';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';
import { PeopleDetailsComponent } from './components/people-details/people-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MovieDetailComponent,
    LoginComponent,
    PeopleComponent,
    HomeComponent,
    SortAndFilterComponent,
    MovieComponent,
    SearchComponent,
    ProfileComponent,
    TvshowDetailComponent,
    PeopleDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    MatProgressBarModule,
    NgxSkeletonLoaderModule,
    NgxYoutubePlayerModule,
    NgCircleProgressModule.forRoot({
      space: -2,
      radius: 14,
      showSubtitle: false,
      animation: false,
      animationDuration: 0,
      backgroundColor: '#081C22',
      titleColor: 'white',
      unitsColor: 'white',
      titleFontSize: '12',
      unitsFontSize: '7',
      outerStrokeWidth: 2,
      innerStrokeWidth: 2,
      backgroundPadding: 3,
      titleFontWeight: '600'
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
