import { Component, OnInit } from "@angular/core";

import { flicker } from "src/app/shared/animations";

@Component({
  selector: "app-projects-nav",
  templateUrl: "./projects-nav.component.html",
  styleUrls: ["./projects-nav.component.scss"],
  animations: [flicker]
})
export class ProjectsNavComponent implements OnInit {
  hide: boolean = true;

  constructor() {}

  ngOnInit() {}
}
