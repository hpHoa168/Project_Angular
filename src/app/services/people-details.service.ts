import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PeopleDetailsService {

  constructor(private httpClient: HttpClient) { }

  getPeopleDetails(id: any){
   let url = "https://api.themoviedb.org/3/person/" + id + "?api_key=e9e9d8da18ae29fc430845952232787c"
    
   return this.httpClient.get(url)
  }

  getPeopleMovie(id: any){
    let url = "https://api.themoviedb.org/3/person/" + id + "/movie_credits?api_key=e9e9d8da18ae29fc430845952232787c"
     
    return this.httpClient.get(url)
   }
}
