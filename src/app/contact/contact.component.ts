import { Component, OnInit } from "@angular/core";

import { AlertService } from "../components/alert/alert.service";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.scss"]
})
export class ContactComponent implements OnInit {
  hover: boolean;

  constructor(private alertService: AlertService) {}

  ngOnInit() {
    this.hover = false;
  }

  onHover() {
    this.hover = !this.hover;
  }

  onCopyAlert() {
    this.alertService.success("Email address copied to clipboard", {
      autoClose: true,
      keepAfterRouteChange: true
    });
  }

  onEmailAlert() {
    this.alertService.info(
      "Your default email client should've been opened",
      {
        autoClose: true,
        keepAfterRouteChange: true
      }
    );
  }
}
