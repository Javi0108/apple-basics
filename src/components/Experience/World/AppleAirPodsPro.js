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
      this.experience.resources.items.AppleAirPodsPro?.scene || null;
    this.mixer = null;
    // this.controls = new ObjectControls(
    //   this.AppleAirPodsPro,
    //   this.experience.canvas
    // );
    if (this.AppleAirPodsPro) {
      this.setObject();
    }
  }

  setObject() {
    // Posición, rotación y escala
    this.AppleAirPodsPro.position.set(0.3, -0.25, 4);
    this.AppleAirPodsPro.rotation.set(0, Math.PI, 0);
    this.AppleAirPodsPro.scale.set(0.2, 0.2, 0.2);

    // Materiales
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

    // Configurar animación si existe
    const clips =
      this.experience.resources.items.AppleAirPodsPro?.animations || [];
    if (clips.length > 0) {
      const clip = clips[0]; // la única animación
      this.mixer = new THREE.AnimationMixer(this.AppleAirPodsPro);
      const action = this.mixer.clipAction(clip);

      action.play();

      // Detener automáticamente a la mitad
      const mitad = clip.duration / 2;
      action.time = 0; // empezar desde el inicio
      action.paused = false;

      // Usamos un setTimeout proporcional a la duración para pausar
      setTimeout(() => {
        action.paused = true;
        action.time = mitad; // asegurarse de quedarse justo en la mitad
      }, mitad * 1000); // convertir segundos a milisegundos
    }
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
