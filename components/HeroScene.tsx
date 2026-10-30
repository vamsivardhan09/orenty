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
    float sway = sin(pos.y * 2.0 + uTime * 1.2) * 0.08;
    pos.x += sway + uCursor.x * (1.0 - abs(pos.y) * 0.4) * 0.35;
    pos.z += uCursor.y * (1.0 - abs(pos.y) * 0.4) * 0.2;

    vPosition = pos;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

// Custom Volumetric Light Beam Fragment Shader
const beamFragmentShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float uTime;
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

    // Harmonic shimmer wave
    float shimmer = 1.0 + sin(vUv.y * 16.0 - uTime * 3.0) * 0.08;

    float alpha = (core * 0.9 + shroud) * verticalFade * shimmer;

    // Color gradient from core white to radiant violet/indigo
    vec3 color = mix(uColorGlow, uColorCore, core);

    gl_FragColor = vec4(color, alpha * 0.85);
  }
`;

// Starfield Points Component
function Starfield({ count = 3000, mouse }: { count?: number; mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const pointsRef = useRef<THREE.Points>(null);

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
    const geom = pointsRef.current.geometry;
    const posAttr = geom.attributes.position;
    const positionsArr = posAttr.array as Float32Array;

    // Slow drifting and gentle cursor reaction
    const targetX = mouse.current.x * 0.25;
    const targetY = mouse.current.y * 0.25;

    pointsRef.current.rotation.y += delta * 0.03;
    pointsRef.current.position.x += (targetX - pointsRef.current.position.x) * 0.05;
    pointsRef.current.position.y += (-targetY - pointsRef.current.position.y) * 0.05;

    // Twinkle and subtle drift
    for (let i = 0; i < count; i += 5) {
      positionsArr[i * 3 + 1] += Math.sin(state.clock.elapsedTime + i) * 0.002;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
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

// Volumetric Central Light Beam
function VolumetricBeam({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uCursor: { value: new THREE.Vector2(0, 0) },
      uColorCore: { value: new THREE.Color('#ffffff') },
      uColorGlow: { value: new THREE.Color('#7c3aed') }, // Violet/Indigo glow
    }),
    []
  );

  useFrame((state) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;

    // Ease toward cursor
    const cur = materialRef.current.uniforms.uCursor.value;
    cur.x += (mouse.current.x - cur.x) * 0.04;
    cur.y += (mouse.current.y - cur.y) * 0.04;
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

// Extruded 3D Floating Logo Mark
function ExtrudedLogoMark({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
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
          extrudeGeom.scale(0.009, -0.009, 0.009); // Invert Y because SVG coordinate system is upside down
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

    // Floating idle bobbing motion
    const idleY = Math.sin(time * 1.5) * 0.08;
    const idleRotZ = Math.sin(time * 0.8) * 0.04;

    // Cursor tracking tilt
    const targetRotX = mouse.current.y * 0.45;
    const targetRotY = mouse.current.x * 0.55;

    // Position floating near the beam to the side so headline text remains 100% crisp & unobstructed
    const isSmallScreen = typeof window !== 'undefined' && window.innerWidth < 768;
    const baseX = isSmallScreen ? 0 : 2.1;
    const baseY = isSmallScreen ? 1.7 : 0.2;

    groupRef.current.position.x = baseX;
    groupRef.current.position.y = baseY + idleY;
    groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.08;
    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.08;
    groupRef.current.rotation.z = idleRotZ;
  });

  if (!geometry) return null;

  return (
    <group ref={groupRef} position={[2.1, 0.2, 0.2]}>
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

      {/* Radiant inner accent core light with gentle balanced intensity */}
      <pointLight color="#a78bfa" intensity={1.2} distance={3.0} decay={2} />
    </group>
  );
}

// Scene Root with Camera and Lights
export default function HeroScene() {
  const mouse = useRef({ x: 0, y: 0 });
  const { camera } = useThree();

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      // Normalize mouse -1 to +1
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  useFrame(() => {
    // Subtle camera parallax shift
    camera.position.x += (mouse.current.x * 0.2 - camera.position.x) * 0.04;
    camera.position.y += (mouse.current.y * 0.15 - camera.position.y) * 0.04;
  });

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 6, 5]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-3, -2, 2]} intensity={1.8} color="#8b5cf6" />
      <pointLight position={[3, 2, -2]} intensity={1.2} color="#06b6d4" />

      {/* 3D Volumetric Scene Elements */}
      <VolumetricBeam mouse={mouse} />
      <Starfield count={2500} mouse={mouse} />
      <ExtrudedLogoMark mouse={mouse} />
    </>
  );
}
