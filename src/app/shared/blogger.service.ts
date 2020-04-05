import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from "src/environments/environment";

const ROOT_URL = environment.bloggerUrl;
const API_KEY = environment.apiKey;

@Injectable({
  providedIn: "root"
})
export class BloggerService {
  constructor(private http: HttpClient) {}

  getPosts(): Observable<any> {
    return this.http.get<any>(`${ROOT_URL}/posts?key=${API_KEY}`);
  }
}
