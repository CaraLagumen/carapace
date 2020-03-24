import { Component, OnInit, HostListener } from "@angular/core";
import { Subscription } from "rxjs";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"]
})
export class NavComponent implements OnInit {
  routerSub: Subscription;
  page: string;

  constructor() {}

  ngOnInit() {}

  //LISTEN TO WINDOW FOR SCROLL POSITION TO DISPLAY CORRECT PAGE ON NAV
  @HostListener("window:scroll", ["$event"])
  onPageScroll() {
    //COMPARE Y OFFSET WITH WINDOW HEIGHTS TO FIND PAGE
    if (window.pageYOffset < window.innerHeight * 0.5) {
      this.page = "/#page-intro";
    } else if (window.pageYOffset < window.innerHeight * 1.5) {
      this.page = "/#page-about";
    } else if (window.pageYOffset < window.innerHeight * 2.5) {
      this.page = "/#page-projects";
    } else if (window.pageYOffset < window.innerHeight * 3.5) {
      this.page = "/#page-contact";
    }
  }
}
