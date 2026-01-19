import EventEmitter from "./EventEmitter.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { HDRLoader } from "three/examples/jsm/loaders/HDRLoader.js";
import * as THREE from "three";

const loadingBar = document.querySelector(".loader");
//const loadingNumber = document.querySelector(".loading-number");

export default class Resources extends EventEmitter {
  constructor(sources) {
    super();
    this.sources = sources;
    this.items = {};
    this.toLoad = this.sources.length;
    this.loaded = 0;
    this.setLoaders();
    this.startLoading();
  }

  setLoaders() {
    this.loaders = {};
    this.loadingManager = new THREE.LoadingManager();

    this.loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
      const progress = itemsLoaded / itemsTotal;
      document.querySelector(".progress-text").innerHTML = `${(
        progress.toFixed(2) * 100
      ).toFixed(0)}%`;
      this.trigger("progress", progress);
    };

    this.loaders.gltfLoader = new GLTFLoader(this.loadingManager);
    this.loaders.hdrLoader = new HDRLoader(this.loadingManager);
    this.loaders.textureLoader = new THREE.TextureLoader(this.loadingManager);
  }

  startLoading() {
    for (const source of this.sources) {
      if (source.type === "gltfModel") {
        this.loaders.gltfLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === "environment") {
        this.loaders.hdrLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === "texture") {
        this.loaders.textureLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      }
    }
  }

  sourceLoaded(source, file) {
    this.items[source.name] = file;
    this.loaded++;
    if (this.loaded === this.toLoad) {
      this.trigger("ready");
    }
  }
}
