import { Component, OnInit } from "@angular/core";

import { flicker } from "../shared/animations";

@Component({
  selector: "app-intro",
  templateUrl: "./intro.component.html",
  styleUrls: ["./intro.component.scss"],
  animations: [flicker]
})
export class IntroComponent implements OnInit {
  introText: string;

  introTextArr: string[] = [
    "Unhandled exception at life, degree is undefined.",
    "const userCara = require(‘constantProduction’);",
    "git commit -m “Updated coding-journey.ts”",
    "RangeError: Potential learning infinite loop."
  ];

  constructor() {}

  ngOnInit() {
    this.onLoopIntro();
  }

  onShuffleIntro() {
    this.introText = this.introTextArr[Math.floor(Math.random() * 4)];
  }

  onLoopIntro() {
    this.onShuffleIntro();

    setTimeout(() => {
      this.onLoopIntro();
    }, Math.floor(Math.random() * 8000));
  }
}
