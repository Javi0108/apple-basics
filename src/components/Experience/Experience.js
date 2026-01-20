import Sizes from "./Utils/Sizes.js";
import Time from "./Utils/Time.js";
import Resources from "./Utils/Resources.js";
import Camera from "./Camera.js";
import Renderer from "./Renderer.js";
import World from "./World/World.js";
import Environment from "./Environment.js";
import sources from "./sources.js";
import * as THREE from "three";
import EventEmitter from "./Utils/EventEmitter.js";

export default class Experience extends EventEmitter {
  static instance;

  constructor(canvas) {
    // Singleton
    if (Experience.instance) {
      return Experience.instance;
    }

    super();

    Experience.instance = this;
    this.canvas = canvas;
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.resources = new Resources(sources);
    this.world = new World();

    this.sizes.on("resize", () => {
      this.resize();
    });

    this.time.on("tick", () => {
      this.update();
    });
  }

  setObjectColor(color) {
    if (this.world.currentObject) {
      this.world.currentObject.setColor(color);
    }
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  update() {
    this.camera.update();
    this.world.update();
    this.renderer.update();
  }
}
