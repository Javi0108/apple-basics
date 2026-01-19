import Experience from "./Experience.js";
import * as THREE from "three";
import { RectAreaLightUniformsLib } from "three/addons/lights/RectAreaLightUniformsLib.js";

export default class Environment {
  constructor() {
    this.experience = Experience.instance;
    this.scene = this.experience.scene;
    this.resources = this.experience.resources.items.Environment;
    this.renderer = this.experience.renderer.instance;
    this.envMap = null;
    this.pointLight = null;
    this.setLights();
    this.setEnvironment();
    this.setListeners();
  }

  setLights() {
    RectAreaLightUniformsLib.init();
    this.pointLight = new THREE.PointLight(0xff0000, 100);
    this.pointLight.position.set(0, 0, 0);
    this.scene.add(this.pointLight);
  }

  setEnvironment() {
    const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
    pmremGenerator.compileEquirectangularShader();

    this.envMap = pmremGenerator.fromEquirectangular(this.resources).texture;

    this.scene.environment = this.envMap;

    //this.resources.dispose();
    pmremGenerator.dispose();
  }

  setListeners() {
    // Follow mouse
    window.addEventListener("mousemove", (e) => {
      this.pointLight.position.set(e.clientX, e.clientY, 0);
    });
  }
}
