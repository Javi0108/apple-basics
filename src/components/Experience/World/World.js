import Experience from "../Experience.js";
import AppleWatchUltra from "./AppleWatchUltra.js";
import AppleIphone17Pro from "./AppleIphone17Pro.js";
import AppleAirPodsPro from "./AppleAirPodsPro.js";
import AppleVisionPro from "./AppleVisionPro.js";
import Environment from "../Environment.js";
import Dust from "./Dust.js";
import * as THREE from "three";
import EventEmitter from "../Utils/EventEmitter.js";

export default class World extends EventEmitter {
  constructor() {
    super();
    this.experience = Experience.instance;
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;
    this.resources = this.experience.resources;
    //this.loadingSquare = new LoadingSquare();
    this.objects = [
      AppleWatchUltra,
      AppleIphone17Pro,
      AppleAirPodsPro,
      AppleVisionPro,
    ];
    this.currentIndex = 0;
    this.currentObject = null;
    if (!this.resources) return;

    this.resources.on("ready", () => {
      this.environment = new Environment();
      this.dust = new Dust();
      this.loadCurrentObject();
      this.trigger?.("loaded");
    });

    this.setListeners();
  }

  setListeners() {
    document.querySelector(".nextButton").addEventListener("click", () => {
      this.nextObject();
      this.setColorandDisplay();
    });

    document.querySelector(".beforeButton").addEventListener("click", () => {
      this.prevObject();
      this.setColorandDisplay();
    });
  }

  setColorandDisplay() {
    if (this.currentObject instanceof AppleWatchUltra) {
      this.camera.lookAtSmooth(new THREE.Vector3(0, 0, 4));
      document.getElementById("dot1").style.color = "rgba(255, 255, 255, 1)";
      document.getElementById("dot2").style.color = "rgba(255, 255, 255, 0.1)";
      document.getElementById("dot3").style.color = "rgba(255, 255, 255, 0.1)";
      document.getElementById("dot4").style.color = "rgba(255, 255, 255, 0.1)";
    }

    if (this.currentObject instanceof AppleIphone17Pro) {
      this.camera.lookAtSmooth(new THREE.Vector3(-2, 0, 2));
      document.getElementById("dot1").style.color = "rgba(255, 255, 255, 0.1)";
      document.getElementById("dot2").style.color = "rgba(255, 255, 255, 1)";
      document.getElementById("dot3").style.color = "rgba(255, 255, 255, 0.1)";
      document.getElementById("dot4").style.color = "rgba(255, 255, 255, 0.1)";
    }

    if (this.currentObject instanceof AppleAirPodsPro) {
      this.camera.lookAtSmooth(new THREE.Vector3(0, 0, -4));
      document.getElementById("dot1").style.color = "rgba(255, 255, 255, 0.1)";
      document.getElementById("dot2").style.color = "rgba(255, 255, 255, 0.1)";
      document.getElementById("dot3").style.color = "rgba(255, 255, 255, 1)";
      document.getElementById("dot4").style.color = "rgba(255, 255, 255, 0.1)";
    }

    if (this.currentObject instanceof AppleVisionPro) {
      this.camera.lookAtSmooth(new THREE.Vector3(2, 0, 2));
      document.getElementById("dot1").style.color = "rgba(255, 255, 255, 0.1)";
      document.getElementById("dot2").style.color = "rgba(255, 255, 255, 0.1)";
      document.getElementById("dot3").style.color = "rgba(255, 255, 255, 0.1)";
      document.getElementById("dot4").style.color = "rgba(255, 255, 255, 1)";
    }
  }

  registerObject(object3D) {
    this.objects.push(object3D);
  }

  loadCurrentObject() {
    const ItemClass = this.objects[this.currentIndex];
    const newObject = new ItemClass();
    this.currentObject = newObject; // opcional si quieres guardar referencia
  }

  getCurrentObject(object3D) {
    return this.objects[this.currentIndex] || null;
  }

  nextObject() {
    this.currentIndex = (this.currentIndex + 1) % this.objects.length;
    this.loadCurrentObject();
  }

  prevObject() {
    this.currentIndex =
      (this.currentIndex - 1 + this.objects.length) % this.objects.length;
    this.loadCurrentObject();
  }

  update() {
    if (this.floor) this.floor.update();
    if (this.dust) this.dust.update();
    if (this.currentObject) this.currentObject.update();
  }
}
