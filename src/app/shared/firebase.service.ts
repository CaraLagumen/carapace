import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from "src/environments/environment";
import { Project } from "../projects/project.model";

const ROOT_URL = environment.apiUrl;

@Injectable({
  providedIn: "root"
})
export class FirebaseService {
  constructor(private http: HttpClient) {}

  getIntro(): Observable<string[]> {
    return this.http.get<string[]>(`${ROOT_URL}/intro.json`);
  }

  getAbout(): Observable<string[]> {
    return this.http.get<string[]>(`${ROOT_URL}/about.json`);
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${ROOT_URL}/projects.json`);
  }
}
