//import {OrbitControls} from 'https://unpkg.com/three@0.158.0/examples/jsm/controls/OrbitControls.js' xxx
import * as THREE from 'https://unpkg.com/three@0.158.0/build/three.module.js';
const canvas = document.querySelector('canvas.webgl')



// init

const aspect = (window.innerWidth) / (window.innerHeight)
const ww = window.innerWidth;
const hh = window.innerHeight;
const crop = window.innerHeight * .125;
const wwcrop = ww - crop;
const hhcrop = hh - crop;

const camera = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 0.01, 10 );
const clipcamera = new THREE.PerspectiveCamera( 70, (wwcrop) / (hhcrop), 0.01, 1000 );

console.log(aspect)

camera.position.z = .6;
//camera.position.x = 1;
//camera.position.y = 2;
//camera.lookAt(0,0,0);
clipcamera.position.z = .6;
clipcamera.lookAt(0,0,0);
var helper = new THREE.CameraHelper( clipcamera );

var frustum = new THREE.Frustum();
frustum.setFromProjectionMatrix(
new THREE.Matrix4().multiplyMatrices(clipcamera.projectionMatrix, clipcamera.matrixWorldInverse));

var frustum2 = new THREE.Frustum();
frustum2.setFromProjectionMatrix(
new THREE.Matrix4().multiplyMatrices(clipcamera.projectionMatrix, clipcamera.matrixWorldInverse));

//var frustum2 = new THREE.Frustum(frustum.plane[0],frustum.plane[0]);


const scene = new THREE.Scene();

const geometry = new THREE.SphereGeometry(1, 50, 30);
const geometrymesh = new THREE.SphereGeometry(.98, 50, 30);
const geometry2 = new THREE.SphereGeometry(.95, 220, 120);

//geometry.translate(1,0,0);
//geometry2.translate(1,0,0);

//phelper = new THREE.PlaneHelper(frustum.planes[1], 1, 0xFF0000);
//scene.add(phelper);

let planearr = [frustum2.planes[0].negate(), frustum2.planes[1].negate(), 
frustum2.planes[2].negate(), frustum2.planes[3].negate(),
frustum2.planes[4].negate(), frustum2.planes[5].negate()]

var texture = new THREE.TextureLoader().load( "https://raw.githubusercontent.com/lovetheland/shimmer/main/dist/amarillobigx.jpg", THREE.UVMapping );
var material = new THREE.MeshBasicMaterial({
  map: texture,
  side: THREE.BackSide,
  reflectivity: 0,
//  color: 0xffffff
//  wireframe: true
//  clippingPlanes: frustum.planes,

});

var wiremat = new THREE.MeshBasicMaterial({
 // side: THREE.BackSide,
  wireframe: true,
  reflectivity: 0,
  clippingPlanes: planearr,
  clipIntersection: true
//  clippingPlanes: new THREE.Plane( new THREE.Vector3( 0, .1, .1 ), .1 )

//  wireframeLinewidth: .5
//  clippingPlanes: frustum.planes
});

const blurTexture = new THREE.TextureLoader().load("https://raw.githubusercontent.com/forestshan/forestshan.github.pages/3a87806e16755c118778a8a1f47d630bb4e49cb5/amarilloblur.jpg", THREE.UVMapping );

const material2 = new THREE.MeshPhysicalMaterial({
  normalMap: blurTexture,
//  map: blurTexture,
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
    clippingPlanes: frustum.planes,
  //  clipIntersection: true
});

console.log();

const wiremesh = new THREE.Mesh( geometrymesh, wiremat );
const mesh = new THREE.Mesh( geometry, material );
const mesh2 = new THREE.Mesh( geometry2, material2 );




scene.add( mesh, mesh2, wiremesh );

var canvReference = document.getElementById("my_canvas");

const renderer = new THREE.WebGLRenderer( { antialias: true, canvas: canvReference
} );
renderer.setSize( window.innerWidth*2, window.innerHeight*2 );
renderer.setAnimationLoop( animation );
renderer.outputEncoding = THREE.LinearEncoding;
renderer.localClippingEnabled = true;


// animation
function animation( time ) {
  mesh.rotation.y = Math.sin(time * .000001) * 5 - 3;
  wiremesh.rotation.y = Math.sin(time * .000001) * 5 - 3;
  mesh2.rotation.y = -Math.sin(time * .000004) * 5;

  renderer.render( scene, camera );
  document.body.appendChild( renderer.domElement );
}