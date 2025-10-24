import * as THREE from 'three';

const canvas = document.getElementById('home-canvas') as HTMLCanvasElement | null;

if (canvas) {
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const light = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(light);

    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        wireframe: true,
        wireframeLinewidth: 0.1,
        wireframeLinecap: 'round',
        wireframeLinejoin: 'round'
    });

    const spheres = [];
    for (let i = 0; i < 10; i++) {
        const sphere = new THREE.Mesh(
            geometry,
            new THREE.MeshBasicMaterial({
                color: 0x00ff00,
                wireframe: true,
                wireframeLinewidth: 0.1,
                wireframeLinecap: 'round',
                wireframeLinejoin: 'round'
            })
        );
        sphere.material.color.setHSL(Math.random(), 1, 0.5);
        sphere.position.x = Math.random() * 8 - 1;
        sphere.position.y = Math.random() * 8 - 1;
        sphere.position.z = Math.random() * 8 - 1;
        spheres.push(sphere);
        scene.add(sphere);
    }

    function animate() {
        requestAnimationFrame(animate);

        renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}
