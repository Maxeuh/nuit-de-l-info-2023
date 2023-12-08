// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // Enable transparency
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0); // Set clear color to black with 0 opacity
renderer.gammaOutput = true;
renderer.gammaFactor = 2.2;
document.getElementById("planet").appendChild(renderer.domElement);

// Enhanced Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 10);
pointLight.position.set(5, 3, 5);
scene.add(pointLight);

// Earth creation with enhanced material
const geometry = new THREE.SphereGeometry(1, 32, 32);
const texture = new THREE.TextureLoader().load('earth.jpg');
const material = new THREE.MeshPhongMaterial({
    map: texture,
    bumpMap: texture,
    bumpScale: 0.05,
    specular: new THREE.Color('white'),
    shininess: 10
});
const earth = new THREE.Mesh(geometry, material);
scene.add(earth);

camera.position.z = 5;

// Animation function
function animate() {
    requestAnimationFrame(animate);

    // Rotation
    earth.rotation.y -= 0.005;

    renderer.render(scene, camera);
}

animate();
