import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  HostListener,
} from "@angular/core";
import * as THREE from "three";

import { flicker } from "./shared/animations";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements AfterViewInit {
  @ViewChild("rendererContainer", { static: false })
  rendererContainer: ElementRef;
  introContainer: ElementRef;
  aboutContainer: ElementRef;
  projectsContainer: ElementRef;
  contactContainer: ElementRef;
  scene: any;
  camera: any;
  light: any;
  radius: any;
  geometry: any;
  material: any;
  object: any;

  objects: any[] = [];
  increment: number = window.pageYOffset;
  mode: `☾` | `☀` = `☀`;
  displayIntro = true;
  displayAbout = true;
  displayProjects = true;
  displayContact = true;
  browserSupported = false;
  browser = navigator.userAgent.toLowerCase().indexOf(`firefox`);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

  constructor(private elementRef: ElementRef) {
    if (this.browser > -1) this.browserSupported = true;

    //START THREEJS----------------------------------------------------------

    //SCENE & CAMERA
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight
    );
    this.camera.position.z = 3.5;
    this.camera.rotation.z = 3;
    this.scene.add(this.camera);

    //LIGHTS
    this.light = new THREE.PointLight(0xc06839, 1, 0, 2);
    this.light.position.set(0, 0, 0);
    this.scene.add(this.light);
    this.light = new THREE.PointLight(0x34c96a, 0.5, 0, 2);
    this.light.position.set(0, 0, 60);
    this.scene.add(this.light);
    this.light = new THREE.PointLight(0x2431c7, 2, 0, 2);
    this.light.position.set(0, 0, 120);
    this.scene.add(this.light);
    this.light = new THREE.PointLight(0x000000, 100, 0, 2);
    this.light.position.set(0, 0, 240);
    this.scene.add(this.light);

    //OBJECT
    this.radius = 0.5;
    this.geometry = new THREE.OctahedronBufferGeometry(this.radius);
    this.material = new THREE.MeshPhysicalMaterial({
      color: 0x34c96a,
      opacity: 0.5,
      transparent: true,
    });

    //SET INITIAL OBJECT POSITIONS
    for (let i = 0; i < 500; i++) {
      this.object = new THREE.Mesh(this.geometry, this.material);

      this.object.position.x = (Math.random() - 0.5) * 18;
      this.object.position.y = (Math.random() - 0.5) * 2;
      this.object.position.z = (Math.random() - 0.5) * 2;

      this.objects.push(this.object);
      this.scene.add(this.object);
    }
  }

  ngAfterViewInit() {
    //SET CANVAS
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x000000, 0);
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);

    this.render();
  }

  //LISTEN TO WINDOW FOR RESIZE
  @HostListener("window:resize", ["$event"])
  onWindowResize(event) {
    this.renderer.setSize(event.target.innerWidth, event.target.innerHeight);
    this.camera.aspect = event.target.innerWidth / event.target.innerHeight;
    this.camera.updateProjectionMatrix();
  }

  @HostListener("window:scroll")
  onPageScroll() {
    //LISTEN TO WINDOW FOR SCROLL POSITION TO ALTER CAMERA
    if (window.pageYOffset > this.increment) {
      this.camera.rotation.y -= 0.001;
      this.camera.rotation.z -= 0.001;
      this.camera.position.y -= 0.001;
      this.camera.position.z -= 0.01;
      this.increment += 16;
    } else if (window.pageYOffset < this.increment) {
      this.camera.rotation.y += 0.001;
      this.camera.rotation.z += 0.001;
      this.camera.position.y += 0.001;
      this.camera.position.z += 0.01;
      this.increment -= 16;
    }

    //ANIMATE PAGES ON SCROLL (NOT A PART OF THREE.JS)
    if (window.pageYOffset < window.innerHeight * 0.5) {
      this.getDisplay(`intro`);
    } else if (window.pageYOffset < window.innerHeight * 1.5) {
      this.getDisplay(`about`);
    } else if (window.pageYOffset < window.innerHeight * 2.5) {
      this.getDisplay(`projects`);
    } else if (window.pageYOffset < window.innerHeight * 3.5) {
      this.getDisplay(`contact`);
    }
  }

  render() {
    //ANIMATE EACH OBJECT
    for (let i = 0; i < this.objects.length / 2; i++) {
      this.objects[i].rotation.x += Math.random() * 0.0001;
      this.objects[i].rotation.y -= Math.random() * 0.0001;
      this.objects[i].rotation.z += Math.random() * 0.0001;
      this.objects[i].position.x -= (Math.random() - 0.5) * 0.0000000000000001;
      this.objects[i].position.z += (Math.random() - 0.5) * 0.0000000000000001;

      if (this.objects[i].position.x < 0.5) {
        this.objects[i].position.y += (Math.random() - 0.5) * 0.001;
      } else {
        this.objects[i].position.y -= (Math.random() - 0.5) * 0.001;
      }
    }

    for (let i = this.objects.length / 2; i < this.objects.length; i++) {
      this.objects[i].rotation.x -= Math.random() * 0.0001;
      this.objects[i].rotation.y += Math.random() * 0.0001;
      this.objects[i].rotation.z -= Math.random() * 0.0001;
      this.objects[i].position.x += (Math.random() - 0.5) * 0.0000000000000001;
      this.objects[i].position.z -= (Math.random() - 0.5) * 0.0000000000000001;

      if (this.objects[i].position.x < 0.5) {
        this.objects[i].position.y += (Math.random() - 0.5) * 0.001;
      } else {
        this.objects[i].position.y -= (Math.random() - 0.5) * 0.001;
      }
    }

    //RENDER
    this.renderer.render(this.scene, this.camera);
    window.requestAnimationFrame(this.render.bind(this));
  }

  onToggleMode() {
    if (this.mode === `☾`) {
      this.mode = `☀`;

      this.elementRef.nativeElement.style.setProperty(
        "--color-dark",
        "#222325"
      );
    } else if (this.mode === `☀`) {
      this.mode = `☾`;

      this.elementRef.nativeElement.style.setProperty(
        "--color-dark",
        "#f2f2f2"
      );
    }
  }

  //(NOT A PART OF THREE.JS)
  getDisplay(page: `intro` | `about` | `projects` | `contact`) {
    switch (page) {
      case `intro`:
        this.displayIntro = true;
        this.displayAbout = false;
        this.displayProjects = false;
        this.displayContact = false;
        return;
      case `about`:
        this.displayIntro = false;
        this.displayAbout = true;
        this.displayProjects = false;
        this.displayContact = false;
        return;
      case `projects`:
        this.displayIntro = false;
        this.displayAbout = false;
        this.displayProjects = true;
        this.displayContact = false;
        return;
      case `contact`:
        this.displayIntro = false;
        this.displayAbout = false;
        this.displayProjects = false;
        this.displayContact = true;
        return;
    }
  }
}
