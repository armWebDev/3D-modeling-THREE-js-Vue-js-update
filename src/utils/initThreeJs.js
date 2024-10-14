import * as THREE from 'three'
import { scene, plane } from './sharedVariables';

const initThreeJs = (sceneContainer, camera) => {


  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight);
  sceneContainer.appendChild(renderer.domElement);




  const planeGeometry = new THREE.PlaneGeometry(100, 100, 1, 1);
  const planeMaterial = new THREE.MeshBasicMaterial({ visible: false });
  plane.value = new THREE.Mesh(planeGeometry, planeMaterial);

  scene.add(plane.value);



  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  animate();


  window.addEventListener('resize', () => {
    renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight);
    camera.aspect = sceneContainer.clientWidth / sceneContainer.clientHeight;
    camera.updateProjectionMatrix();
  });
};

export default initThreeJs;

