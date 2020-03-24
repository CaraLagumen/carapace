import { Component, OnInit } from "@angular/core";

import { flicker } from "../shared/animations";

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.scss"],
  animations: [flicker]
})
export class AboutComponent implements OnInit {
  readMore: boolean = false;

  constructor() {}

  ngOnInit() {}

  onReadMore() {
    this.readMore = true;
  }
}
