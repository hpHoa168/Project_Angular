import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MovieComponent } from './components/movie/movie.component';
import { PeopleComponent } from './components/people/people.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';

import { LoginComponent } from './components/login/login.component';
import { SearchComponent } from './components/search/search.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TvshowDetailComponent } from './components/tvshow-detail/tvshow-detail.component';
import { PeopleDetailsComponent } from './components/people-details/people-details.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'search/:name',
    component: SearchComponent,
  },
  {
    path: 'movie',
    component: MovieComponent,
  },
  {
    path: 'tv',
    component: MovieComponent,
  },
  {
    path: 'people',
    component: PeopleComponent,
  },
  {
    path: 'movie/:id',
    component: MovieDetailComponent,
  },
  {
    path: 'tv/:id',
    component: TvshowDetailComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'profile/:slug',
    component: ProfileComponent,
  },
  {
    path: 'people/:id',
    component: PeopleDetailsComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
