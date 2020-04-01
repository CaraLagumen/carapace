import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { flicker } from "../shared/animations";
import { FirebaseService } from "../shared/firebase.service";

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.scss"],
  animations: [flicker]
})
export class AboutComponent implements OnInit, OnDestroy {
  private firebaseSub: Subscription;

  aboutText: string[];
  aboutTextFormatted: string;
  readMore: boolean = false;

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    //FETCH THE GOODS
    this.firebaseSub = this.firebaseService.getAbout().subscribe(about => {
      this.aboutText = about;
      
      //ADD BREAK BETWEEN STRINGS - USE WITH INNERHTML
      this.aboutTextFormatted = about.join(" <br><br> ");
    });
  }

  onReadMore() {
    this.readMore = true;
  }

  ngOnDestroy() {
    this.firebaseSub.unsubscribe();
  }
}
