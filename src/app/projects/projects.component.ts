import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { flicker } from "../shared/animations";
import { FirebaseService } from "../shared/firebase.service";
import { Project } from "./project.model";

@Component({
  selector: "app-projects",
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.scss"],
  animations: [flicker]
})
export class ProjectsComponent implements OnInit, OnDestroy {
  private firebaseSub: Subscription;

  projectTitle: any;
  projects: Project[];

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    //FETCH THE GOODS
    this.firebaseSub = this.firebaseService
      .getProjects()
      .subscribe(projects => (this.projects = projects));

    //GITS ANYONE?
    this.onProject2501();
  }

  onProject2501() {
    this.projectTitle = "Project 2501";

    setTimeout(() => (this.projectTitle = this.projects[0].name), 5000);
  }

  ngOnDestroy() {
    this.firebaseSub.unsubscribe();
  }
}
