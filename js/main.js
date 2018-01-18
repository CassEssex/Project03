// Three.js
// Renderer - Visual display of data
// Scene - Data (what shapes, what colours etc.)
// Lights
// Cameras
// Meshes (Geometry + Material === Shapes)

let cube = null;
let sphere = null;
let controls = null;
let gui = null;
let step = 0;

const renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.shadowMap.enabled = true;
renderer.setPixelRatio(window.devicePixelRatio || 1);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.x = -30;
camera.position.y = 40;
camera.position.z = 30;

camera.lookAt(scene.position);

// When we add new before the creation of a function
// It does two things for us in regards to the keyword `this`:
// 1. It sets `this` to a new empty object
// 2. Automatically returns the keyword `this` (that empty object)
// prettier-ignore
const controller = new function() {
  this.rotationSpeed = 0.02;
  this.bouncingSpeed = 0.02;
};

const animate = () => {
  step += controller.bouncingSpeed;

  cube.position.y = 2 + 10 * Math.abs(Math.sin(step));

  cube.rotation.x += controller.rotationSpeed;
  cube.rotation.y += controller.rotationSpeed;
  cube.rotation.z += controller.rotationSpeed;

  sphere.position.x = 20 + 10 * Math.tan(step);
  sphere.position.y = 2 + 10 * Math.abs(Math.sin(step));

  // Change the position of meshes
  // Change the rotation of meshes
  // Rerender the renderer (using the scene and the camera)
  renderer.render(scene, camera);
  // Showing the user the updated scene
  requestAnimationFrame(animate);
};

const addAxes = () => {
  const axes = new THREE.AxesHelper(20);
  scene.add(axes);
};

const addPointLight = () => {
  const pointLight = new THREE.PointLight(0xffffff);
  pointLight.position.set(-40, 60, 20);
  pointLight.castShadow = true;
  pointLight.shadow.mapSize.width = 2048;
  pointLight.shadow.mapSize.height = 2048;
  scene.add(pointLight);
};

const addSphere = () => {
  const sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
  const sphereMaterial = new THREE.MeshLambertMaterial({
    color: 0x039be5
  });
  sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.position.x = 20; // Left to right
  sphere.position.y = 4; // Top to bottom
  sphere.position.z = 2; // Near to far
  sphere.castShadow = true;
  // sphere.receiveShadow = true;
  scene.add(sphere);
};

const addCube = () => {
  // In order to show the user a shape:
  // 1. Create your material
  // 2. Create your geometry
  // 3. Create your mesh (material + geometry)
  // 4. Add the mesh into the scene
  // 5. Re-render the renderer (use the scene and the camera)
  const cubeMaterial = new THREE.MeshLambertMaterial({
    color: 0xff8f00
  });
  const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
  cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.position.x = -4;
  cube.position.y = 3;
  cube.castShadow = true;
  scene.add(cube);
};

const addPlane = () => {
  const planeGeometry = new THREE.PlaneGeometry(60, 20);
  const planeMaterial = new THREE.MeshLambertMaterial({
    color: 0xcfd8dc,
    side: THREE.DoubleSide
  });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.x = 15;
  plane.position.y = 0;
  plane.position.z = 0;
  plane.receiveShadow = true;

  scene.add(plane);
};

const init = () => {
  // Interact with the renderer (change size, background)
  renderer.setClearColor(0xeceff1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  // Create some basic meshes
  // Add them into the scene
  // Put the renderer on the page
  // Re-render the renderer

  addAxes();
  addPlane();
  addCube();
  addSphere();
  addPointLight();

  gui = new dat.GUI();
  gui.add(controller, "rotationSpeed", 0, 5);
  gui.add(controller, "bouncingSpeed", 0, 5);

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  // Render the scene!  Use the renderer, pass in a scene and a camera
  renderer.render(scene, camera);
  document.querySelector("#output").appendChild(renderer.domElement);

  animate(); // Re-render the scene and update the shapes as quickly as you can
};

window.onload = init;

const onResize = () => {
  // Change the aspect ratio of the camera
  camera.aspect = window.innerWidth / window.innerHeight;
  // Update the shapes and their positions
  camera.updateProjectionMatrix();
  // Update the size of the renderer itself
  renderer.setSize(window.innerWidth, window.innerHeight);
};

window.addEventListener("resize", onResize);
 
