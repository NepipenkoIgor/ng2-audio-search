/**
 * Created by igor on 2/8/16.
 */
import {Component, Inject, OnInit} from 'angular2/core';
import {SpotifyService} from 'SpotifyService';
import {
    RouteParams,
} from 'angular2/router';

@Component({
    selector: 'track-component',
    template: `<div class="track-box" *ngIf="result">
    <h1>{{result.name}}</h1>
    <img src="{{ result.album.images[0].url}}" class="img-responsive">
    <audio autoplay="true" controls="true" name="media" loop="true">
    <source src="{{result.preview_url}}" type="audio/mpeg">
    </audio>
    </div>`
})
export class TrackComponent implements OnInit {
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
        this.id = this.routeParams.get('id');
        this.spotify.getTrack(this.id).subscribe((res:any) => {
            this.renderResults(res)
        });
    }

    renderResults(res:any):void {
        if (res) {
            this.result = res;
        }
    }

}
