import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

// ---------------------------------------------------------
// 1. GRID DEFINITIONS FOR THE WORD "DECIMAL"
// ---------------------------------------------------------
const LETTERS = {
  D: [
    [1, 1, 1, 0], [1, 0, 0, 1], [1, 0, 0, 1], [1, 0, 0, 1], [1, 1, 1, 0]
  ],
  E: [
    [1, 1, 1, 1], [1, 0, 0, 0], [1, 1, 1, 0], [1, 0, 0, 0], [1, 1, 1, 1]
  ],
  C: [
    [1, 1, 1, 1], [1, 0, 0, 0], [1, 0, 0, 0], [1, 0, 0, 0], [1, 1, 1, 1]
  ],
  I: [
    [1], [1], [1], [1], [1]
  ],
  M: [
    [1, 0, 0, 0, 1], [1, 1, 0, 1, 1], [1, 0, 1, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1]
  ],
  A: [
    [0, 1, 1, 0], [1, 0, 0, 1], [1, 1, 1, 1], [1, 0, 0, 1], [1, 0, 0, 1]
  ],
  L: [
    [1, 0, 0, 0], [1, 0, 0, 0], [1, 0, 0, 0], [1, 0, 0, 0], [1, 1, 1, 1]
  ]
};

export default function App() {
  const footerRef = useRef(null);
  const mountRef = useRef(null);
  const [isAssembled, setIsAssembled] = useState(false);
  
  // Use a ref to feed the latest scroll state into the Three.js animation loop safely
  const isAssembledRef = useRef(false);
  useEffect(() => {
    isAssembledRef.current = isAssembled;
  }, [isAssembled]);

  // Handle Scroll intersection
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { setIsAssembled(entry.isIntersecting); },
      { threshold: 0.4 }
    );
    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  // Vanilla Three.js Integration
  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // 1. SCENE & CAMERA
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-width / 2, width / 2, height / 2, -height / 2, -100, 1000);
    camera.position.set(0, 0, 20);
    camera.zoom = width / 38; // Adjust to fit the word perfectly
    camera.updateProjectionMatrix();

    // 2. RENDERER
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // 3. LIGHTING
    scene.add(new THREE.AmbientLight(0xffffff, 0.15));
    
    const dir1 = new THREE.DirectionalLight(0xffffff, 1.5);
    dir1.position.set(0, 20, 5); // Hits Tops
    scene.add(dir1);
    
    const dir2 = new THREE.DirectionalLight(0xffffff, 0.8);
    dir2.position.set(20, 0, 5); // Hits Right Sides
    scene.add(dir2);
    
    const dir3 = new THREE.DirectionalLight(0xffffff, 0.15);
    dir3.position.set(0, 0, 20); // Dim Front Fill
    scene.add(dir3);

    // 4. GROUP & OBLIQUE SHEAR MATRIX
    const group = new THREE.Group();
    const matrix = new THREE.Matrix4();
    // makeShear args: xy, xz, yx, yz, zx, zy
    // This perfectly matches the 1:1 isometric but horizontal look
    matrix.makeShear(0, -0.5, 0, -0.5, 0, 0); 
    group.applyMatrix4(matrix);
    scene.add(group);

    // 5. BUILD THE BLOCKS
    const wordStr = "DECIMAL";
    let currentX = 0;
    const letterData = wordStr.split('').map((char, index) => {
      const grid = LETTERS[char];
      const data = { char, grid, xOffset: currentX, index };
      currentX += grid[0].length + 1.25; 
      return data;
    });
    
    const totalWidth = currentX - 1.25;
    group.position.set(-totalWidth / 2 + 0.5, 2, 0);

    const blocksData = [];
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const colorBase = new THREE.Color('#222222');
    const colorHover = new THREE.Color('#777777');

    letterData.forEach(data => {
      data.grid.forEach((row, y) => {
        row.forEach((val, x) => {
          if (val === 1) {
            const material = new THREE.MeshStandardMaterial({
              color: colorBase.clone(),
              roughness: 0.8,
              metalness: 0.1
            });
            const mesh = new THREE.Mesh(geometry, material);
            mesh.userData = { letterIndex: data.index };
            group.add(mesh);

            const startRotEuler = new THREE.Euler(Math.random() * Math.PI * 4, Math.random() * Math.PI * 4, Math.random() * Math.PI * 4);
            const startPos = new THREE.Vector3((Math.random() - 0.5) * 60, (Math.random() - 0.5) * 60 + 10, (Math.random() - 0.5) * 60 - 20);
            const targetPos = new THREE.Vector3(data.xOffset + x, -y, 0);

            // Initially scatter them
            mesh.position.copy(startPos);
            mesh.quaternion.setFromEuler(startRotEuler);

            blocksData.push({
              mesh,
              material,
              startPos,
              targetPos,
              qStart: new THREE.Quaternion().setFromEuler(startRotEuler),
              qTarget: new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, 0)),
              speed: 2.5 + Math.random() * 2,
              letterIndex: data.index
            });
          }
        });
      });
    });

    // 6. RAYCASTING / HOVER LOGIC
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-2, -2);
    let hoveredLetterIndex = -1;

    const onMouseMove = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    const onMouseLeave = () => {
      mouse.set(-2, -2);
    };
    
    renderer.domElement.addEventListener('mousemove', onMouseMove);
    renderer.domElement.addEventListener('mouseleave', onMouseLeave);

    // 7. ANIMATION LOOP
    const clock = new THREE.Clock();
    let animationFrameId;

    const tick = () => {
      const delta = Math.min(clock.getDelta(), 0.1); // cap delta to prevent large jumps if tab is inactive
      const elapsed = clock.getElapsedTime();
      const assembled = isAssembledRef.current;

      // Handle Raycasting Interaction
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(group.children);
      
      if (intersects.length > 0 && assembled) {
        hoveredLetterIndex = intersects[0].object.userData.letterIndex;
        document.body.style.cursor = 'pointer';
      } else {
        hoveredLetterIndex = -1;
        document.body.style.cursor = 'auto';
      }

      // Update blocks
      blocksData.forEach(b => {
        const isHovered = b.letterIndex === hoveredLetterIndex;
        const tPos = assembled ? b.targetPos : b.startPos;
        const tQuat = assembled ? b.qTarget : b.qStart;

        const finalPos = tPos.clone();
        
        // Add Bounce physics
        if (assembled && isHovered) {
          finalPos.y += Math.sin(elapsed * 8) * 0.15 + 0.3;
        }

        // Apply Lerp for smooth assembly/scatter
        b.mesh.position.lerp(finalPos, delta * b.speed);
        b.mesh.quaternion.slerp(tQuat, delta * b.speed);

        // Apply Color Lerp
        const targetColor = isHovered ? colorHover : colorBase;
        b.material.color.lerp(targetColor, delta * 6);
      });

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(tick);
    };
    tick();

    // 8. RESIZE HANDLER
    const onResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      renderer.setSize(w, h);
      camera.left = -w / 2;
      camera.right = w / 2;
      camera.top = h / 2;
      camera.bottom = -h / 2;
      camera.zoom = w / 38;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    // 9. CLEANUP
    return () => {
      window.removeEventListener('resize', onResize);
      renderer.domElement.removeEventListener('mousemove', onMouseMove);
      renderer.domElement.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      document.body.style.cursor = 'auto';
      if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      group.traverse(child => {
        if (child.isMesh) {
          child.geometry.dispose();
          child.material.dispose();
        }
      });
    };
  }, []);

  return (
    <div className="w-full bg-neutral-950 font-sans text-neutral-200 overflow-x-hidden">
      {/* Hero / Scroll Content to push footer down */}
      <div className="h-[120vh] w-full flex flex-col items-center justify-center bg-gradient-to-b from-neutral-900 to-neutral-950 relative">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">
          SCROLL DOWN
        </h1>
        <p className="text-neutral-500 tracking-widest uppercase text-sm md:text-base">
          To reveal the 3D signature
        </p>
        <div className="absolute bottom-24 flex flex-col items-center animate-bounce">
          <div className="w-[2px] h-12 bg-neutral-600 mb-2"></div>
          <div className="w-3 h-3 border-r-2 border-b-2 border-neutral-600 rotate-45 transform translate-y-[-6px]"></div>
        </div>
      </div>

      {/* Footer Section containing the Canvas */}
      <footer 
        ref={footerRef} 
        className="h-[80vh] w-full bg-black relative flex items-center justify-center overflow-hidden border-t border-neutral-900"
      >
        <div ref={mountRef} className="absolute inset-0 z-0" />

        <div className="absolute bottom-8 left-0 right-0 flex justify-center pointer-events-none z-10">
           <p className="text-neutral-700 text-xs tracking-[0.3em] font-mono">
             HOVER LETTERS TO INTERACT
           </p>
        </div>
      </footer>
    </div>
  );
}