'use client';

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { SVGLoader } from 'three-stdlib';

export interface ScrollState {
  progress: number;
  velocity: number;
  y: number;
}

// Custom Volumetric Light Beam Vertex Shader with dynamic scroll bend
const beamVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float uTime;
  uniform vec2 uCursor;
  uniform float uScroll;
  uniform float uScrollVelocity;

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Gentle ease toward cursor
    float sway = sin(pos.y * 2.0 + uTime * 1.2) * 0.08;
    
    // Dynamic scroll bend: as the user scrolls, the beam leans and develops an organic curvature
    float scrollBend = sin(pos.y * 1.4 + uScroll * 2.2) * (min(uScroll, 2.5) * 0.28);
    
    pos.x += sway + uCursor.x * (1.0 - abs(pos.y) * 0.4) * 0.35 + scrollBend;
    pos.z += uCursor.y * (1.0 - abs(pos.y) * 0.4) * 0.2 + abs(uScrollVelocity) * 0.04;

    vPosition = pos;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

// Custom Volumetric Light Beam Fragment Shader with velocity shimmer
const beamFragmentShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float uTime;
  uniform float uScroll;
  uniform float uScrollVelocity;
  uniform vec3 uColorCore;
  uniform vec3 uColorGlow;

  void main() {
    // Horizontal distance from center (0.5 is beam spine)
    float dist = abs(vUv.x - 0.5) * 2.0;

    // Razor-sharp central core falloff
    float core = exp(-dist * 12.0);

    // Wide volumetric ambient shroud
    float shroud = exp(-dist * 2.8) * 0.45;

    // Vertical gradient (fade at top and bottom to blend with deep space)
    float verticalFade = smoothstep(0.0, 0.2, vUv.y) * smoothstep(1.0, 0.75, vUv.y);

    // Harmonic shimmer wave responsive to scroll
    float shimmer = 1.0 + sin(vUv.y * 16.0 - uTime * 3.0 + uScroll * 3.5) * 0.09;

    float alpha = (core * 0.9 + shroud) * verticalFade * shimmer;

    // Color gradient from core white to radiant violet/indigo
    vec3 color = mix(uColorGlow, uColorCore, core);

    gl_FragColor = vec4(color, alpha * 0.85);
  }
`;

// Starfield Points Component responsive to scroll with smooth decay & reduced motion support
function Starfield({
  count = 2500,
  mouse,
  scrollRef,
}: {
  count?: number;
  mouse: React.MutableRefObject<{ x: number; y: number }>;
  scrollRef?: React.MutableRefObject<ScrollState>;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const boostRef = useRef(0);
  const BASE_SPEED = 0.005; // very slow base rotation
  const MAX_BOOST = BASE_SPEED * 2.0; // clamped so total speed <= ~3x base

  const [positions, colors, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const sc = new Float32Array(count);

    const color1 = new THREE.Color('#ffffff');
    const color2 = new THREE.Color('#c4b5fd'); // pale violet
    const color3 = new THREE.Color('#818cf8'); // soft indigo

    for (let i = 0; i < count; i++) {
      // Cylinder distribution along beam axis
      const radius = 2.0 + Math.random() * 9.0;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 16;

      pos[i * 3] = Math.cos(theta) * radius;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;

      // Color variation
      const c = Math.random();
      const mixed = c > 0.6 ? color1 : c > 0.3 ? color2 : color3;
      col[i * 3] = mixed.r;
      col[i * 3 + 1] = mixed.g;
      col[i * 3 + 2] = mixed.b;

      sc[i] = 1.0 + Math.random() * 2.5;
    }

    return [pos, col, sc];
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    // Respect prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const geom = pointsRef.current.geometry;
    const posAttr = geom.attributes.position;
    const positionsArr = posAttr.array as Float32Array;

    const s = scrollRef?.current?.progress || 0;
    const v = scrollRef?.current?.velocity || 0;

    // Slow drifting and gentle cursor reaction
    const targetX = mouse.current.x * 0.25;
    const targetY = mouse.current.y * 0.25;

    // Starfield streams upward as user scrolls downward into deep space
    const targetPosY = s * 2.2;
    pointsRef.current.position.y += (targetPosY - pointsRef.current.position.y) * 0.05;
    pointsRef.current.position.x += (targetX - pointsRef.current.position.x) * 0.05;

    // Add scroll velocity as a boost, smoothed (lerp/damping), clamped to low max (~3x base), decaying back to base within ~1s after scrolling stops
    const targetBoost = Math.min(Math.abs(v) * 0.0025, MAX_BOOST);
    if (targetBoost > boostRef.current) {
      // Rapid response to scroll onset
      boostRef.current += (targetBoost - boostRef.current) * Math.min(delta * 5.0, 1.0);
    } else {
      // Decays smoothly back to 0 within ~1s (decay constant ~2.8)
      boostRef.current += (0 - boostRef.current) * Math.min(delta * 2.8, 1.0);
    }

    const currentRotationSpeed = BASE_SPEED + boostRef.current;
    pointsRef.current.rotation.y += currentRotationSpeed * (delta * 60);

    // Twinkle and subtle drift
    for (let i = 0; i < count; i += 5) {
      positionsArr[i * 3 + 1] += Math.sin(state.clock.elapsedTime + i) * 0.002;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Volumetric Central Light Beam that bends and sweeps with scroll
function VolumetricBeam({
  mouse,
  scrollRef,
}: {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
  scrollRef?: React.MutableRefObject<ScrollState>;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uCursor: { value: new THREE.Vector2(0, 0) },
      uScroll: { value: 0 },
      uScrollVelocity: { value: 0 },
      uColorCore: { value: new THREE.Color('#ffffff') },
      uColorGlow: { value: new THREE.Color('#7c3aed') }, // Violet/Indigo glow
    }),
    []
  );

  useFrame((state) => {
    if (!materialRef.current || !meshRef.current) return;
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;

    const s = scrollRef?.current?.progress || 0;
    const v = scrollRef?.current?.velocity || 0;

    // Update uniforms for dynamic shader bending
    materialRef.current.uniforms.uScroll.value = s;
    materialRef.current.uniforms.uScrollVelocity.value = v;

    // Ease toward cursor
    const cur = materialRef.current.uniforms.uCursor.value;
    cur.x += (mouse.current.x - cur.x) * 0.04;
    cur.y += (mouse.current.y - cur.y) * 0.04;

    // Physical beam movement and tilt:
    // As user scrolls down, beam leans slightly to the left (-X) and tilts diagonally (-Z)
    const targetX = -Math.min(s * 0.85, 2.0);
    const targetY = -s * 1.35;
    const targetRotZ = -Math.min(s * 0.15, 0.32);

    meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.06;
    meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.06;
    meshRef.current.rotation.z += (targetRotZ - meshRef.current.rotation.z) * 0.06;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -1]}>
      <planeGeometry args={[4.5, 14, 32, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={beamVertexShader}
        fragmentShader={beamFragmentShader}
        uniforms={uniforms}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Extruded 3D Floating Logo Mark positioned beside the beam, NEVER behind the headline text
function ExtrudedLogoMark({
  mouse,
  scrollRef,
}: {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
  scrollRef?: React.MutableRefObject<ScrollState>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [geometry, setGeometry] = useState<THREE.ExtrudeGeometry | null>(null);

  useEffect(() => {
    // Parse SVG mark and create clean 3D extruded geometry
    const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="170" viewBox="0 0 200 170"><path fill="#fff" fill-rule="evenodd" d="M37.773 11.555C25.103 14.626 15.454 21.773 10.845 31.5l-2.843 6-.001 51.281c-.001 58.645-.362 56.47 7.895 47.597 5.023-5.398 60.824-65.933 92.354-100.19C119.112 24.387 128 14.373 128 13.937c0-.437-.707-1.501-1.571-2.366-1.38-1.379-6.53-1.561-42.25-1.488-31.053.064-42.034.412-46.406 1.472m100.977-.475c-3.47 2.021-2.18 6.611 3.583 12.744 2.933 3.122 14.252 15.801 25.154 28.176s20.461 22.652 21.242 22.838 2.286-.447 3.345-1.405c1.799-1.628 1.925-3.301 1.904-25.338-.019-20.799-.241-24.069-1.868-27.595-2.136-4.628-5.422-7.917-9.425-9.433-3.653-1.384-41.556-1.373-43.935.013m-1.436 81.61c-6.497 5.33-23.289 19.589-37.314 31.688a48014 48014 0 0 1-34.75 29.954c-14.774 12.708-18.154 11.787 42 11.453l51.25-.285 7.82-3.734c10.227-4.883 19.531-13.689 23.959-22.676l3.221-6.536.31-19.926c.332-21.417-.121-24.154-4.58-27.662-2.284-1.796-4.122-1.966-21.3-1.966h-18.801z"/></svg>`;

    try {
      const loader = new SVGLoader();
      const svgData = loader.parse(svgString);

      if (svgData.paths.length > 0) {
        const shapes = SVGLoader.createShapes(svgData.paths[0]);
        if (shapes.length > 0) {
          const extrudeGeom = new THREE.ExtrudeGeometry(shapes, {
            depth: 14,
            bevelEnabled: true,
            bevelSegments: 4,
            steps: 2,
            bevelSize: 2.5,
            bevelThickness: 2.5,
          });

          // Center geometry
          extrudeGeom.center();
          // Scale to appropriate 3D unit coordinates
          extrudeGeom.scale(0.0085, -0.0085, 0.0085);
          setGeometry(extrudeGeom);
        }
      }
    } catch (e) {
      console.warn('SVG Extrusion fallback:', e);
    }

    return () => {
      if (geometry) geometry.dispose();
    };
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;
    const s = scrollRef?.current?.progress || 0;

    // Floating idle bobbing motion
    const idleY = Math.sin(time * 1.5) * 0.08;
    const idleRotZ = Math.sin(time * 0.8) * 0.04;

    // Cursor tracking tilt
    const targetRotX = mouse.current.y * 0.45;
    const targetRotY = mouse.current.x * 0.55 + s * 0.35;

    // Position floating strictly beside the beam, NEVER behind the headline text:
    // Desktop: positioned at x = 3.35 (well to the right of the max-w-3xl text area)
    // Mobile: positioned high beside the beam (x = 1.6, y = 2.45) clear of the headline
    const isSmallScreen = typeof window !== 'undefined' && window.innerWidth < 768;
    const baseX = isSmallScreen ? 1.55 : 3.35;
    const baseY = isSmallScreen ? 2.45 : 0.2;

    const targetX = baseX + (isSmallScreen ? 0 : s * 0.25);
    const targetY = baseY + idleY - s * 2.1;
    const targetZ = 0.2 - s * 0.4;

    groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.06;
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.06;
    groupRef.current.position.z += (targetZ - groupRef.current.position.z) * 0.06;

    groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.08;
    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.08;
    groupRef.current.rotation.z = idleRotZ - s * 0.12;
  });

  if (!geometry) return null;

  return (
    <group ref={groupRef} position={[3.35, 0.2, 0.2]}>
      {/* 3D Glass/Crystal Logo Object */}
      <mesh geometry={geometry}>
        <meshPhysicalMaterial
          color="#f5f3ff"
          emissive="#7c3aed"
          emissiveIntensity={0.35}
          roughness={0.12}
          metalness={0.1}
          transmission={0.88}
          ior={1.48}
          thickness={1.2}
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* Radiant inner accent core light */}
      <pointLight color="#a78bfa" intensity={1.2} distance={3.0} decay={2} />
    </group>
  );
}

// Scene Root with Camera and Lights, reacting to mouse & scroll
export default function HeroScene({
  scrollRef,
}: {
  scrollRef?: React.MutableRefObject<ScrollState>;
}) {
  const mouse = useRef({ x: 0, y: 0 });
  const { camera } = useThree();

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  useFrame(() => {
    const s = scrollRef?.current?.progress || 0;

    // Camera 3D Dolly and Parallax Shift:
    const targetCamX = mouse.current.x * 0.2;
    const targetCamY = mouse.current.y * 0.15 - s * 1.05;
    const targetCamZ = 5.0 + Math.min(s * 1.1, 2.2);
    const targetRotX = mouse.current.y * 0.05 - Math.min(s * 0.09, 0.18);

    camera.position.x += (targetCamX - camera.position.x) * 0.04;
    camera.position.y += (targetCamY - camera.position.y) * 0.04;
    camera.position.z += (targetCamZ - camera.position.z) * 0.04;
    camera.rotation.x += (targetRotX - camera.rotation.x) * 0.04;
  });

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 6, 5]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-3, -2, 2]} intensity={1.8} color="#8b5cf6" />
      <pointLight position={[3, 2, -2]} intensity={1.2} color="#06b6d4" />

      {/* 3D Volumetric Scene Elements */}
      <VolumetricBeam mouse={mouse} scrollRef={scrollRef} />
      <Starfield count={2500} mouse={mouse} scrollRef={scrollRef} />
      <ExtrudedLogoMark mouse={mouse} scrollRef={scrollRef} />
    </>
  );
}
