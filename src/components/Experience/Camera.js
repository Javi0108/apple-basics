import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Experience from "./Experience.js";

let transitionProgress = 0;

export default class Camera {
  constructor() {
    this.experience = Experience.instance;
    this.sizes = this.experience.sizes;
    this.time = this.experience.time;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.setInstance();
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      75,
      this.sizes.width / this.sizes.height,
      0.001,
      5,
    );
    this.instance.position.set(0, 0, 2);
    this.scene.add(this.instance);
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update() {
    if (this.isLooking) this.updateLookAt();
  }

  lookAtSmooth(target, duration = 1.2) {
    this.lookStartQuat = this.instance.quaternion.clone();

    const dummy = new THREE.Object3D();
    dummy.position.copy(this.instance.position);
    dummy.lookAt(target);

    this.lookEndQuat = dummy.quaternion.clone();

    if (this.lookStartQuat.angleTo(this.lookEndQuat) < 0.0001) {
      dummy.rotateY(0.001);
      this.lookEndQuat.copy(dummy.quaternion);
    }

    this.lookProgress = 0;
    this.lookDuration = duration;
    this.isLooking = true;

    if (transitionProgress >= 1) {
      this.isLooking = false;
      this.controls.enabled = true;
    }
  }

  updateLookAt() {
    this.lookProgress += this.time.delta / 1000;
    const t = Math.min(this.lookProgress / this.lookDuration, 1);

    const eased = this.easeInOut(t);

    this.instance.quaternion
      .copy(this.lookStartQuat)
      .slerp(this.lookEndQuat, eased);

    if (t >= 1) {
      this.isLooking = false;
    }
  }

  cubicBezier(p0, p1, p2, p3, t) {
    const u = 1 - t;
    return new THREE.Vector3()
      .addScaledVector(p0, u * u * u)
      .addScaledVector(p1, 3 * u * u * t)
      .addScaledVector(p2, 3 * u * t * t)
      .addScaledVector(p3, t * t * t);
  }

  easeInOut(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  }
}
