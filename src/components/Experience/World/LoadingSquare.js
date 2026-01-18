export default class LoadingSquare {
  constructor() {
    this.experience = Experience.instance; // 👈 MUY IMPORTANTE
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.setGeometry();
    this.setListeners();
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(2, 2);
    this.material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uAlpha: { value: 1 },
      },
      fragmentShader: `
        uniform float uAlpha;
        void main(){
          gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
        }
      `,
    });

    this.plane = new THREE.Mesh(this.geometry, this.material);
    this.plane.position.set(0, 0, 1);
    this.scene.add(this.plane);
  }

  setListeners() {
    this.resources.on("ready", () => {
      gsap.to(this.material.uniforms.uAlpha, {
        value: 0,
        duration: 1.2,
        ease: "power3.out",
        onComplete: () => {
          this.scene.remove(this.plane);
          this.geometry.dispose();
          this.material.dispose();
        },
      });
    });
  }
}
