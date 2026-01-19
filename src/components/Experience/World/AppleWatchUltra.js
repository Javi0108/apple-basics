import Experience from "../Experience.js";
import ObjectControls from "../Utils/ObjectControls.js";
import * as THREE from "three";
import gsap from "gsap";

export default class AppleWatchUltra {
  constructor() {
    this.experience = Experience.instance;
    this.scene = this.experience.scene;
    this.AppleWatchUltra =
      this.experience.resources.items.AppleWatchUltra.scene;
    this.controls = new ObjectControls(
      this.AppleWatchUltra,
      this.experience.canvas,
    );

    this.setObject();
    this.setListeners();
  }

  setObject() {
    this.AppleWatchUltra.position.set(0, 0, 0);
    this.AppleWatchUltra.rotation.set(Math.PI * 0.2, 0, 0);
    this.AppleWatchUltra.scale.set(15, 15, 15);

    const carcase =
      this.AppleWatchUltra.children[0].children[0].children[0].children[0]
        .children[0].children[0].children[0];

    carcase.traverse((child) => {
      if (child.isMesh && child.material?.isMeshStandardMaterial) {
        const mat = child.material.clone();

        mat.envMap = this.experience.world.environment.envMap;
        mat.envMapIntensity = 0.6;
        mat.metalness = 0.8;
        mat.roughness = 0.25;
        mat.opacity = 1;
        mat.needsUpdate = true;

        child.material = mat;
      }
    });

    const belt =
      this.AppleWatchUltra.children[0].children[0].children[0].children[0]
        .children[0].children[0].children[0].children[13].children[2];
    belt.traverse((child) => {
      if (child.isMesh && child.material?.isMeshStandardMaterial) {
        const mat = child.material.clone();

        mat.envMap = this.experience.world.environment.envMap;
        mat.metalness = 0;
        mat.roughness = 0.85;
        mat.envMapIntensity = 0.6;
        mat.needsUpdate = true;
        child.material = mat;
      }
    });

    this.setColor("#dfd5cb");
    this.scene.add(this.AppleWatchUltra);
  }

  setColor(color) {
    const base =
      this.AppleWatchUltra.children[0].children[0].children[0].children[0]
        .children[0].children[0].children[0];

    const belt = base.children[13].children[2];

    this.animateColor(base.children[5], color);
    this.animateColor(base.children[7].children[0], color);
    this.animateColor(base.children[7].children[2], color);
    this.animateColor(base.children[10].children[1], color);
    this.animateColor(belt, color);
  }

  animateColor(mesh, targetColor, duration = 0.6) {
    const target = new THREE.Color(targetColor);

    mesh.traverse((child) => {
      if (child.isMesh && child.material?.isMeshStandardMaterial) {
        gsap.to(child.material.color, {
          r: target.r,
          g: target.g,
          b: target.b,
          duration,
          ease: "power3.out",
          onUpdate: () => {
            child.material.needsUpdate = true;
          },
        });
      }
    });
  }

  destroy(onComplete) {
    console.log("destroying watch");
    this.controls?.dispose();
    const object = this.AppleWatchUltra;

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
