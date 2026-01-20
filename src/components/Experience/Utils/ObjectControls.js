import * as THREE from "three";

export default class ObjectControls {
  constructor(object, domElement, camera) {
    this.object = object;
    this.domElement = domElement;
    this.camera = camera;

    this.isDragging = false;
    this.prev = { x: 0, y: 0 };

    this.rotationSpeed = 0.002;
    this.minX = -Math.PI / 2;
    this.maxX = Math.PI / 2;

    this.pitch = 0;

    this._addEvents();
  }

  /* ================= EVENTS ================= */

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

    this._rotate(dx, dy);

    this.prev.x = e.clientX;
    this.prev.y = e.clientY;
  };

  _onUp = () => {
    this.isDragging = false;
  };

  /* ================= ROTATION ================= */

  _rotate(dx, dy) {
    /** YAW */
    const qYaw = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(0, 1, 0),
      dx * this.rotationSpeed,
    );
    this.object.quaternion.premultiply(qYaw);

    /** PITCH */
    const right = new THREE.Vector3(1, 0, 0)
      .applyQuaternion(this.camera.quaternion)
      .normalize();

    const newPitch = THREE.MathUtils.clamp(
      this.pitch + dy * this.rotationSpeed,
      this.minX,
      this.maxX,
    );

    const deltaPitch = newPitch - this.pitch;
    this.pitch = newPitch;

    const qPitch = new THREE.Quaternion().setFromAxisAngle(right, deltaPitch);
    this.object.quaternion.premultiply(qPitch);
  }

  _removeRoll() {
    const euler = new THREE.Euler().setFromQuaternion(
      this.object.quaternion,
      "YXZ",
    );

    euler.z = 0;

    this.object.quaternion.setFromEuler(euler);
  }

  dispose() {
    this.domElement.removeEventListener("pointerdown", this._onDown);
    window.removeEventListener("pointermove", this._onMove);
    window.removeEventListener("pointerup", this._onUp);
  }
}
