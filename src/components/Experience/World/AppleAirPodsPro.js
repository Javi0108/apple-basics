import Experience from "../Experience.js";
import gsap from "gsap";
import * as THREE from "three";
import ObjectControls from "../Utils/ObjectControls.js";

export default class AppleAirPodsPro {
  constructor() {
    this.experience = Experience.instance;
    this.scene = this.experience.scene;
    this.time = this.experience.time;
    this.AppleAirPodsPro =
      this.experience.resources.items.AppleAirPodsPro.scene;
    this.mixer = null;
    this.controls = new ObjectControls(
      this.AppleAirPodsPro,
      this.experience.canvas,
    );
    this.setObject();
  }

  setObject() {
    this.AppleAirPodsPro.position.set(0, -0.25, 4);
    this.AppleAirPodsPro.scale.set(15, 15, 15);

    this.AppleAirPodsPro.traverse((child) => {
      if (child.isMesh) {
        const mat = child.material;
        if (mat && mat.isMeshStandardMaterial) {
          mat.envMapIntensity = 0.1;
          mat.opacity = 1;
          mat.needsUpdate = true;
        }
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    this.scene.add(this.AppleAirPodsPro);
  }

  destroy(onComplete) {
    this.controls?.dispose();
    if (!this.AppleAirPodsPro) return;

    const object = this.AppleAirPodsPro;
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
        materials.forEach((mat) => (mat.opacity = anim.opacity));
        object.position.x = anim.x;
      },
      onComplete: () => {
        this.scene.remove(object);
        if (onComplete) onComplete();
      },
    });
  }

  update() {
    if (this.mixer) {
      this.mixer.update(this.experience.time.delta * 0.001);
    }
  }
}
