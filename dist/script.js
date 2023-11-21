//import {OrbitControls} from 'https://unpkg.com/three@0.158.0/examples/jsm/controls/OrbitControls.js' xxx
import * as THREE from 'https://unpkg.com/three@0.158.0/build/three.module.js';
const canvas = document.querySelector('canvas.webgl')





// init

const camera = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 0.01, 10 );
const clipcamera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 1000 );

camera.position.z = .6;
//camera.position.x = 2;
//camera.position.y = 3;
//camera.lookAt(0,0,0);
clipcamera.position.z = .6;
clipcamera.lookAt(0,0,0);
var helper = new THREE.CameraHelper( clipcamera );

var frustum = new THREE.Frustum();
frustum.setFromProjectionMatrix(
new THREE.Matrix4().multiplyMatrices(clipcamera.projectionMatrix, clipcamera.matrixWorldInverse));

const scene = new THREE.Scene();

const geometry = new THREE.SphereGeometry(1, 50, 30);
const geometrymesh = new THREE.SphereGeometry(.98, 50, 30);
const geometry2 = new THREE.SphereGeometry(.95, 220, 120);

//geometry.translate(1,0,0);
//geometry2.translate(1,0,0);

var texture = new THREE.TextureLoader().load( "https://raw.githubusercontent.com/lovetheland/shimmer/main/dist/amarillobigx.jpg", THREE.UVMapping );
var material = new THREE.MeshBasicMaterial({
  map: texture,
  side: THREE.DoubleSide,
  reflectivity: 0
//  color: 0xffffff
//  wireframe: true
//  clippingPlanes: frustum.planes
});

var wiremat = new THREE.MeshBasicMaterial({
 // side: THREE.BackSide,
  wireframe: true,
  reflectivity: 0
//  wireframeLinewidth: .5
//  clippingPlanes: frustum.planes
});

const blurTexture = new THREE.TextureLoader().load("https://raw.githubusercontent.com/forestshan/forestshan.github.pages/3a87806e16755c118778a8a1f47d630bb4e49cb5/amarilloblur.jpg", THREE.UVMapping );

const material2 = new THREE.MeshPhysicalMaterial({
  normalMap: blurTexture,
    roughness: 1,
    transmission: 1,
    clearcoat: 0,
    thickness: .03,
    reflectivity: 0,
    side: THREE.BackSide,
    ior: 1,
    metalness: 0,
    specularIntensity: 0,
    sheen: 0,
    clippingPlanes: frustum.planes
});

const wiremesh = new THREE.Mesh( geometrymesh, wiremat );
const mesh = new THREE.Mesh( geometry, material );
const mesh2 = new THREE.Mesh( geometry2, material2 );

scene.add( mesh, mesh2 );

const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animation );
renderer.outputEncoding = THREE.LinearEncoding;
renderer.localClippingEnabled = true;


// animation
function animation( time ) {
  mesh.rotation.y = Math.sin(time * .00002) * 5 - 3;
  wiremesh.rotation.y = Math.sin(time * .00002) * 5 - 3;
  mesh2.rotation.y = -Math.sin(time * .00002) * 5;

  renderer.render( scene, camera );
  document.body.appendChild( renderer.domElement );
}