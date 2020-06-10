import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from "@angular/core";
import { Subscription } from "rxjs";

import { flicker, slideIn } from "../shared/animations";
import { FirebaseService } from "../shared/firebase.service";
import { Project } from "./project.model";
import { AlertService } from "../components/alert/alert.service";

@Component({
  selector: "app-projects",
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.scss"],
  animations: [flicker, slideIn],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent implements OnInit, OnDestroy {
  private firebaseSub: Subscription;

  projectTitle: string;
  projects: Project[];
  selectedProject: Project;
  formattedDescription: string;
  url: string;
  hide: boolean = true;

  constructor(
    private firebaseService: FirebaseService,
    private alertService: AlertService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    //FETCH THE GOODS
    this.firebaseSub = this.firebaseService
      .getProjects()
      .subscribe((projects) => {
        this.projects = projects;
        this.selectedProject = projects[0];
        this.onFormatDescription();

        this.cd.markForCheck();
      });

    //GITS ANYONE?
    this.onProject2501();
  }

  onProject2501() {
    this.projectTitle = "Project 2501";

    setTimeout(() => (this.projectTitle = this.selectedProject.name), 5000);
  }

  //RECEIVE OUTPUT PROJECT FROM CHILD
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

  onStackAlert(technology) {
    this.alertService.info(
      `${this.selectedProject.name} was proudly created with ${technology}`,
      {
        autoClose: true,
        keepAfterRouteChange: true,
      }
    );
  }

  onRedirect() {
    window.open(`${this.selectedProject.urls.app}`, "_blank");
  }

  ngOnDestroy() {
    this.firebaseSub.unsubscribe();
  }
}
