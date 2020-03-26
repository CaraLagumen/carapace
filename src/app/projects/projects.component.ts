import { Component, OnInit } from "@angular/core";

import { flicker } from "../shared/animations";

@Component({
  selector: "app-projects",
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.scss"],
  animations: [flicker]
})
export class ProjectsComponent implements OnInit {
  projectTitle: string;

  constructor() {}

  ngOnInit() {
    this.onProject2501();
  }

  onProject2501() {
    this.projectTitle = "Project 2501";

    setTimeout(() => (this.projectTitle = "Baristabook"), 5000);
  }
}
