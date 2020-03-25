import { Component, OnInit, HostListener, ElementRef } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  igniteSize: number;
  igniteX: number;

  isIgniteVisible: boolean = false;

  constructor(public el: ElementRef<HTMLElement>) {}

  ngOnInit() {
    //SET IGNITE SIZE RELATIVE TO CLIENT WIDTH
    this.igniteSize = this.el.nativeElement.getBoundingClientRect().width / 5;
  }

  @HostListener("mousemove", ["$event"])
  onMouseMove(event: MouseEvent) {
    //SET IGNITE X POSITION = MOUSE X POSITION
    this.igniteX = event.clientX;
  }

  get igniteStyle() {
    //HIDE IGNITE BY SETTING SIZE TO ZERO IF NOT VISIBLE
    const igniteSize = this.isIgniteVisible ? this.igniteSize : 0;

    return {
      "height.rem": igniteSize / 10,
      "width.rem": igniteSize / 30,
      "left.px": this.igniteX
    };
  }
}
