import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { flicker, slideIn } from "../shared/animations";
import { FirebaseService } from "../shared/firebase.service";
import { Project } from "./project.model";

@Component({
  selector: "app-projects",
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.scss"],
  animations: [flicker, slideIn]
})
export class ProjectsComponent implements OnInit, OnDestroy {
  private firebaseSub: Subscription;

  projectTitle: any;
  projects: Project[];
  selectedProject: Project;
  formattedDescription: string;
  hide: boolean = true;

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    //FETCH THE GOODS
    this.firebaseSub = this.firebaseService
      .getProjects()
      .subscribe(projects => {
        this.projects = projects;
        this.selectedProject = projects[0];
        this.onFormatDescription();
      });

    //GITS ANYONE?
    this.onProject2501();
  }

  onProject2501() {
    this.projectTitle = "Project 2501";

    setTimeout(() => (this.projectTitle = this.selectedProject.name), 5000);
  }

  onSetSelectedProject(project) {
    this.selectedProject = project;
    this.projectTitle = project.name;
    this.onFormatDescription();
  }

  onFormatDescription() {
    this.formattedDescription = this.selectedProject.description.join(
      " <br><br> "
    );
  }

  onToggleDescription() {
    this.hide = !this.hide;
  }

  ngOnDestroy() {
    this.firebaseSub.unsubscribe();
  }
}
