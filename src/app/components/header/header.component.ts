import {
  Component,
  OnInit,
  ElementRef,
  HostListener,
  OnDestroy,
} from "@angular/core";
import { Subscription } from "rxjs";

import { FirebaseService } from "src/app/shared/firebase.service";
import { Link } from "./link.model";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private linksSub: Subscription;

  igniteSize: number;
  igniteX: number;
  links: Link;

  isIgnite: boolean = false;

  constructor(
    public el: ElementRef<HTMLElement>,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit() {
    //SET IGNITE SIZE RELATIVE TO CLIENT WIDTH
    this.igniteSize = this.el.nativeElement.getBoundingClientRect().width / 5;

    this.linksSub = this.firebaseService
      .getLinks()
      .subscribe((links: Link) => (this.links = links));
  }

  @HostListener("mousemove", ["$event"])
  onMouseMove(event: MouseEvent) {
    //SET IGNITE X POSITION = MOUSE X POSITION
    this.igniteX = event.clientX;
  }

  get igniteStyle() {
    //HIDE IGNITE BY SETTING SIZE TO ZERO IF NOT VISIBLE
    const igniteSize = this.isIgnite ? this.igniteSize : 0;

    return {
      "height.rem": igniteSize / 10,
      "width.rem": igniteSize / 30,
      "left.px": this.igniteX,
    };
  }

  ngOnDestroy() {
    this.linksSub.unsubscribe();
  }
}
