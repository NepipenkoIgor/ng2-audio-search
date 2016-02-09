/**
 * Created by igor on 2/9/16.
 */
import {Component, Inject, OnInit} from 'angular2/core';
import {SpotifyService} from 'SpotifyService';
import {
    RouteParams,
} from 'angular2/router';

@Component({
    selector: 'album-component',
    template: `<div class="album-box" *ngIf="result">
    <h1>{{result.name}}</h1>
      <h1>Popularity:{{result.popularity}}</h1>
    <img src="{{ result.images[0].url }}" *ngIf="result.images.length" class="img-responsive">
    <div *ngFor="#track of result.tracks.items;#index=index">
    <p>{{index+1}}) {{track.name}}</p>
     <audio controls="true" name="media">
    <source src="{{track.preview_url}}" type="audio/mpeg">
    </audio>
    </div>
    </div>
 `
})
export class AlbumsComponent implements OnInit {
    spotify:SpotifyService;
    routeParams:RouteParams;
    id:string;
    result:any;

    constructor(@Inject(SpotifyService) spotify,
                @Inject(RouteParams) routeParams) {
        this.spotify = spotify;
        this.routeParams = routeParams;
    }

    ngOnInit():void {
        this.id = this.routeParams.get('id')
        this.spotify.getAlbums(this.id).subscribe((res:any) => {
            this.renderResults(res)
        });
    }

    renderResults(res:any):void {
        if (res) {
            this.result = res;
        }
    }

}