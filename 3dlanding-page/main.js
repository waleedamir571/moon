import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import moonTexture from './assets/moon-texture.jpg';
import moonDisplacementMap from './assets/moon-displacement.jpg';

const scene = new THREE.Scene();

const geometry = new THREE.SphereGeometry(3, 64, 64);

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load(moonTexture);
const displacementMap = textureLoader.load(moonDisplacementMap);

const material = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  map: texture,
  displacementMap: displacementMap,
  displacementScale: 0.1, // Adjust this scale for the displacement effect
  bumpScale: 0.04,
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

let w;
if (window.innerWidth < 800) {
  w = window.innerWidth;
} else {
  w = window.innerWidth / 2;
}
let h = window.innerHeight;

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(100, 10, 5);
scene.add(light);

const camera = new THREE.PerspectiveCamera(25, w / h);
camera.position.z = 20;
scene.add(camera);

const canvas = document.querySelector("#webgl");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});

renderer.setSize(w, h);
renderer.render(scene, camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;

window.addEventListener("resize", () => {
  if (window.innerWidth < 800) {
    w = window.innerWidth;
  } else {
    w = window.innerWidth / 2;
  }
  h = window.innerHeight;

  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
});

const loop = () => {
  mesh.rotation.y += 0.001;
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};

loop();
