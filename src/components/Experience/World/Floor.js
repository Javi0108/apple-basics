import Experience from "../Experience.js";
import { reflector } from "three/tsl";
import * as THREE from "three";

export default class Floor {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.time = this.experience.time;
    this.scene = this.experience.scene;
    this.setGeometry();
  }

  setGeometry() {
    const floorMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xb8b8b8),
      // metalness: 1,
      // roughness: 0.5,
    });

    const floor = new THREE.Mesh(
      new THREE.BoxGeometry(75, 0.001, 75),
      floorMaterial
    );
    floor.receiveShadow = true;

    floor.position.set(0, 0);
    this.scene.add(floor);
  }

  update() {}
}
