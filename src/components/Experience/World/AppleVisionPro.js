import Experience from "../Experience.js";
import ObjectControls from "../Utils/ObjectControls.js";
import * as THREE from "three";
import gsap from "gsap";

export default class AppleVisionPro {
  constructor() {
    this.experience = Experience.instance;
    this.scene = this.experience.scene;
    this.AppleVisionPro = this.experience.resources.items.AppleVisionPro.scene;
    this.controls = new ObjectControls(
      this.AppleVisionPro,
      this.experience.canvas,
      this.experience.camera.instance,
    );
    this.setObject();
    this.setListeners();
  }

  setObject() {
    this.AppleVisionPro.position.set(-2, 0, 2);
    this.AppleVisionPro.scale.set(2.2, 2.2, 2.2);

    this.AppleVisionPro.traverse((child) => {
      if (child.isMesh && child.material?.isMeshStandardMaterial) {
        const mat = child.material.clone();
        mat.opacity = 1;
        child.material = mat;
      }
    });

    this.scene.add(this.AppleVisionPro);
  }

  destroy(onComplete) {
    this.controls?.dispose();
    const object = this.AppleVisionPro;

    const materials = [];

    object.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material = child.material.clone();
        child.material.transparent = true;
        child.material.opacity = 1;
        materials.push(child.material);
      }
    });

    const anim = { opacity: 1, x: object.position.x };

    gsap.to(anim, {
      opacity: 0,
      x: object.position.x - 0.1,
      duration: 0.6,
      ease: "power3.out",
      onUpdate: () => {
        materials.forEach((mat) => {
          mat.opacity = anim.opacity;
        });
        object.position.x = anim.x;
      },
      onComplete: () => {
        this.scene.remove(object);
        if (onComplete) onComplete();
      },
    });
  }

  setListeners() {}

  update() {}
}
