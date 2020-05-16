import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { YoutubeResponse } from '../models/youtube.model';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  constructor(private http: HttpClient) { }

  private apikey = 'AIzaSyAeiMEPeVvxnwAzk2QH9wWrsGAgZ7T2Abg';
  private urlBase = 'https://www.googleapis.com/youtube/v3';
  private playlist = 'UUuaPTYj15JSkETGnEseaFFg';
  private nextPageToken = '';

  getVideos() {

    const url = `${this.urlBase}/playlistItems`

    const params = new HttpParams()
      .set('part', 'snippet')
      .set('maxresults', '10')
      .set('playlistId', this.playlist)
      .set('key', this.apikey)
      .set('pageToken', this.nextPageToken);

    // return this.http.get(`${this.urlBase}/playlistItems?part=snippet&key=${this.apikey}&playlistId=${this.playlist}&maxResults=10`)
    return this.http.get<YoutubeResponse>(url, {params} )
    .pipe( map( resp => {
      this.nextPageToken = resp.nextPageToken;
      return resp.items;
    }),
      map(items => items.map(video => video.snippet)
      )
    );
  }

}
