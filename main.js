import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import spaceImg from "./img/space.jpg";
import normalImg from "./img/normal.jpg";
import planetImg from "./img/planet.jpg";
import groguImg from "./img/helmet_grogu.jpg";
import venusImg from "./img/venus.jpg";
import sunImg from "./img/sun.jpg";

// THREE components

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

const orbit = new OrbitControls(camera, renderer.domElement);

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.set(-90, 140, 140);
orbit.update();


renderer.render( scene, camera );

const textureLoader = new THREE.TextureLoader();

const pointLight = new THREE.PointLight(0xffffff, 2, 300);
const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);

// function addStar() {
//   const geometry = new THREE.SphereGeometry(0.25, 24, 24);
//   const material = new THREE.MeshStandardMaterial( {color: 0xffffff })
//   const star = new THREE.Mesh( geometry, material );

//   const [x, y, z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread( 100 ));

//   star.position.set(x, y, z);
//   scene.add(star)

// }

// Array(200).fill().forEach(addStar)


const spaceTexture = new THREE.TextureLoader().load(spaceImg);
scene.background = spaceTexture;

// const grogTexture = new THREE.TextureLoader().load(groguImg);

// const grogu = new THREE.Mesh(
//   new THREE.BoxGeometry(3,3,3),
//   new THREE.MeshBasicMaterial( { map: grogTexture })
// )

// scene.add(grogu);

const marsGeo = new THREE.SphereGeometry(3.2, 30, 30);
const marsMat = new THREE.MeshStandardMaterial({
    map: textureLoader.load(planetImg)
});
const mars = new THREE.Mesh(marsGeo, marsMat)

scene.add(mars)
const marsObj = new THREE.Object3D();
scene.add(marsObj)

mars.position.x = 28;

const sunGeo = new THREE.SphereGeometry(16, 30, 30);
const sunMat = new THREE.MeshBasicMaterial({
    map: textureLoader.load(sunImg)
});
const sun = new THREE.Mesh(sunGeo, sunMat)
scene.add(sun)

// function moveCamera() {

//   const t = document.body.getBoundingClientRect().top;
//   planet.rotation.x += 0.05;
//   planet.rotation.y += 0.075;
//   planet.rotation.z += 0.05;

//   grogu.rotation.y += 0.01;
//   grogu.rotation.z += 0.01;

//   camera.position.z = t * -0.01;
//   camera.position.x = t * -0.0002;
//   camera.position.y = t * -0.0002;

// }
// document.body.onscroll = moveCamera;

function animate() {
  requestAnimationFrame( animate );

  sun.rotateY(0.004)
  mars.rotateY(0.004)
  marsObj.rotateY(0.04)

  renderer.render( scene, camera );
}

animate()

window.addEventListener('resize', function() {
  camera.aspect = this.window.innerWidth / this.window.innerHeight;
  camera.updateMatrix();
  renderer.setSize(this.window.innerWidth, this.window.innerHeight);
})