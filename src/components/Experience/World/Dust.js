import Experience from "../Experience.js";
import * as THREE from "three";
import gsap from "gsap";

export default class AppleIphone17Pro {
  constructor() {
    this.experience = Experience.instance;
    this.scene = this.experience.scene;
    this.resources = this.experience.resources.items.DustTexture;

    this.setObject();
    this.setListeners();
  }

  setObject() {
    const numOfPoints = 1000;
    const vertices = [];

    for (let i = 0; i < numOfPoints; i++) {
      const x = (Math.random() - 0.5) * 250;
      const y = (Math.random() - 0.5) * 350;
      const z = (Math.random() - 0.5) * 350;
      vertices.push(x, y, z);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );

    const material = new THREE.PointsMaterial({
      alphaMap: this.resources,
      color: new THREE.Color("#525252"),
      size: 2,
      sizeAttenuation: true,
      depthWrite: true,
      transparent: true,
      alphaTest: 0.001,
      depthTest: true,
    });

    this.points = new THREE.Points(geometry, material);
    this.scene.add(this.points);
  }

  setColor(color) {}

  setListeners() {}

  update() {}
}
