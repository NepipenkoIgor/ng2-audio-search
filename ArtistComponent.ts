/**
 * Created by igor on 2/9/16.
 */
import {Component, Inject, OnInit} from 'angular2/core';
import {SpotifyService} from 'SpotifyService';
import {
    RouteParams,
} from 'angular2/router';

@Component({
    selector: 'artist-component',
    template: `<div *ngIf="result">
    <h1>{{result.name}}</h1>
    <h1>Popularity:{{result.popularity}} Folowers:{{result.followers.total}}</h1>
    <img src="{{ result.images[0].url }}" *ngIf="result.images.length" class="img-responsive">
    </div>`
})
export class ArtistComponent implements OnInit {
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
        this.spotify.getArtist(this.id).subscribe((res:any) => {
            this.renderResults(res)
        });
    }

    renderResults(res:any):void {
        if (res) {
            this.result = res;
        }
    }

}