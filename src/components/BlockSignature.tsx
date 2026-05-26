"use client";

import React from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { cn } from "@/lib/utils";

const LETTERS = {
  J: [
    "000011",
    "000011",
    "000011",
    "000011",
    "110011",
    "110011",
    "011110",
  ],
  O: [
    "011110",
    "110011",
    "110011",
    "110011",
    "110011",
    "110011",
    "011110",
  ],
  H: [
    "110011",
    "110011",
    "110011",
    "111111",
    "110011",
    "110011",
    "110011",
  ],
  N: [
    "1100011",
    "1110011",
    "1111011",
    "1101111",
    "1100111",
    "1100011",
    "1100011",
  ],
  L: [
    "110000",
    "110000",
    "110000",
    "110000",
    "110000",
    "110000",
    "111111",
  ],
  E: [
    "111111",
    "110000",
    "110000",
    "111110",
    "110000",
    "110000",
    "111111",
  ],
  S: [
    "011111",
    "110000",
    "110000",
    "011110",
    "000011",
    "000011",
    "111110",
  ],
  T: [
    "111111",
    "001100",
    "001100",
    "001100",
    "001100",
    "001100",
    "001100",
  ],
  R: [
    "111110",
    "110011",
    "110011",
    "111100",
    "110110",
    "110011",
    "110011",
  ],
} as const;

const TEXT = "JOHN LESTER";
const CHAR_SPACING = 2;
const WORD_SPACING = 6;
const DEPTH_STRATA = 4;
const BASE_COLOR = new THREE.Color(0x444444);
const HOVER_COLOR = new THREE.Color(0x999999);
const REVEAL_HOLD_MS = 1800;

type LetterKey = keyof typeof LETTERS;

type BlockData = {
  id: number;
  letterIndex: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  currX: number;
  currY: number;
  currZ: number;
  targetX: number;
  targetY: number;
  targetZ: number;
  hoverOffset: number;
  currentColor: THREE.Color;
};

type BlockSignatureProps = {
  className?: string;
  variant?: "full-bleed" | "footer";
};

export function BlockSignature({
  className,
  variant = "footer",
}: BlockSignatureProps) {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const mountRef = React.useRef<HTMLDivElement>(null);
  const isAssembledRef = React.useRef(false);
  const hasPlayedCinematicForEntryRef = React.useRef(false);
  const cinematicQueuedRef = React.useRef(false);
  const cinematicActiveRef = React.useRef(false);
  const cinematicStartedAtRef = React.useRef(0);
  const freeModeUnlockedRef = React.useRef(false);
  const cinematicTimeoutRef = React.useRef<number | null>(null);
  React.useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isAssembledRef.current = entry.isIntersecting;

        if (
          entry.isIntersecting &&
          !hasPlayedCinematicForEntryRef.current &&
          !cinematicQueuedRef.current &&
          !cinematicActiveRef.current
        ) {
          cinematicQueuedRef.current = true;
          freeModeUnlockedRef.current = false;
          cinematicTimeoutRef.current = window.setTimeout(() => {
            cinematicTimeoutRef.current = null;

            if (!isAssembledRef.current || hasPlayedCinematicForEntryRef.current) {
              cinematicQueuedRef.current = false;
              return;
            }

            cinematicQueuedRef.current = false;
            hasPlayedCinematicForEntryRef.current = true;
            cinematicActiveRef.current = true;
            cinematicStartedAtRef.current = performance.now();
          }, REVEAL_HOLD_MS);
        }

        if (!entry.isIntersecting) {
          if (cinematicTimeoutRef.current !== null) {
            window.clearTimeout(cinematicTimeoutRef.current);
            cinematicTimeoutRef.current = null;
          }
          cinematicQueuedRef.current = false;
          cinematicActiveRef.current = false;
          freeModeUnlockedRef.current = false;
          hasPlayedCinematicForEntryRef.current = false;
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
      if (cinematicTimeoutRef.current !== null) {
        window.clearTimeout(cinematicTimeoutRef.current);
      }
    };
  }, [variant]);

  React.useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;

    let totalWidth = 0;
    for (let index = 0; index < TEXT.length; index += 1) {
      const char = TEXT[index];
      if (char === " ") {
        totalWidth += WORD_SPACING;
        continue;
      }

      const grid = LETTERS[char as LetterKey];
      totalWidth += grid[0].length + CHAR_SPACING;
    }
    totalWidth -= CHAR_SPACING;

    const scene = new THREE.Scene();
    scene.background = variant === "full-bleed" ? new THREE.Color(0x050505) : null;

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 1, 1000);
    camera.position.set(50, 50, 50);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: variant !== "full-bleed",
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.enabled = false;
    const freeModeTarget = new THREE.Vector3(0, 0.4, 0);
    const freeModeShot = {
      position: new THREE.Vector3(12, 11, 82),
      zoom: 1.02,
    } as const;
    controls.target.copy(freeModeTarget);
    controls.update();

    const cinematicShots = [
      { position: new THREE.Vector3(50, 50, 50), zoom: 1.08 },
      { position: new THREE.Vector3(-78, 10, 14), zoom: 1.7 },
      { position: new THREE.Vector3(78, 10, 14), zoom: 1.7 },
      { position: new THREE.Vector3(22, 14, 18), zoom: 2.7 },
      freeModeShot,
    ] as const;
    const cinematicSegmentDuration = 1500;
    const cinematicTotalDuration = cinematicSegmentDuration * (cinematicShots.length - 1);
    let currentZoom: number = cinematicShots[0].zoom;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const topLight = new THREE.DirectionalLight(0xffffff, 1.2);
    topLight.position.set(0, 20, 0);
    scene.add(topLight);

    const rightLight = new THREE.DirectionalLight(0xffffff, 0.6);
    rightLight.position.set(0, 0, 20);
    scene.add(rightLight);

    const leftLight = new THREE.DirectionalLight(0xffffff, 0.15);
    leftLight.position.set(20, 0, 0);
    scene.add(leftLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 0.55);
    backLight.position.set(0, 0, -20);
    scene.add(backLight);

    const textGroup = new THREE.Group();
    scene.add(textGroup);

    const blocksData: BlockData[] = [];
    const dummyMatrix = new THREE.Object3D();

    let startX = -totalWidth / 2;
    let indexCounter = 0;

    for (let textIndex = 0; textIndex < TEXT.length; textIndex += 1) {
      const char = TEXT[textIndex];

      if (char === " ") {
        startX += WORD_SPACING;
        continue;
      }

      const grid = LETTERS[char as LetterKey];

      for (let rowIndex = 0; rowIndex < grid.length; rowIndex += 1) {
        for (let columnIndex = 0; columnIndex < grid[rowIndex].length; columnIndex += 1) {
          if (grid[rowIndex][columnIndex] !== "1") continue;

          for (let depthIndex = 0; depthIndex < DEPTH_STRATA; depthIndex += 1) {
            const targetX = startX + columnIndex;
            const targetY = -rowIndex + 3.5;
            const targetZ = -depthIndex + DEPTH_STRATA / 2;

            const scatterX = targetX + (Math.random() - 0.5) * 60;
            const scatterY = targetY + (Math.random() - 0.5) * 60 + 40;
            const scatterZ = targetZ + (Math.random() - 0.5) * 60;

            blocksData.push({
              id: indexCounter,
              letterIndex: textIndex,
              baseX: targetX,
              baseY: targetY,
              baseZ: targetZ,
              currX: scatterX,
              currY: scatterY,
              currZ: scatterZ,
              targetX: scatterX,
              targetY: scatterY,
              targetZ: scatterZ,
              hoverOffset: 0,
              currentColor: new THREE.Color(0x444444),
            });

            indexCounter += 1;
          }
        }
      }

      startX += grid[0].length + CHAR_SPACING;
    }

    const geometry = new THREE.BoxGeometry(1.001, 1.001, 1.001);
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.8,
      metalness: 0.2,
      flatShading: true,
    });

    const instancedMesh = new THREE.InstancedMesh(geometry, material, blocksData.length);
    instancedMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

    blocksData.forEach((block) => {
      dummyMatrix.position.set(block.currX, block.currY, block.currZ);
      dummyMatrix.updateMatrix();
      instancedMesh.setMatrixAt(block.id, dummyMatrix.matrix);
      instancedMesh.setColorAt(block.id, block.currentColor);
    });

    instancedMesh.instanceMatrix.needsUpdate = true;
    if (instancedMesh.instanceColor) {
      instancedMesh.instanceColor.setUsage(THREE.DynamicDrawUsage);
      instancedMesh.instanceColor.needsUpdate = true;
    }

    textGroup.add(instancedMesh);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-100, -100);
    let hoveredId: number | null = null;
    let animationFrameId = 0;

    const syncTargetsWithVisibility = () => {
      const shouldAssemble = isAssembledRef.current;

      blocksData.forEach((block) => {
        if (shouldAssemble) {
          block.targetX = block.baseX;
          block.targetY = block.baseY;
          block.targetZ = block.baseZ;
          return;
        }

        block.targetX = block.baseX + (Math.random() - 0.5) * 60;
        block.targetY = block.baseY + (Math.random() - 0.5) * 60 + 40;
        block.targetZ = block.baseZ + (Math.random() - 0.5) * 60;
      });
    };

    const onMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const onMouseLeave = () => {
      hoveredId = null;
      mouse.set(-100, -100);
    };

    const onWindowResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      const aspect = width / Math.max(height, 1);
      const frustumSize = Math.max(20, (totalWidth + 10) / (2 * Math.max(aspect, 0.01)));

      camera.left = -frustumSize * aspect;
      camera.right = frustumSize * aspect;
      camera.top = frustumSize;
      camera.bottom = -frustumSize;
      camera.zoom = currentZoom;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    };

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", onWindowResize);

    onWindowResize();
    syncTargetsWithVisibility();

    let previousAssemblyState = isAssembledRef.current;
    const easeInOutQuint = (value: number) =>
      value < 0.5
        ? 16 * value * value * value * value * value
        : 1 - Math.pow(-2 * value + 2, 5) / 2;

    const animate = () => {
      animationFrameId = window.requestAnimationFrame(animate);

      const assembled = isAssembledRef.current;
      if (assembled !== previousAssemblyState) {
        syncTargetsWithVisibility();
        previousAssemblyState = assembled;
      }

      raycaster.setFromCamera(mouse, camera);
      const intersections = raycaster.intersectObject(instancedMesh);

      if (intersections.length > 0) {
        hoveredId = intersections[0].instanceId ?? null;
      } else {
        hoveredId = null;
      }

      if (!cinematicActiveRef.current && !freeModeUnlockedRef.current) {
        camera.position.lerp(cinematicShots[0].position, 0.08);
        currentZoom = THREE.MathUtils.lerp(currentZoom, cinematicShots[0].zoom, 0.08);
        camera.zoom = currentZoom;
        camera.lookAt(freeModeTarget);
        camera.updateProjectionMatrix();
        controls.enabled = false;
      }

      if (cinematicActiveRef.current) {
        const elapsed = performance.now() - cinematicStartedAtRef.current;
        const normalizedElapsed = Math.min(elapsed, cinematicTotalDuration);
        const segmentIndex = Math.min(
          Math.floor(normalizedElapsed / cinematicSegmentDuration),
          cinematicShots.length - 2
        );
        const segmentElapsed = normalizedElapsed - segmentIndex * cinematicSegmentDuration;
        const segmentProgress = easeInOutQuint(
          Math.min(segmentElapsed / cinematicSegmentDuration, 1)
        );
        const fromShot = cinematicShots[segmentIndex];
        const toShot = cinematicShots[segmentIndex + 1];

        camera.position.lerpVectors(fromShot.position, toShot.position, segmentProgress);
        currentZoom = THREE.MathUtils.lerp(fromShot.zoom, toShot.zoom, segmentProgress);
        camera.zoom = currentZoom;
        camera.lookAt(freeModeTarget);
        camera.updateProjectionMatrix();

        if (elapsed >= cinematicTotalDuration) {
          cinematicActiveRef.current = false;
          freeModeUnlockedRef.current = true;
          controls.enabled = true;
          currentZoom = cinematicShots[cinematicShots.length - 1].zoom;
          camera.zoom = currentZoom;
          camera.position.copy(cinematicShots[cinematicShots.length - 1].position);
          controls.target.copy(freeModeTarget);
          controls.update();
        }
      } else if (freeModeUnlockedRef.current) {
        controls.update();
      }

      let hoveredLetterIndex: number | null = null;
      if (hoveredId !== null) {
        hoveredLetterIndex = blocksData[hoveredId]?.letterIndex ?? null;
      }

      blocksData.forEach((block) => {
        block.currX += (block.targetX - block.currX) * 0.04;
        block.currY += (block.targetY - block.currY) * 0.04;
        block.currZ += (block.targetZ - block.currZ) * 0.04;

        let targetHoverOffset = 0;
        let targetColor = BASE_COLOR;

        if (hoveredLetterIndex !== null && block.letterIndex === hoveredLetterIndex) {
          targetHoverOffset = 0.8;
          targetColor = HOVER_COLOR;
        }

        block.hoverOffset += (targetHoverOffset - block.hoverOffset) * 0.15;
        block.currentColor.lerp(targetColor, 0.15);

        dummyMatrix.position.set(block.currX, block.currY + block.hoverOffset, block.currZ);
        dummyMatrix.updateMatrix();
        instancedMesh.setMatrixAt(block.id, dummyMatrix.matrix);
        instancedMesh.setColorAt(block.id, block.currentColor);
      });

      instancedMesh.instanceMatrix.needsUpdate = true;
      if (instancedMesh.instanceColor) {
        instancedMesh.instanceColor.needsUpdate = true;
      }
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("resize", onWindowResize);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseLeave);
      window.cancelAnimationFrame(animationFrameId);
      controls.dispose();
      renderer.dispose();
      geometry.dispose();
      material.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [variant]);

  return (
    <div
      ref={sectionRef}
      className={cn(
        "relative h-full w-full overflow-visible",
        variant === "full-bleed"
          ? "left-1/2 mb-14 w-screen -translate-x-1/2 bg-[#050505]"
          : "bg-transparent",
        className
      )}
      aria-label="JOHN LESTER 3D voxel signature"
    >
      <div ref={mountRef} className="absolute inset-0 cursor-crosshair" />
    </div>
  );
}
