"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import * as THREE from "three";

export default function InteractiveParticles() {
  const pointsRef = useRef<any>(null);
  const scrollProgress = useScrollProgress();
  
  // Keep track of the current smoothed animation progress
  const currentProgress = useRef(0);
  
  const count = 3000;
  
  // Set A: Chaotic Spherical Distribution
  const chaosPositions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * 6.5; // Sphere radius
      
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  // Set B: Rigid 3D Grid Distribution (20 x 15 x 10 = 3000 points)
  const gridPositions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    const nx = 20;
    const ny = 15;
    const nz = 10;
    
    const gridWidth = 9.0;
    const gridHeight = 6.0;
    const gridDepth = 3.5;
    
    for (let i = 0; i < count; i++) {
      const ix = i % nx;
      const iy = Math.floor(i / nx) % ny;
      const iz = Math.floor(i / (nx * ny));
      
      // Center the grid around origin (0, 0, 0)
      const x = (ix / (nx - 1) - 0.5) * gridWidth;
      const y = (iy / (ny - 1) - 0.5) * gridHeight;
      const z = (iz / (nz - 1) - 0.5) * gridDepth;
      
      arr[i * 3] = x;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = z;
    }
    return arr;
  }, []);

  // Mutable array used to update positions in the GPU buffer
  const tempPositions = useMemo(() => new Float32Array(count * 3), []);

  useFrame(() => {
    if (!pointsRef.current) return;
    
    const geometry = pointsRef.current.geometry;
    const positionAttr = geometry.attributes.position;
    
    let needsBufferUpdate = false;
    const diff = Math.abs(currentProgress.current - scrollProgress);
    
    if (diff > 0.0001) {
      currentProgress.current = THREE.MathUtils.lerp(
        currentProgress.current,
        scrollProgress,
        0.07 // Lerp weight: smaller = smoother/slower, larger = faster response
      );
      needsBufferUpdate = true;
    } else if (currentProgress.current !== scrollProgress) {
      currentProgress.current = scrollProgress;
      needsBufferUpdate = true;
    }
    
    const t = currentProgress.current;
    
    if (needsBufferUpdate) {
      // Easing function for the transition: cubic ease-in-out
      const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      const array = positionAttr.array as Float32Array;
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        
        // Interpolate positions between Set A (Chaos) and Set B (Grid)
        array[i3] = chaosPositions[i3] * (1 - ease) + gridPositions[i3] * ease;
        array[i3 + 1] = chaosPositions[i3 + 1] * (1 - ease) + gridPositions[i3 + 1] * ease;
        array[i3 + 2] = chaosPositions[i3 + 2] * (1 - ease) + gridPositions[i3 + 2] * ease;
      }
      
      // Tell Three.js to re-upload positions buffer to the GPU
      positionAttr.needsUpdate = true;
    }
    
    // Slowly rotate the point cloud
    // The rotation slows down by 80-90% as the particles order themselves
    const rotationSpeedY = 0.002 * (1.0 - t * 0.8) + 0.0003;
    const rotationSpeedX = 0.0008 * (1.0 - t * 0.9) + 0.0001;
    
    pointsRef.current.rotation.y += rotationSpeedY;
    pointsRef.current.rotation.x += rotationSpeedX;
  });

  return (
    <Points ref={pointsRef} positions={chaosPositions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#27C2F5"
        size={0.075}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  );
}
