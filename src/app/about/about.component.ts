import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { flicker } from "../shared/animations";
import { FirebaseService } from "../shared/firebase.service";
import { BloggerService } from "../shared/blogger.service";

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.scss"],
  animations: [flicker],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent implements OnInit {
  aboutText$: Observable<string[]>;
  aboutTextFormatted$: Observable<string>;
  posts$: Observable<any[]>;
  readMore: boolean = false;
  blog: boolean = false;
  selectedPost: any;

  constructor(
    private firebaseService: FirebaseService,
    private bloggerService: BloggerService
  ) {}

  ngOnInit() {
    //FETCH THE GOODS
    this.aboutText$ = this.firebaseService
      .getAbout()
      .pipe(map((about: string[]) => about));

    //ADD BREAK BETWEEN STRINGS - USE WITH INNERHTML
    this.aboutTextFormatted$ = this.firebaseService
      .getAbout()
      .pipe(map((about: string[]) => about.join(" <br><br> ")));

    this.posts$ = this.bloggerService
      .getPosts()
      .pipe(map((posts: any) => posts.items));
  }

  onReadMore() {
    this.readMore = true;
  }

  onToggleBlog() {
    this.blog = !this.blog;
  }

  onSelectedPost(post) {
    this.selectedPost = post;
  }
}
