import './style.css'

import * as THREE from 'three';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(400, window.innerWidth / window.innerHeight, 0.006, 200 );

//Field of view 75 on camera, second argument is aspect ratio, based on browser window, and the last two are view frustrum (visbility relative to the camera)

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );

camera.position.setZ(20);
// renderer.render( scene, camera );



//add stars to random positions x
function addStar() {
	const geoStar = new THREE.SphereGeometry(0.1, 6, 2);
	const materialStar = new THREE.MeshStandardMaterial({ color: 0xfefeee, })
	const star = new THREE.Mesh( geoStar, materialStar );
	const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 45 ));
	// MatUtils randomly generates a number between -100 and 100
	star.position.set(x, y, z);
	scene.add(star)
}
Array(200).fill().forEach(addStar)


//tris parameters
const geometry = new THREE.TorusGeometry( 12, 0.1, 6, 3 );
// const material = new THREE.MeshBasicMaterial({ color: 0x44a64d, wireframe: true });
const material = new THREE.MeshStandardMaterial({ color: 0x44a64d, wireframe: false });
const material2 = new THREE.MeshStandardMaterial({ color: 0x66ff33, wireframe: false });
// color 88ff33
const torus = new THREE.Mesh( geometry, material2 );
const torus2 = new THREE.Mesh( geometry, material );
const torus3 = new THREE.Mesh( geometry, material2 );
const torus4 = new THREE.Mesh( geometry, material );

scene.add(torus);
scene.add(torus2);
scene.add(torus3);
scene.add(torus4);
torus2.rotation.x -= 33;
torus3.rotation.y -= 33;
torus4.rotation.y += 33;

const sunLight = new THREE.AmbientLight(0xfefebe, 1.6);
scene.add(sunLight);

const pointLight = new THREE.PointLight(0x99f1b9, 0.9);
pointLight.position.set(0,-1.8, 0);

scene.add(pointLight);




//gltf scene params
const loader = new GLTFLoader();
// const dracoLoader = new DRACOLoader();
// dracoLoader.setDecoderPath( 'jeje' );
// loader.setDRACOLoader( dracoLoader );


// Load a glTF resource
loader.load(
	// resource URL
	'./scene.gltf',
	// called when the resource is loaded
	function ( gltf ) {

		gltf.animations; // Array<THREE.AnimationClip>
		gltf.scene; // THREE.Group
		gltf.scenes; // Array<THREE.Group>
		gltf.cameras; // Array<THREE.Camera>
		gltf.asset; // Object

		scene.add( gltf.scene );

	},
	// called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);


function animate() {
    requestAnimationFrame(animate);
    torus.rotation.x += 0.012;
	torus.rotation.y += 0.0006;
	torus.rotation.z += 0.012;

	torus2.rotation.x -= 0.012;
	torus2.rotation.y -= 0.0003;
	torus2.rotation.z -= 0.016;

	torus3.rotation.x += 0.012;
	torus3.rotation.y += 0.0003;
	torus3.rotation.z += 0.016;

	torus4.rotation.x -= 0.012;
	torus4.rotation.y -= 0.0006;
	torus4.rotation.z = 0.012;


	scene.rotation.y += 0.003;
    renderer.render( scene, camera );
}
animate();

// function moveCamera () {
// 	const t = document.body.getBoundingClientRect().top;
	
// 	camera.position.z = t * -0.00001;
// 	camera.position.x = t * -0.000001;
// 	camera.position.y = t * -0.000000001;

// }
// document.body.onscroll = moveCamera;