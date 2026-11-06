'use client';

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { SVGLoader } from 'three-stdlib';

export interface ScrollState {
  progress: number; // 0 to 1 across the page
  velocity: number;
  y: number;
}

// 5.1 Circular Star Shader
const starVertexShader = `
  attribute float aScale;
  attribute float aPhase;
  attribute vec3 aColor;
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uSize;
  varying float vTw;
  varying vec3 vColor;

  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    float s = uSize * aScale * uPixelRatio * (300.0 / -mv.z);
    gl_PointSize = max(s, 2.0 * uPixelRatio);
    vTw = 0.75 + 0.25 * sin(uTime * (0.6 + aScale) + aPhase);
    vColor = aColor;
  }
`;

const starFragmentShader = `
  varying float vTw;
  varying vec3 vColor;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float core = 1.0 - smoothstep(0.0, 0.5, d);
    float a = (core * 0.35 + pow(core, 3.0)) * vTw;
    if (a < 0.01) discard;
    gl_FragColor = vec4(vColor, a);
  }
`;

// Volumetric Light Beam
const beamVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float uTime;
  uniform vec2 uCursor;

  void main() {
    vUv = uv;
    vec3 pos = position;
    float sway = sin(pos.y * 1.5 + uTime * 0.8) * 0.04;
    pos.x += sway + uCursor.x * (1.0 - abs(pos.y) * 0.35) * 0.2;
    vPosition = pos;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const beamFragmentShader = `
  varying vec2 vUv;
  uniform float uTime;
  uniform vec3 uColorCore;
  uniform vec3 uColorGlow;
  uniform float uOpacity;

  void main() {
    float dist = abs(vUv.x - 0.5) * 2.0;
    float core = exp(-dist * 14.0);
    float shroud = exp(-dist * 3.2) * 0.35;
    float verticalFade = smoothstep(0.0, 0.25, vUv.y) * smoothstep(1.0, 0.75, vUv.y);
    float shimmer = 1.0 + sin(vUv.y * 12.0 - uTime * 2.0) * 0.06;
    float alpha = (core * 0.85 + shroud) * verticalFade * shimmer * uOpacity;
    vec3 color = mix(uColorGlow, uColorCore, core);
    gl_FragColor = vec4(color, alpha);
  }
`;

// Helper to create star layer buffer geometry
function createStarLayerGeometry(count: number, zRange: [number, number], radiusRange: [number, number]) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const scales = new Float32Array(count);
  const phases = new Float32Array(count);

  const white = new THREE.Color('#ffffff');
  const coolBlue = new THREE.Color('#dbeafe'); // cool blue-white
  const faintViolet = new THREE.Color('#c4b5fd'); // faint violet

  for (let i = 0; i < count; i++) {
    const radius = radiusRange[0] + Math.random() * (radiusRange[1] - radiusRange[0]);
    const theta = Math.random() * Math.PI * 2;
    const y = (Math.random() - 0.5) * 22;
    const z = zRange[0] + Math.random() * (zRange[1] - zRange[0]);

    positions[i * 3] = Math.cos(theta) * radius;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    // Mostly white, some cool blue-white, a few faint violet
    const r = Math.random();
    const col = r > 0.4 ? white : r > 0.15 ? coolBlue : faintViolet;
    colors[i * 3] = col.r;
    colors[i * 3 + 1] = col.g;
    colors[i * 3 + 2] = col.b;

    scales[i] = 0.8 + Math.random() * 1.5;
    phases[i] = Math.random() * Math.PI * 2;
  }

  const geom = new THREE.BufferGeometry();
  geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geom.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
  geom.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
  geom.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1));
  return geom;
}

// 5.2 Decoupled Starfield System (3 Depth Layers)
function DecoupledStarfield({
  scrollRef,
  isMobile,
}: {
  scrollRef?: React.MutableRefObject<ScrollState>;
  isMobile: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const farRef = useRef<THREE.Points>(null);
  const midRef = useRef<THREE.Points>(null);
  const nearRef = useRef<THREE.Points>(null);

  const IDLE_SPEED = 0.0024; // rad/sec (≈ 0.14°/s)
  const MAX_SCROLL_ROT = 0.35; // rad over the entire page (~20°)
  const SMOOTH = 0.04; // lerp factor per frame

  const idleRef = useRef(0);
  const scrollRotRef = useRef(0);

  // Particle counts: desktop ~1820 total; mobile ~700 total
  const counts = useMemo(
    () =>
      isMobile
        ? { far: 450, mid: 200, near: 50 }
        : { far: 1200, mid: 500, near: 120 },
    [isMobile]
  );

  const farGeom = useMemo(
    () => createStarLayerGeometry(counts.far, [-18, -10], [3, 14]),
    [counts.far]
  );
  const midGeom = useMemo(
    () => createStarLayerGeometry(counts.mid, [-10, -4], [2.5, 11]),
    [counts.mid]
  );
  const nearGeom = useMemo(
    () => createStarLayerGeometry(counts.near, [-4, 1], [2, 8]),
    [counts.near]
  );

  const materials = useMemo(() => {
    const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2) : 1;
    return {
      far: new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uPixelRatio: { value: dpr },
          uSize: { value: 0.14 },
        },
        vertexShader: starVertexShader,
        fragmentShader: starFragmentShader,
      }),
      mid: new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uPixelRatio: { value: dpr },
          uSize: { value: 0.22 },
        },
        vertexShader: starVertexShader,
        fragmentShader: starFragmentShader,
      }),
      near: new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uPixelRatio: { value: dpr },
          uSize: { value: 0.35 },
        },
        vertexShader: starVertexShader,
        fragmentShader: starFragmentShader,
      }),
    };
  }, [isMobile]);

  useFrame((_, delta) => {
    // prefers-reduced-motion check
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const dt = Math.min(delta, 0.1);
    idleRef.current += IDLE_SPEED * dt;

    const scrollProgress = scrollRef?.current?.progress || 0;
    const target = Math.min(Math.max(scrollProgress, 0), 1) * MAX_SCROLL_ROT;
    scrollRotRef.current += (target - scrollRotRef.current) * SMOOTH;

    const baseRot = idleRef.current + scrollRotRef.current;

    if (farRef.current) {
      farRef.current.rotation.y = baseRot * 0.4;
      materials.far.uniforms.uTime.value += dt;
    }
    if (midRef.current) {
      midRef.current.rotation.y = baseRot * 0.7;
      materials.mid.uniforms.uTime.value += dt;
    }
    if (nearRef.current) {
      nearRef.current.rotation.y = baseRot * 1.0;
      materials.near.uniforms.uTime.value += dt;
    }
  });

  return (
    <group ref={groupRef}>
      <points ref={farRef} geometry={farGeom} material={materials.far} />
      <points ref={midRef} geometry={midGeom} material={materials.mid} />
      <points ref={nearRef} geometry={nearGeom} material={materials.near} />
    </group>
  );
}

// 7. Hero Focal 3D Object: Logo Mark (Extruded, MeshStandardMaterial, metalness ~0.9, roughness ~0.25)
function HeroLogoMark({
  mouse,
  isMobile,
}: {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
  isMobile: boolean;
}) {
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
            depth: 10,
            bevelEnabled: true,
            bevelSegments: 3,
            steps: 1,
            bevelSize: 1.8,
            bevelThickness: 1.8,
          });

          extrudeGeom.center();
          extrudeGeom.scale(0.009, -0.009, 0.009);
          setGeometry(extrudeGeom);
        }
      }
    } catch (e) {
      console.warn('SVG extrusion error:', e);
    }

    return () => {
      if (geometry) geometry.dispose();
    };
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;

    // Slow float
    const floatY = Math.sin(time * 1.2) * 0.06;
    const floatRotZ = Math.sin(time * 0.7) * 0.025;

    // Max 6° (0.10 rad) mouse parallax on desktop; slow idle only on mobile
    const maxParallax = 0.105;
    const targetRotX = isMobile ? 0 : -mouse.current.y * maxParallax;
    const targetRotY = isMobile ? Math.sin(time * 0.5) * 0.08 : mouse.current.x * maxParallax;

    groupRef.current.position.y = (isMobile ? 1.6 : 0.0) + floatY;
    groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.06;
    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.06;
    groupRef.current.rotation.z = floatRotZ;
  });

  if (!geometry) return null;

  return (
    // Desktop: object sits on the right [2.4, 0, 0.2]; mobile: sits above headline [0, 1.6, -0.2]
    <group ref={groupRef} position={isMobile ? [0, 1.6, -0.2] : [2.5, 0, 0.2]}>
      <mesh geometry={geometry}>
        <meshStandardMaterial
          color="#f4f4fa"
          metalness={0.88}
          roughness={0.24}
          emissive="#7C5CFF"
          emissiveIntensity={0.25}
        />
      </mesh>
      {/* Violet rim light from the beam */}
      <pointLight color="#A78BFA" intensity={1.5} distance={3.5} decay={2} position={[-1.2, 0.5, 1]} />
    </group>
  );
}

// Volumetric Central Light Beam
function TunedLightBeam({
  mouse,
}: {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uCursor: { value: new THREE.Vector2(0, 0) },
      uColorCore: { value: new THREE.Color('#ffffff') },
      uColorGlow: { value: new THREE.Color('#7C5CFF') },
      uOpacity: { value: 0.65 },
    }),
    []
  );

  useFrame((state) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    const cur = materialRef.current.uniforms.uCursor.value;
    cur.x += (mouse.current.x - cur.x) * 0.03;
    cur.y += (mouse.current.y - cur.y) * 0.03;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -1.5]}>
      <planeGeometry args={[4.2, 16, 16, 32]} />
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

export default function HeroScene({
  scrollRef,
}: {
  scrollRef?: React.MutableRefObject<ScrollState>;
}) {
  const mouse = useRef({ x: 0, y: 0 });
  const { camera } = useThree();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 768);
      const onResize = () => setIsMobile(window.innerWidth < 768);
      window.addEventListener('resize', onResize);
      return () => window.removeEventListener('resize', onResize);
    }
  }, []);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  useFrame(() => {
    if (isMobile) return;
    const targetCamX = mouse.current.x * 0.15;
    const targetCamY = mouse.current.y * 0.1;
    camera.position.x += (targetCamX - camera.position.x) * 0.04;
    camera.position.y += (targetCamY - camera.position.y) * 0.04;
  });

  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight position={[4, 6, 5]} intensity={1.8} color="#ffffff" />
      <pointLight position={[-3, 1, 2]} intensity={2.0} color="#7C5CFF" />
      <pointLight position={[3, -1, -2]} intensity={1.0} color="#38D6FF" />

      {/* Beam, Decoupled 3-layer starfield, and Hero 3D Extruded Logo */}
      <TunedLightBeam mouse={mouse} />
      <DecoupledStarfield scrollRef={scrollRef} isMobile={isMobile} />
      <HeroLogoMark mouse={mouse} isMobile={isMobile} />
    </>
  );
}
