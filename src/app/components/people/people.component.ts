import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PeopleService } from 'src/app/services/people.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {
  page: number = 1;
  popularPeople: any;
  totalPages: number = 0;
  current: any;

  imgNotFound: string = 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg';
  constructor(private peopleService: PeopleService) { }

  ngOnInit() {
    this.peopleService.getPeople(this.page).subscribe((response) => {
      this.totalPages = response.total_pages;
      this.popularPeople = response.results
      console.log(this.popularPeople);
    })
  }
  renderPage(event: number) {
    this.page = event;
    this.peopleService.getPeople(this.page).subscribe((response) => {
      this.popularPeople = response.results
    })
  }
}
