import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PeopleDetailsService } from 'src/app/services/people-details.service';

@Component({
  selector: 'app-people-details',
  templateUrl: './people-details.component.html',
  styleUrls: ['./people-details.component.scss']
})
export class PeopleDetailsComponent implements OnInit {
  peopleDetails: any;
  peopleMovies: any;
  subscribe?: Subscription;
  id: any;

  imgNotFound: string = 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg';
  
  constructor(private peopleDetail: PeopleDetailsService,private peopleMovie: PeopleDetailsService, private route: ActivatedRoute,){
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = parseInt(params['id'], 10);
      console.log(this.id);
    });

    this.peopleDetail.getPeopleDetails(this.id).subscribe((response) => {
      this.peopleDetails = response;
      console.log(this.peopleDetails);
    });

    this.peopleMovie.getPeopleMovie(this.id).subscribe((response) => {
      this.peopleMovies = response;
      console.log(this.peopleMovies);
    });
  }
}
