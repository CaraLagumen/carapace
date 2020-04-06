import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

import { flicker } from "src/app/shared/animations";
import { Project } from "../project.model";

@Component({
  selector: "app-projects-nav",
  templateUrl: "./projects-nav.component.html",
  styleUrls: ["./projects-nav.component.scss"],
  animations: [flicker],
})
export class ProjectsNavComponent implements OnInit {
  @Input() projects: Project[];
  @Output() getSelectedProject = new EventEmitter<Project>();

  hide: boolean = true;

  constructor() {}

  ngOnInit() {}

  onToggleProjects() {
    this.hide = !this.hide;
  }

  //OUTPUT SELECTED PROJECT TO PARENT
  onSelectProject(project: Project) {
    this.getSelectedProject.emit(project);
  }
}
