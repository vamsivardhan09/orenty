'use client';

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { SVGLoader } from 'three-stdlib';

// Custom Volumetric Light Beam Vertex Shader
const beamVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float uTime;
  uniform vec2 uCursor;

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Gentle ease toward cursor
    float sway = sin(pos.y * 1.5 + uTime * 1.0) * 0.06;
    pos.x += sway + uCursor.x * (1.0 - abs(pos.y) * 0.3) * 0.25;
    pos.z += uCursor.y * (1.0 - abs(pos.y) * 0.3) * 0.15;

    vPosition = pos;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

// Custom Volumetric Light Beam Fragment Shader (Seamless 0-alpha at all 4 edges)
const beamFragmentShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float uTime;
  uniform vec3 uColorCore;
  uniform vec3 uColorGlow;

  void main() {
    // Horizontal distance from center (0.5 is beam axis)
    float dist = abs(vUv.x - 0.5) * 2.0;

    // Core beam falloff
    float core = exp(-dist * 14.0);

    // Volumetric glow falloff
    float shroud = exp(-dist * 3.5) * 0.5;

    // CRITICAL: Guaranteed fade to zero alpha at all 4 quad edges
    float fadeX = smoothstep(0.0, 0.4, vUv.x) * smoothstep(1.0, 0.6, vUv.x);
    float fadeY = smoothstep(0.0, 0.25, vUv.y) * smoothstep(1.0, 0.75, vUv.y);
    float edgeMask = fadeX * fadeY;

    // Harmonic shimmer wave
    float shimmer = 1.0 + sin(vUv.y * 18.0 - uTime * 2.5) * 0.06;

    float alpha = (core * 0.95 + shroud) * edgeMask * shimmer;

    // Gradient from core white to radiant violet/indigo
    vec3 color = mix(uColorGlow, uColorCore, core);

    gl_FragColor = vec4(color, alpha * 0.85);
  }
`;

// Round Stars Custom Shaders
const starVertexShader = `
  attribute float aSize;
  attribute vec3 aColor;
  varying vec3 vColor;
  varying float vTwinkle;
  uniform float uTime;
  uniform vec2 uCursor;

  void main() {
    vColor = aColor;
    vec3 pos = position;

    // Cursor interaction
    pos.x += uCursor.x * 0.15 * (1.0 - abs(pos.y) * 0.2);
    pos.y += uCursor.y * 0.15 * (1.0 - abs(pos.x) * 0.2);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Twinkle factor
    float twinkle = sin(uTime * 2.0 + pos.x * 10.0 + pos.y * 5.0) * 0.4 + 0.6;
    vTwinkle = twinkle;

    // Size attenuation (scale with distance to camera)
    gl_PointSize = aSize * (150.0 / -mvPosition.z) * twinkle;
  }
`;

const starFragmentShader = `
  varying vec3 vColor;
  varying float vTwinkle;

  void main() {
    // Distance from center of point (0 to 0.5)
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;

    // Round soft circular falloff - NO squares
    float alpha = smoothstep(0.5, 0.05, dist) * vTwinkle;

    gl_FragColor = vec4(vColor, alpha * 0.85);
  }
`;

// Starfield Points Component with 100% Round Particles
function Starfield({ count = 2500, mouse }: { count?: number; mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const [positions, colors, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const sz = new Float32Array(count);

    const color1 = new THREE.Color('#ffffff');
    const color2 = new THREE.Color('#c4b5fd'); // pale violet
    const color3 = new THREE.Color('#818cf8'); // soft indigo

    for (let i = 0; i < count; i++) {
      const radius = 2.0 + Math.random() * 9.5;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 18;

      pos[i * 3] = Math.cos(theta) * radius;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;

      const c = Math.random();
      const mixed = c > 0.6 ? color1 : c > 0.3 ? color2 : color3;
      col[i * 3] = mixed.r;
      col[i * 3 + 1] = mixed.g;
      col[i * 3 + 2] = mixed.b;

      // Varied star size (0.5 to 2.2)
      sz[i] = 0.5 + Math.random() * 1.7;
    }

    return [pos, col, sz];
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uCursor: { value: new THREE.Vector2(0, 0) },
    }),
    []
  );

  useFrame((state, delta) => {
    if (!materialRef.current || !pointsRef.current) return;
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;

    const cur = materialRef.current.uniforms.uCursor.value;
    cur.x += (mouse.current.x - cur.x) * 0.05;
    cur.y += (mouse.current.y - cur.y) * 0.05;

    pointsRef.current.rotation.y += delta * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aColor" args={[colors, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={starVertexShader}
        fragmentShader={starFragmentShader}
        uniforms={uniforms}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Volumetric Central Light Beam
function VolumetricBeam({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uCursor: { value: new THREE.Vector2(0, 0) },
      uColorCore: { value: new THREE.Color('#ffffff') },
      uColorGlow: { value: new THREE.Color('#7c3aed') }, // Violet glow
    }),
    []
  );

  useFrame((state) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;

    const cur = materialRef.current.uniforms.uCursor.value;
    cur.x += (mouse.current.x - cur.x) * 0.04;
    cur.y += (mouse.current.y - cur.y) * 0.04;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -1]}>
      <planeGeometry args={[5.5, 16, 32, 64]} />
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

// Extruded 3D Floating Logo Mark positioned at the base of the beam
function ExtrudedLogoMark({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const groupRef = useRef<THREE.Group>(null);
  const [geometry, setGeometry] = useState<THREE.ExtrudeGeometry | null>(null);

  useEffect(() => {
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
            bevelSize: 2.2,
            bevelThickness: 2.2,
          });

          extrudeGeom.center();
          extrudeGeom.scale(0.0095, -0.0095, 0.0095);
          setGeometry(extrudeGeom);
        }
      }
    } catch (e) {
      console.warn("SVG Extrusion fallback:", e);
    }

    return () => {
      if (geometry) geometry.dispose();
    };
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;

    // Floating idle bobbing motion at the base of the beam
    const idleY = -2.8 + Math.sin(time * 1.5) * 0.1;
    const idleRotZ = Math.sin(time * 0.9) * 0.04;

    // Cursor tracking tilt
    const targetRotX = mouse.current.y * 0.4;
    const targetRotY = mouse.current.x * 0.5;

    groupRef.current.position.y = idleY;
    groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.08;
    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.08;
    groupRef.current.rotation.z = idleRotZ;
  });

  if (!geometry) return null;

  return (
    // Base position: y = -2.8, completely clear of the headline text above
    <group ref={groupRef} position={[0, -2.8, 0.3]}>
      {/* 3D Glass/Crystal Logo Object with Bright Rim & Emissive Core */}
      <mesh geometry={geometry}>
        <meshPhysicalMaterial
          color="#ffffff"
          emissive="#8b5cf6"
          emissiveIntensity={0.65}
          roughness={0.08}
          metalness={0.15}
          transmission={0.92}
          ior={1.52}
          thickness={1.5}
          reflectivity={0.9}
          transparent
          opacity={0.98}
        />
      </mesh>

      {/* Bright rim light and local radiant illumination */}
      <pointLight color="#c4b5fd" intensity={3.5} distance={4} decay={2} />
      <pointLight position={[0, -0.5, 0.5]} color="#a855f7" intensity={2.0} distance={2} />
    </group>
  );
}

// Scene Root with Scroll-linked Camera
export default function HeroScene() {
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
    // Scroll progress interpolation: camera descends down toward the 3D mark
    const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    const scrollTargetY = -Math.min(1.0, scrollY / 600) * 2.6;

    // Parallax mouse offset + scroll translation
    const targetCamX = mouse.current.x * 0.2;
    const targetCamY = scrollTargetY + mouse.current.y * 0.12;

    camera.position.x += (targetCamX - camera.position.x) * 0.05;
    camera.position.y += (targetCamY - camera.position.y) * 0.06;
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 6, 4]} intensity={2.0} color="#ffffff" />
      <pointLight position={[-4, 3, 2]} intensity={2.2} color="#8b5cf6" />
      <pointLight position={[4, -2, -1]} intensity={1.5} color="#06b6d4" />

      {/* Volumetric Beam & Celestial Round Starfield */}
      <VolumetricBeam mouse={mouse} />
      <Starfield count={2500} mouse={mouse} />

      {/* Extruded 3D Logo Mark floating at base of beam */}
      <ExtrudedLogoMark mouse={mouse} />
    </>
  );
}
