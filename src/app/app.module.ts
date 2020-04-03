import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ClipboardModule } from "ngx-clipboard";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { IntroComponent } from "./intro/intro.component";
import { AboutComponent } from "./about/about.component";
import { ProjectsComponent } from "./projects/projects.component";
import { ProjectsNavComponent } from "./projects/projects-nav/projects-nav.component";
import { ContactComponent } from "./contact/contact.component";
import { HeaderComponent } from "./components/header/header.component";
import { NavComponent } from "./components/nav/nav.component";
import { AlertComponent } from "./components/alert/alert.component";

@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    AboutComponent,
    ProjectsComponent,
    ProjectsNavComponent,
    ContactComponent,
    HeaderComponent,
    NavComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ClipboardModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
