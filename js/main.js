// Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";

// To allow for the camera to move around the scene
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";

// To allow for importing the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//keep track of mouse position so we can make the eye move
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2; // / 2 makes center of screen

let object;

let controls;

let objToRender = 'porsche';

//Instantiate a loader for the .gltf file
const loader = new GLTFLoader();

//load the files
loader.load(
    `models/${objToRender}/scene.gltf`,
    function (gltf) {
        object = gltf.scene;
        object.scale.set(2, 2, 2);
        scene.add(object);
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        //if there is an error, log it
        console.error(error);
    }
);



const renderer = new THREE.WebGLRenderer( { alpha: true, antialias: true}); // Alpha: true allows for transparent background
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.domElement.style.width = "100%";
renderer.domElement.style.height = "100%";

document.getElementById("container3D").appendChild(renderer.domElement);

//Set how far the camera will be from the 3D model
camera.position.z = objToRender === "eye" ? 500 : 10;


//Add lights to the scene so we can actually see the 3D model
const topLight = new THREE.DirectionalLight(0xffffff, 2);
topLight.position.set(0, 10, 10)
// topLight.castShadow = true;
scene.add(topLight);

const sideLight = new THREE.DirectionalLight(0xffffff, 1.5);
sideLight.position.set(-10, 0, 10);
scene.add(sideLight);

const backLight = new THREE.DirectionalLight(0xffffff, 1);
backLight.position.set(0, -10, -10);
scene.add(backLight);

const ambientLight = new THREE.AmbientLight(0xffffff, objToRender === "eye" ? 1 : 2.5);
scene.add(ambientLight);

//add a subtle HemisphereLight for natural feel
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x888888, 0.5);
hemiLight.position.set(0, 200, 0);
scene.add(hemiLight);

//Render the scene
function animate() {
    requestAnimationFrame(animate);
    // adding automatic movement

    //make the eye move
    if (object && objToRender === 'eye' || object && objToRender === 'porsche'){
        object.rotation.y = -3 + mouseX / window.innerWidth * 3;
        object.rotation.x = -1.2 + mouseY * 2.5 / window.innerHeight;        
    }
    renderer.render(scene, camera);
}


//add a listener to the window so we can resize the window and the camera
window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight); 
});

document.onmousemove = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
}

//start the 3D rendering
animate();