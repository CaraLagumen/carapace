import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { Subscription } from "rxjs";
import { filter } from "rxjs/operators";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"]
})
export class NavComponent implements OnInit, OnDestroy {
  routerSub: Subscription;
  page: string;

  constructor(private router: Router) {}

  ngOnInit() {
    //GRAB URL TO DISPLAY CORRECT PAGE ON NAV
    this.routerSub = this.router.events
      //EXTRACT ONLY NAV END URL FROM EVENTS
      .pipe(filter(events => events instanceof NavigationEnd))
      //ASSIGN IT TO PAGE FOR NGCLASS COMPARISON ON HTML
      .subscribe((url: NavigationEnd) => console.log((this.page = url.url)));
  }

  ngOnDestroy() {
    this.routerSub.unsubscribe();
  }
}
