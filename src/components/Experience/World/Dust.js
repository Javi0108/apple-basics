import Experience from "../Experience.js";
import * as THREE from "three";

export default class Dust {
  constructor() {
    this.experience = Experience.instance;
    this.scene = this.experience.scene;
    this.resources = this.experience.resources.items.DustTexture;

    this.numOfPoints = 250;
    this.velocities = [];

    this.setObject();
  }

  setObject() {
    const vertices = [];

    for (let i = 0; i < this.numOfPoints; i++) {
      const x = (Math.random() - 0.5) * 7;
      const y = (Math.random() - 0.5) * 1;
      const z = (Math.random() - 0.5) * 10;

      vertices.push(x, y, z);

      // velocidad individual pequeña
      this.velocities.push({
        x: (Math.random() - 0.5) * 0.001,
        y: (Math.random() - 0.5) * 0.001,
        z: (Math.random() - 0.5) * 0.001,
      });
    }

    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3),
    );

    const material = new THREE.PointsMaterial({
      alphaMap: this.resources,
      color: new THREE.Color("#ffffff"),
      size: 0.07,
      sizeAttenuation: true,
      depthWrite: false,
      transparent: true,
      opacity: 0.25,
      alphaTest: 0.001,
      depthTest: true,
    });

    this.points = new THREE.Points(this.geometry, material);
    this.scene.add(this.points);
  }

  update() {
    const positions = this.geometry.attributes.position.array;

    for (let i = 0; i < this.numOfPoints; i++) {
      const i3 = i * 3;

      positions[i3] += this.velocities[i].x;
      positions[i3 + 1] += this.velocities[i].y;
      positions[i3 + 2] += this.velocities[i].z;

      // Si sube demasiado, vuelve abajo
      if (
        positions[i3 + 1] > 3 ||
        positions[i3 + 1] < -3 ||
        positions[i3] > 3 ||
        positions[i3] < -3 ||
        positions[i3 + 2] > 10 ||
        positions[i3 + 2] < -10
      ) {
        //positions[i3 + 1] = 0;
        positions[i3] = (Math.random() - 0.5) * 7;
        positions[i3 + 1] = (Math.random() - 0.5) * 7;
        positions[i3 + 2] = (Math.random() - 0.5) * 10;
      }
    }

    this.geometry.attributes.position.needsUpdate = true;
  }
}
