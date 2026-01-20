import Experience from "../Experience.js";
import * as THREE from "three";

export default class Dust {
  constructor() {
    this.experience = Experience.instance;
    this.scene = this.experience.scene;
    this.resources = this.experience.resources.items.DustTexture;
    this.setObject();
  }

  setObject() {
    const numOfPoints = 500;
    const vertices = [];

    for (let i = 0; i < numOfPoints; i++) {
      const x = (Math.random() - 0.5) * 7;
      const y = (Math.random() - 0.5) * 7;
      const z = (Math.random() - 0.5) * 10;
      vertices.push(x, y, z);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3),
    );

    const material = new THREE.PointsMaterial({
      alphaMap: this.resources,
      color: new THREE.Color("#525252"),
      size: 0.1,
      sizeAttenuation: true,
      depthWrite: false,
      transparent: true,
      alphaTest: 0.001,
      depthTest: true,
    });

    this.points = new THREE.Points(geometry, material);
    this.scene.add(this.points);
  }

  update() {}
}
