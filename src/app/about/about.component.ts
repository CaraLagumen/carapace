import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { flicker } from "../shared/animations";
import { FirebaseService } from "../shared/firebase.service";
import { BloggerService } from "../shared/blogger.service";

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.scss"],
  animations: [flicker],
})
export class AboutComponent implements OnInit, OnDestroy {
  private firebaseSub: Subscription;
  private bloggerSub: Subscription;

  aboutText: string[];
  aboutTextFormatted: string;
  readMore: boolean = false;
  posts: any;

  constructor(
    private firebaseService: FirebaseService,
    private bloggerService: BloggerService
  ) {}

  ngOnInit() {
    //FETCH THE GOODS
    this.firebaseSub = this.firebaseService.getAbout().subscribe((about) => {
      this.aboutText = about;

      //ADD BREAK BETWEEN STRINGS - USE WITH INNERHTML
      this.aboutTextFormatted = about.join(" <br><br> ");
    });

    this.bloggerSub = this.bloggerService.getPosts().subscribe((posts) => {
      this.posts = posts;

      // console.log(this.posts.items[0].content);
      console.log(this.posts.items);
    });
  }

  onReadMore() {
    this.readMore = true;
  }

  ngOnDestroy() {
    this.firebaseSub.unsubscribe();
  }
}
