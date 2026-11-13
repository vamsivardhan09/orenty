'use client';

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SVGLoader } from 'three-stdlib';

export interface ScrollState {
  progress: number;
  velocity: number;
  y: number;
}

// ============================================================================
// 1. PROCEDURAL VOLUMETRIC COSMIC NEBULA SHADER
// Deep space gas clouds, subtle galactic violet and stellar cyan filaments
// ============================================================================
const nebulaVertexShader = `
  varying vec2 vUv;
  varying vec3 vPos;
  void main() {
    vUv = uv;
    vPos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const nebulaFragmentShader = `
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uCursor;
  uniform vec3 uColorBase;
  uniform vec3 uColorViolet;
  uniform vec3 uColorTeal;

  // Ultra-fast 2D hash and smooth pseudo-noise
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }

  // 3-octave FBM for organic billowing dust lanes
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    mat2 rot = mat2(0.877, 0.479, -0.479, 0.877);
    for (int i = 0; i < 3; ++i) {
      v += a * noise(p);
      p = rot * p * 2.05 + vec2(12.5, 34.2);
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    vec2 p = (uv - 0.5) * 2.4;
    
    // Subtle mouse parallax
    p += uCursor * 0.08;

    // Slow organic cosmic drift
    float t = uTime * 0.035;

    // Multi-frequency gas layers
    float n1 = fbm(p * 1.35 + vec2(t * 0.5, -t * 0.35));
    float n2 = fbm(p * 2.1 - vec2(-t * 0.25, t * 0.4) + n1 * 0.65);

    // Volumetric cloud density
    float cloudViolet = smoothstep(0.32, 0.78, n1) * 0.28;
    float cloudTeal = smoothstep(0.42, 0.85, n2) * 0.16;

    // Central volumetric beam scattering (soft bloom glow around center vertical axis)
    float centerGlow = exp(-abs(p.x) * 2.2) * exp(-abs(p.y) * 0.8) * 0.18;

    // Combine into deep celestial atmospheric palette
    vec3 col = uColorBase;
    col += uColorViolet * cloudViolet;
    col += uColorTeal * cloudTeal;
    col += mix(uColorViolet, vec3(0.92, 0.88, 1.0), 0.35) * centerGlow;

    // Vignette to gently fade edges
    float vig = 1.0 - smoothstep(0.55, 1.45, length(p * vec2(0.75, 1.05)));
    float alpha = clamp((cloudViolet * 0.85 + cloudTeal + centerGlow) * vig, 0.0, 0.58);

    gl_FragColor = vec4(col, alpha);
  }
`;

// ============================================================================
// 2. ASTRONOMICAL 3-TIER STARFIELD SHADERS
// Sub-pixel stardust, gaussian glow stars, & optical 4-point cross diffraction spikes
// ============================================================================
const starVertexShader = `
  attribute float aScale;
  attribute float aPhase;
  attribute float aSpeed;
  attribute float aHero;
  attribute vec3 aColor;
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uBaseSize;
  varying float vTwinkle;
  varying vec3 vColor;
  varying float vHero;

  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    
    // Attenuate with camera distance
    float s = uBaseSize * aScale * uPixelRatio * (320.0 / -mv.z);
    
    // Hero stars with diffraction spikes get expanded point size quad
    // Micro stardust is permitted to be delicate and sub-pixel (down to 0.75 * uPixelRatio)
    if (aHero > 0.5) {
      gl_PointSize = clamp(s * 2.8, 16.0 * uPixelRatio, 44.0 * uPixelRatio);
    } else {
      gl_PointSize = clamp(s * 0.85, 0.75 * uPixelRatio, 6.0 * uPixelRatio);
    }
    
    // Multi-frequency organic twinkle (0.35 to 1.0 luminance)
    float t1 = sin(uTime * aSpeed + aPhase);
    float t2 = cos(uTime * (aSpeed * 1.6) + aPhase * 1.3);
    vTwinkle = 0.45 + 0.55 * (0.6 * t1 + 0.4 * t2);
    vColor = aColor;
    vHero = aHero;
  }
`;

const starFragmentShader = `
  varying float vTwinkle;
  varying vec3 vColor;
  varying float vHero;

  void main() {
    vec2 coord = gl_PointCoord - 0.5;
    float dist = length(coord);
    if (dist > 0.5) discard;

    // 1. Soft exponential luminous core (no artificial hard-circle disc edges!)
    float core = exp(-dist * 14.0);
    float halo = exp(-dist * 4.2) * 0.40;
    float lum = core + halo;

    // 2. Anamorphic 4-point cross diffraction flare for hero celestial stars
    if (vHero > 0.5) {
      vec2 p = abs(coord);
      // Cross spikes along X and Y axes
      float spikeX = exp(-p.y * 36.0) * exp(-p.x * 4.0);
      float spikeY = exp(-p.x * 36.0) * exp(-p.y * 4.0);
      // Delicate diagonal flare glint
      float diag = exp(-abs(p.x - p.y) * 40.0) * exp(-dist * 10.0) * 0.22;
      float spikes = max(spikeX, spikeY) * 0.95 + diag;
      lum = max(lum, spikes);
    }

    float alpha = lum * vTwinkle;
    if (alpha < 0.012) discard;

    // Intense diamond-white core reflection
    vec3 finalColor = mix(vColor, vec3(1.0), core * 0.75);
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

// ============================================================================
// 3. VOLUMETRIC CENTRAL VIOLET LIGHT BEAM
// ============================================================================
const beamVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float uTime;
  uniform vec2 uCursor;

  void main() {
    vUv = uv;
    vec3 pos = position;
    float sway = sin(pos.y * 1.5 + uTime * 0.6) * 0.03;
    pos.x += sway + uCursor.x * (1.0 - abs(pos.y) * 0.35) * 0.18;
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
    float core = exp(-dist * 16.0);
    float shroud = exp(-dist * 3.4) * 0.38;
    float verticalFade = smoothstep(0.0, 0.18, vUv.y) * smoothstep(1.0, 0.82, vUv.y);
    float shimmer = 1.0 + sin(vUv.y * 12.0 - uTime * 1.6) * 0.06;
    float alpha = (core * 0.88 + shroud) * verticalFade * shimmer * uOpacity;
    vec3 color = mix(uColorGlow, uColorCore, core);
    gl_FragColor = vec4(color, alpha);
  }
`;

function createStarGeometry(
  count: number,
  zRange: [number, number],
  radiusRange: [number, number],
  ySpread: number = 26,
  heroRatio: number = 0.04
) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const scales = new Float32Array(count);
  const phases = new Float32Array(count);
  const speeds = new Float32Array(count);
  const heroes = new Float32Array(count);

  const white = new THREE.Color('#FFFFFF');
  const icyCyan = new THREE.Color('#C8F5FF');
  const faintLavender = new THREE.Color('#D8B4FE');
  const warmWhite = new THREE.Color('#FFF5EA');

  for (let i = 0; i < count; i++) {
    const radius = radiusRange[0] + Math.random() * (radiusRange[1] - radiusRange[0]);
    const theta = Math.random() * Math.PI * 2;
    const y = (Math.random() - 0.5) * ySpread;
    const z = zRange[0] + Math.random() * (zRange[1] - zRange[0]);

    positions[i * 3] = Math.cos(theta) * radius;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    // Realistic stellar spectral classification
    const randCol = Math.random();
    let col = white;
    if (randCol < 0.16) col = icyCyan;
    else if (randCol < 0.26) col = faintLavender;
    else if (randCol < 0.32) col = warmWhite;

    colors[i * 3] = col.r;
    colors[i * 3 + 1] = col.g;
    colors[i * 3 + 2] = col.b;

    // Top 4% are prominent hero stars with diffraction spikes
    const isHero = Math.random() < heroRatio;
    heroes[i] = isHero ? 1.0 : 0.0;

    if (isHero) {
      scales[i] = 1.2 + Math.random() * 0.8;
      speeds[i] = 0.6 + Math.random() * 1.0;
    } else {
      // 80% micro-dust (scale 0.35 - 0.75), 20% medium field stars
      const isMicro = Math.random() < 0.80;
      scales[i] = isMicro ? 0.35 + Math.random() * 0.4 : 0.8 + Math.random() * 0.6;
      speeds[i] = 0.8 + Math.random() * 1.8;
    }

    phases[i] = Math.random() * Math.PI * 2;
  }

  const geom = new THREE.BufferGeometry();
  geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geom.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
  geom.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
  geom.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1));
  geom.setAttribute('aSpeed', new THREE.BufferAttribute(speeds, 1));
  geom.setAttribute('aHero', new THREE.BufferAttribute(heroes, 1));
  return geom;
}

// ============================================================================
// COMPONENT: Procedural Volumetric Cosmic Nebula
// ============================================================================
function CosmicNebula({
  mouse,
  isMobile,
}: {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
  isMobile: boolean;
}) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uCursor: { value: new THREE.Vector2(0, 0) },
      uColorBase: { value: new THREE.Color('#030308') },
      uColorViolet: { value: new THREE.Color('#381268') },
      uColorTeal: { value: new THREE.Color('#083344') },
    }),
    []
  );

  useFrame((state) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    const cur = materialRef.current.uniforms.uCursor.value;
    cur.x += (mouse.current.x - cur.x) * 0.025;
    cur.y += (mouse.current.y - cur.y) * 0.025;
  });

  return (
    <mesh position={[0, 0, -22]}>
      <planeGeometry args={isMobile ? [28, 40, 1, 1] : [44, 28, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={uniforms}
        vertexShader={nebulaVertexShader}
        fragmentShader={nebulaFragmentShader}
      />
    </mesh>
  );
}

// ============================================================================
// COMPONENT: Multi-Tier Celestial Cosmic Starfield
// ============================================================================
function CelestialStarfield({
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

  const IDLE_SPEED = 0.0018; // rad/sec
  const MAX_SCROLL_ROT = 0.18; // max ~10° total over scroll
  const SMOOTH = 0.04;

  const idleRef = useRef(0);
  const scrollRotRef = useRef(0);

  // Balanced counts: generous micro-stardust without performance impact
  const counts = useMemo(
    () =>
      isMobile
        ? { far: 520, mid: 140, near: 35 }
        : { far: 1400, mid: 380, near: 80 },
    [isMobile]
  );

  const farGeom = useMemo(
    () => createStarGeometry(counts.far, [-22, -10], [4, 18], 28, 0.03),
    [counts.far]
  );
  const midGeom = useMemo(
    () => createStarGeometry(counts.mid, [-10, -4], [3, 13], 20, 0.05),
    [counts.mid]
  );
  const nearGeom = useMemo(
    () => createStarGeometry(counts.near, [-4, -1], [2, 8], 14, 0.08),
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
          uBaseSize: { value: 0.16 },
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
          uBaseSize: { value: 0.26 },
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
          uBaseSize: { value: 0.40 },
        },
        vertexShader: starVertexShader,
        fragmentShader: starFragmentShader,
      }),
    };
  }, [isMobile]);

  useFrame((_, delta) => {
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

// ============================================================================
// COMPONENT: Hero 3D Logo Mark
// ============================================================================
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
          const scale = isMobile ? 0.0055 : 0.0075;
          extrudeGeom.scale(scale, -scale, scale);
          setGeometry(extrudeGeom);
        }
      }
    } catch (e) {
      console.warn('SVG extrusion error:', e);
    }

    return () => {
      if (geometry) geometry.dispose();
    };
  }, [isMobile]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;

    const floatY = Math.sin(time * 1.2) * 0.06;
    const floatRotY = Math.sin(time * 0.5) * 0.14;
    const floatRotX = Math.sin(time * 0.8) * 0.06;

    const targetRotX = -0.12 + floatRotX - mouse.current.y * 0.10;
    const targetRotY = 0.28 + floatRotY + mouse.current.x * 0.10;

    groupRef.current.position.set(0, floatY, 0);
    groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.08;
    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.08;
    groupRef.current.rotation.z = Math.sin(time * 0.6) * 0.02;
  });

  if (!geometry) return null;

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <mesh geometry={geometry}>
        <meshStandardMaterial
          color="#1E1B4B"
          metalness={0.80}
          roughness={0.20}
          emissive="#6366F1"
          emissiveIntensity={0.28}
        />
      </mesh>
      {/* Studio rim lights for the whitish canvas */}
      <ambientLight intensity={1.5} />
      <directionalLight position={[3, 4, 5]} intensity={2.2} />
      <pointLight color="#818CF8" intensity={3.0} distance={6} decay={2} position={[-2, 2, 3]} />
      <pointLight color="#38BDF8" intensity={2.5} distance={5} decay={2} position={[2, -1.5, 2]} />
    </group>
  );
}

// ============================================================================
// COMPONENT: Tuned Central Volumetric Violet Light Beam
// ============================================================================
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
      uOpacity: { value: 0.72 },
    }),
    []
  );

  useFrame((state) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    const cur = materialRef.current.uniforms.uCursor.value;
    cur.x += (mouse.current.x - cur.x) * 0.035;
    cur.y += (mouse.current.y - cur.y) * 0.035;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -1.5]}>
      <planeGeometry args={[6.8, 18, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={uniforms}
        vertexShader={beamVertexShader}
        fragmentShader={beamFragmentShader}
      />
    </mesh>
  );
}

// ============================================================================
// MAIN HERO SCENE CONTAINER
// ============================================================================
export default function HeroScene({
  scrollRef,
  isMobile = false,
}: {
  scrollRef?: React.MutableRefObject<ScrollState>;
  isMobile?: boolean;
}) {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />

      {/* Hero 3D Extruded Logo Mark */}
      <HeroLogoMark mouse={mouse} isMobile={isMobile} />
    </>
  );
}
