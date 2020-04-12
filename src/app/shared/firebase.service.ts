import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Cacheable } from "ngx-cacheable";

import { environment } from "src/environments/environment";
import { Project } from "../projects/project.model";
import { Link } from '../components/header/link.model';

const ROOT_URL = environment.apiUrl;

@Injectable({
  providedIn: "root",
})
export class FirebaseService {
  constructor(private http: HttpClient) {}

  @Cacheable({ cacheBusterObserver: new Observable<Link[]>() })
  getLinks(): Observable<Link> {
    return this.http.get<Link>(`${ROOT_URL}/links.json`);
  }

  @Cacheable({ cacheBusterObserver: new Observable<string[]>() })
  getIntro(): Observable<string[]> {
    return this.http.get<string[]>(`${ROOT_URL}/intro.json`);
  }

  @Cacheable({ cacheBusterObserver: new Observable<string[]>() })
  getAbout(): Observable<string[]> {
    return this.http.get<string[]>(`${ROOT_URL}/about.json`);
  }

  @Cacheable({ cacheBusterObserver: new Observable<Project[]>() })
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${ROOT_URL}/projects.json`);
  }
}
