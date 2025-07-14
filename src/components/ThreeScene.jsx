import { useEffect, useRef } from "react";
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

const ThreeScene = () => {
  // We use a `ref` to give Three.js a DOM element to attach the scene to.
  const mountRef = useRef(null);

  useEffect(() => {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let object;
    let frameId;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );

    let objToRender = "porsche";

    const loader = new GLTFLoader();
    loader.load(
      `/models/${objToRender}/scene.gltf`,
      function (gltf) {
        object = gltf.scene;
        object.scale.set(2, 2, 2);
        scene.add(object);
      },
      function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      function (error) {
        console.error(error);
      }
    );

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    mountRef.current.appendChild(renderer.domElement);

    camera.position.z = objToRender === "eye" ? 500 : 10;

    // Lighting
    const topLight = new THREE.DirectionalLight(0xffffff, 2);
    topLight.position.set(0, 10, 10);
    scene.add(topLight);

    const sideLight = new THREE.DirectionalLight(0xffffff, 1.5);
    sideLight.position.set(-10, 0, 10);
    scene.add(sideLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 1);
    backLight.position.set(0, -10, -10);
    scene.add(backLight);

    const ambientLight = new THREE.AmbientLight(
      0xffffff,
      objToRender === "eye" ? 1 : 2.5
    );
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x888888, 0.5);
    hemiLight.position.set(0, 200, 0);
    scene.add(hemiLight);

    // Animation loop
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      if (object && (objToRender === "eye" || objToRender === "porsche")) {
        object.rotation.y = -3 + (mouseX / window.innerWidth) * 3;
        object.rotation.x = -1.2 + (mouseY * 2.5) / window.innerHeight;
      }
      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      camera.aspect =
        mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        mountRef.current.clientWidth,
        mountRef.current.clientHeight
      );
    };
    window.addEventListener("resize", handleResize);

    // Mouse move handler
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    document.addEventListener("mousemove", handleMouseMove);

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousemove", handleMouseMove);
      if (
        mountRef.current &&
        renderer.domElement.parentNode === mountRef.current
      ) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      data-aos="fade-down"
      data-aos-duration="1500"
      id="container3D"
      className="model-3d"
    ></div>
  );
};

export default ThreeScene;
