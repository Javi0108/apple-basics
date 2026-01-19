import * as THREE from "three";
import gsap from "gsap";

export default class ObjectControls {
  constructor(object, domElement) {
    this.object = object;
    this.domElement = domElement;

    this.isDragging = false;
    this.prev = { x: 0, y: 0 };

    this.rotationSpeed = 0.005;
    this.minX = -Math.PI / 2;
    this.maxX = Math.PI / 2;

    this._addEvents();
  }

  _addEvents() {
    this.domElement.addEventListener("pointerdown", this._onDown);
    window.addEventListener("pointermove", this._onMove);
    window.addEventListener("pointerup", this._onUp);
  }

  _onDown = (e) => {
    this.isDragging = true;
    this.prev.x = e.clientX;
    this.prev.y = e.clientY;
  };

  _onMove = (e) => {
    if (!this.isDragging) return;

    const dx = e.clientX - this.prev.x;
    const dy = e.clientY - this.prev.y;

    this.object.rotation.y += dx * this.rotationSpeed;
    this.object.rotation.x += dy * this.rotationSpeed;

    this.object.rotation.x = THREE.MathUtils.clamp(
      this.object.rotation.x,
      this.minX,
      this.maxX,
    );
    this.velocityX = dx;

    this.prev.x = e.clientX;
    this.prev.y = e.clientY;
  };

  _onUp = () => {
    this.isDragging = false;
    const vel = this.velocityX || 0;
    gsap.to(this.object.rotation, {
      y: this.object.rotation.y + vel * 0.5,
      duration: 0.6,
      ease: "power3.out",
    });
    this.velocityX = 0;
  };

  dispose() {
    this.domElement.removeEventListener("pointerdown", this._onDown);
    window.removeEventListener("pointermove", this._onMove);
    window.removeEventListener("pointerup", this._onUp);
  }
}
