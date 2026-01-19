import Experience from "../Experience.js";
import ObjectControls from "../Utils/ObjectControls.js";
import * as THREE from "three";
import gsap from "gsap";

export default class AppleIphone17Pro {
  constructor() {
    this.experience = Experience.instance;
    this.scene = this.experience.scene;
    this.AppleIphone17Pro =
      this.experience.resources.items.AppleIphone17Pro.scene;
    this.controls = new ObjectControls(
      this.AppleIphone17Pro,
      this.experience.canvas,
    );
    this.setObject();
    this.setListeners();
  }

  setObject() {
    this.AppleIphone17Pro.position.set(2, 0, 2);
    this.AppleIphone17Pro.scale.set(15, 15, 15);

    this.AppleIphone17Pro.traverse((child) => {
      if (child.isMesh && child.material?.isMeshStandardMaterial) {
        const mat = child.material.clone();
        mat.opacity = 1;
        child.material = mat;
      }
    });

    const carcase = this.AppleIphone17Pro.children[0].children[0];

    carcase.traverse((child) => {
      if (child.isMesh && child.material?.isMeshStandardMaterial) {
        const mat = child.material.clone();
        mat.envMap = this.experience.world.environment.envMap;
        mat.envMapIntensity = 0.6;
        mat.metalness = 1.0;
        mat.roughness = 0.55;
        mat.needsUpdate = true;
        child.material = mat;
      }
    });

    this.setColor("#E7E7E7");
    this.scene.add(this.AppleIphone17Pro);
  }

  setColor(color) {
    const root = this.AppleIphone17Pro.children[0];

    // Carcasa principal
    for (let i = 0; i < 8; i++) {
      this.animateColor(root.children[i], color);
    }

    // Cámaras
    for (let i = 8; i < 11; i++) {
      for (let j = 0; j < 3; j++) {
        this.animateColor(root.children[i].children[j], color);
      }
    }
  }

  animateColor(mesh, color, duration = 0.6) {
    const target = new THREE.Color(color);

    mesh.traverse((child) => {
      if (child.isMesh && child.material?.isMeshStandardMaterial) {
        // Clonar solo una vez
        if (!child.material.userData._isCloned) {
          child.material = child.material.clone();
          child.material.userData._isCloned = true;
        }

        gsap.to(child.material.color, {
          r: target.r,
          g: target.g,
          b: target.b,
          duration,
          ease: "power3.out",
        });
      }
    });
  }

  destroy(onComplete) {
    this.controls?.dispose();
    const object = this.AppleIphone17Pro;

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
