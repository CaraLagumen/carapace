import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from "@angular/core";
import { Subscription } from "rxjs";

import { flicker } from "../shared/animations";
import { FirebaseService } from "../shared/firebase.service";

@Component({
  selector: "app-intro",
  templateUrl: "./intro.component.html",
  styleUrls: ["./intro.component.scss"],
  animations: [flicker],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntroComponent implements OnInit, OnDestroy {
  private firebaseSub: Subscription;

  introText: string;
  introTextArr: string[];

  constructor(
    private firebaseService: FirebaseService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    //FETCH THE GOODS
    this.firebaseSub = this.firebaseService.getIntro().subscribe((intro) => {
      this.introTextArr = intro;

      this.onLoopIntro();
    });
  }

  onShuffleIntro() {
    this.introText = this.introTextArr[Math.floor(Math.random() * 4)];
  }

  onLoopIntro() {
    this.onShuffleIntro();

    setTimeout(() => {
      this.onLoopIntro();
    }, Math.floor(Math.random() * (10000 - 8000) + 8000)); //(MAX - MIN) + MIN

    this.cd.markForCheck();
  }

  ngOnDestroy() {
    this.firebaseSub.unsubscribe();
  }
}
