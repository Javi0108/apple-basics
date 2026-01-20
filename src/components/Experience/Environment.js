import Experience from "./Experience.js";
import * as THREE from "three";
import { RectAreaLightUniformsLib } from "three/addons/lights/RectAreaLightUniformsLib.js";

export default class Environment {
  constructor() {
    this.experience = Experience.instance;
    this.scene = this.experience.scene;
    this.resources = this.experience.resources.items.Environment;
    this.renderer = this.experience.renderer.instance;
    this.camera = this.experience.camera.instance;
    this.envMap = null;
    this.setEnvironment();
  }

  setEnvironment() {
    const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
    pmremGenerator.compileEquirectangularShader();

    this.envMap = pmremGenerator.fromEquirectangular(this.resources).texture;

    this.scene.environment = this.envMap;

    //this.resources.dispose();
    pmremGenerator.dispose();
  }
}
