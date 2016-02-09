/**
 * Created by igor on 2/7/16.
 */
import {Component, OnInit, Inject} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {
    Router,
    RouterLink,
    RouteParams,
} from 'angular2/router';
import {SpotifyService} from 'SpotifyService';

@Component({
    selector: 'search',
    directives: [RouterLink, CORE_DIRECTIVES],
    template: `
<h1>Search</h1>
<p>
<input type="text" placeholder="search term" #newquery
      [value]="query"
(keydown.enter)="submit(newquery.value)">
<button (click)="submit(newquery.value)">Search</button>
</p>
<div *ngIf="results">
<div *ngIf="!results.length">
No tracks were found with the term '{{ query }}' </div>
<div *ngIf="results.length"> <h1>Results</h1>
<div class="row-content">
<div class="search-result" *ngFor="#t of results">
<div class="thumbnail"> <div class="content">
<img src="{{ t.album.images[0].url }}" class="img-responsive"> <div class="caption">
<h3>
<a [routerLink]="['/Artist', {id: t.artists[0].id}]">
{{ t.artists[0].name }} </a>
                </h3>
                <br>
                <p>
<a [routerLink]="['/Track', {id: t.id}]"> {{ t.name }}
</a> </p>
</div>
<div class="attribution">
<h4>
<a [routerLink]="['/Albums', {id: t.album.id}]"> {{ t.album.name }}
</a> </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
   </div>
`
})

export class SearchComponent implements  OnInit {
    public query:string;
    public results:any;
    public spotify:SpotifyService;
    public router:Router;
    public routeParams:RouteParams;

    constructor(@Inject(SpotifyService) spotify,
                @Inject(Router) router,
                @Inject(RouteParams) routeParams
    ) {
        this.spotify = spotify;
        this.router = router;
        this.routeParams = routeParams;
    }


    ngOnInit(): void {
        this.search();
    }
    submit(query: string): void {
        this.router.navigate(['/Search', {query: query}]);
        this.search();
    }

    search():void {
        this.query = this.routeParams.get('query');
        if (!this.query) {
            return;
        }
        this.spotify
            .searchByTrack(this.query)
            .subscribe((res:any) => {
                this.renderResults(res)
            });
    }

    renderResults(res:any):void {
        this.results = null;
        if (res && res.tracks && res.tracks.items) {
            this.results = res.tracks.items;
        }
    }
}