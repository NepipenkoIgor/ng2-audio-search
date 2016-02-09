/**
 * Created by igor on 2/5/16.
 */
const BASE_URL:string = 'https://api.spotify.com/v1';
import {Inject} from 'angular2/core';
import {Http} from 'angular2/http';
import {Observable} from 'rxjs'
export class SpotifyService {
    public http:Http;

    constructor(@Inject(Http) http) {
        this.http = http;
    }

    private query(URL:string, params?:Array<string>):Observable<any[]> {
        let queryURL:string = `${BASE_URL}${URL}`;
        if (params) {
            queryURL = `${queryURL}?${params.join('&')}`;
        }
        return this.http.request(queryURL)
            .map((res:any) => res.json())

    }

    private search(query:string, type:string):Observable<any[]> {
        return this.query(`/search`, [
            `q=${query}`,
            `type=${type}`]);
    }

    public searchByTrack(query:string):Observable<any[]> {
        return this.search(query, 'track');
    }

    public getTrack(id:string):Observable<any[]> {
        return this.query(`/tracks/${id}`);
    }

    public getArtist(id:string):Observable<any[]> {
        return this.query(`/artists/${id}`);
    }
    public getAlbums(id:string):Observable<any[]> {
        return this.query(`/albums/${id}`);
    }
}