/**
 * Created by igor on 1/31/16.
 */
import {provide,Component} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import{
    //APP_BASE_HREF,
    ROUTER_DIRECTIVES,
    ROUTER_PROVIDERS,
    HashLocationStrategy,
    //PathLocationStrategy,
    LocationStrategy,
    RouteConfig,
} from'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';

import {SpotifyService} from 'SpotifyService';

import {SearchComponent} from 'SearchComponent';
import {TrackComponent} from 'TrackComponent';
import {ArtistComponent} from 'ArtistComponent';
import {AlbumsComponent} from 'AlbumsComponent';



@Component({
    selector: 'router-app',
    directives: [ROUTER_DIRECTIVES],
    template: `
<div>
   <router-outlet></router-outlet>
  </div>
` })

@RouteConfig([
    { path: '/', name: 'root', redirectTo: ['/Search'] },
    { path: '/search', name: 'Search', component: SearchComponent },
    { path: '/track', name: 'Track' ,component: TrackComponent},
    { path: '/artist', name: 'Artist' ,component: ArtistComponent},
    { path: '/albums', name: 'Albums' ,component: AlbumsComponent},
])

class RoutesDemoApp{}
bootstrap(RoutesDemoApp, [
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    SpotifyService,
   // provide(APP_BASE_HREF, {useValue: '/'}),
    provide(LocationStrategy, {useClass: HashLocationStrategy})
]);