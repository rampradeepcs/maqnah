"use client";

import { useEffect, useRef } from "react";

/**
 * A wall of cubes seen from directly above, rippling where the cursor has
 * been. Every pointer move drops a point into a 128-texel trail texture; in
 * the vertex shader each cube sums a Gaussian-windowed cosine ring expanding
 * from every live point, so waves cross, average and fade rather than stack.
 * When the pointer rests, random points keep the surface alive.
 *
 * Wave peaks tint toward Saudi green. An RGB-shift vignette pass adds the
 * faint chromatic fringing at the edges. Three.js loads lazily on the client
 * so the rest of the page never waits on it.
 */

const MAX_TRAIL = 128; // must match the literal in the shader lookup
const GRID = 40;
const CUBE_W = 0.8;
const CUBE_H = 3;
const GAP = 0.01;

const WAVE = {
  amplitude: 0.4,
  speed: 6.0, // world units / s
  frequency: 1.2, // radians / world unit
  width: 3.0, // Gaussian half-width of the ring
  jitter: 0.2,
  maxHeight: 0.4,
  fadeTime: 2.0, // s to fall to ~37%
  trailSpacing: 0.1,
  colorBase: "#ffffff",
  colorHigh: "#006c35",
};

const VERTEX_HEAD = /* glsl */ `
  #include <common>
  varying float vHeight;
  attribute vec2 aOffset;
  uniform sampler2D uTrailTexture;
  uniform int   uTrailCount;
  uniform float uWaveSpeed;
  uniform float uWaveFreq;
  uniform float uWaveWidth;
  uniform float uFadeTime;
  uniform float uAmplitude;
  uniform float uJitter;
  uniform float uMaxHeight;

  vec2 hash2(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return fract(sin(p) * 43758.5453123) - 0.5;
  }
`;

const VERTEX_BODY = /* glsl */ `
  #include <begin_vertex>
  vHeight = 0.0;
  if (position.y > 0.0) {
    vec2 jitter  = hash2(aOffset) * uJitter;
    vec2 worldXZ = aOffset + jitter;
    float waveHeight  = 0.0;
    float totalWeight = 0.0;
    for (int i = 0; i < uTrailCount; i++) {
      vec4 td = texture2D(uTrailTexture, vec2((float(i) + 0.5) / 128.0, 0.5));
      float dist      = length(worldXZ - td.rg);
      float wavefront = uWaveSpeed * td.b;
      float relDist   = dist - wavefront;
      float window = exp(-(relDist * relDist) / (uWaveWidth * uWaveWidth));
      float fade   = exp(-td.b / uFadeTime);
      float atten  = 1.0 / (1.0 + dist * 0.1);
      float weight = fade * window * atten * td.a;
      waveHeight  += weight * cos(uWaveFreq * relDist);
      totalWeight += weight;
    }
    waveHeight /= max(totalWeight, 1.0);
    float displacement = clamp(waveHeight * uAmplitude, -uMaxHeight, uMaxHeight);
    transformed.y += displacement;
    vHeight = displacement;
  }
`;

const RGB_SHIFT = {
  uniforms: {
    tDiffuse: { value: null },
    shiftAmount: { value: 0.005 },
    vignetteRadius: { value: 0.3 },
    vignetteSoftness: { value: 0.3 },
    darken: { value: 0.22 },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform float shiftAmount;
    uniform float vignetteRadius;
    uniform float vignetteSoftness;
    uniform float darken;
    varying vec2 vUv;
    void main() {
      vec2 center = vec2(0.5);
      float dist = distance(vUv, center);
      float hq = sign(vUv.x - center.x);
      float vq = sign(vUv.y - center.y);
      float v = smoothstep(vignetteRadius, vignetteRadius + vignetteSoftness, dist);
      float s = shiftAmount * v;
      float r = texture2D(tDiffuse, vUv + vec2(s * hq, s * vq)).r;
      float g = texture2D(tDiffuse, vUv).g;
      float b = texture2D(tDiffuse, vUv - vec2(s * hq, s * vq)).b;
      gl_FragColor = vec4(vec3(r, g, b) * (1.0 - v * darken), 1.0);
    }
  `,
};

export function WaveGrid({ className = "relative" }: { className?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = wrap.current;
    const canvas = canvasRef.current;
    if (!el || !canvas) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      const THREE = await import("three");
      const [{ EffectComposer }, { RenderPass }, { ShaderPass }, { OutputPass }] =
        await Promise.all([
          import("three/examples/jsm/postprocessing/EffectComposer.js"),
          import("three/examples/jsm/postprocessing/RenderPass.js"),
          import("three/examples/jsm/postprocessing/ShaderPass.js"),
          import("three/examples/jsm/postprocessing/OutputPass.js"),
        ]);
      if (disposed) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({
          canvas,
          antialias: true,
          powerPreference: "high-performance",
        });
      } catch {
        return; // no WebGL: the CSS grid underneath stands in
      }
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.95;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFShadowMap;
      renderer.setClearColor("#808080");

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(WAVE.colorBase).multiplyScalar(0.5);

      // --- Camera: straight down, tilting a few degrees toward the pointer
      const RADIUS = 12;
      const ALPHA = Math.PI * 0.03;
      const BETA = Math.PI * 0.05;
      const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 200);
      const mouse = new THREE.Vector2();
      const lerped = new THREE.Vector2();
      const placeCamera = (mx: number, my: number) => {
        const a = my * ALPHA;
        const b = mx * BETA;
        camera.position.set(
          -RADIUS * Math.cos(a) * Math.sin(b),
          RADIUS * Math.cos(a) * Math.cos(b),
          RADIUS * Math.sin(a),
        );
        camera.up.set(0, 0, -1);
        camera.lookAt(0, 0, 0);
      };
      placeCamera(0, 0);
      scene.add(camera);

      // --- Lights
      scene.add(new THREE.AmbientLight("#ffffff", 0.5));
      const key = new THREE.DirectionalLight("#ffffff", 4.0);
      key.position.set(-20, 10, 6);
      key.castShadow = true;
      key.shadow.mapSize.set(1024, 1024);
      key.shadow.radius = 6;
      key.shadow.camera.near = 0.1;
      key.shadow.camera.far = 60;
      key.shadow.camera.left = -22;
      key.shadow.camera.right = 22;
      key.shadow.camera.top = 22;
      key.shadow.camera.bottom = -22;
      key.shadow.bias = 0.0001;
      scene.add(key);
      const fill = new THREE.DirectionalLight("#ffffff", 1.0);
      fill.position.set(10, 5, -3);
      scene.add(fill);

      // --- Trail texture: (worldX, worldZ, age, strength) per texel
      const trailData = new Float32Array(MAX_TRAIL * 4);
      const trailTexture = new THREE.DataTexture(
        trailData,
        MAX_TRAIL,
        1,
        THREE.RGBAFormat,
        THREE.FloatType,
      );
      trailTexture.minFilter = THREE.NearestFilter;
      trailTexture.magFilter = THREE.NearestFilter;
      trailTexture.needsUpdate = true;

      const shared = {
        uTrailTexture: { value: trailTexture },
        uTrailCount: { value: 0 },
        uFadeTime: { value: WAVE.fadeTime },
        uWaveSpeed: { value: WAVE.speed },
        uWaveFreq: { value: WAVE.frequency },
        uWaveWidth: { value: WAVE.width },
        uAmplitude: { value: WAVE.amplitude },
        uJitter: { value: WAVE.jitter },
        uMaxHeight: { value: WAVE.maxHeight },
      };
      const patchVertex = (src: string) =>
        src
          .replace("#include <common>", VERTEX_HEAD)
          .replace("#include <begin_vertex>", VERTEX_BODY);

      // --- The grid
      const count = GRID * GRID;
      const geometry = new THREE.BoxGeometry(CUBE_W, CUBE_H, CUBE_W);
      const offsets = new THREE.InstancedBufferAttribute(
        new Float32Array(count * 2),
        2,
      );
      geometry.setAttribute("aOffset", offsets);

      const material = new THREE.MeshPhongMaterial({ color: 0xffffff });
      material.onBeforeCompile = (shader) => {
        Object.assign(shader.uniforms, shared, {
          uColorBase: { value: new THREE.Color(WAVE.colorBase) },
          uColorHigh: { value: new THREE.Color(WAVE.colorHigh) },
        });
        shader.vertexShader = patchVertex(shader.vertexShader);
        shader.fragmentShader = shader.fragmentShader
          .replace(
            "#include <common>",
            `#include <common>
             varying float vHeight;
             uniform vec3 uColorBase;
             uniform vec3 uColorHigh;
             uniform float uMaxHeight;`,
          )
          .replace(
            "#include <color_fragment>",
            `#include <color_fragment>
             float t = clamp(vHeight / uMaxHeight, 0.0, 1.0);
             diffuseColor.rgb = mix(uColorBase, uColorHigh, t);`,
          );
      };

      // Shadows must follow the displaced cubes, so the depth pass shares the wave.
      const depthMaterial = new THREE.MeshDepthMaterial();
      depthMaterial.onBeforeCompile = (shader) => {
        Object.assign(shader.uniforms, shared);
        shader.vertexShader = patchVertex(shader.vertexShader);
      };

      const mesh = new THREE.InstancedMesh(geometry, material, count);
      mesh.customDepthMaterial = depthMaterial;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      scene.add(mesh);

      const dummy = new THREE.Object3D();
      const spacing = CUBE_W + GAP;
      const half = ((GRID - 1) * spacing) / 2;
      for (let i = 0; i < GRID; i++) {
        for (let j = 0; j < GRID; j++) {
          const index = i * GRID + j;
          const x = i * spacing - half;
          const z = j * spacing - half;
          dummy.position.set(x, 0, z);
          dummy.updateMatrix();
          mesh.setMatrixAt(index, dummy.matrix);
          offsets.setXY(index, x, z);
        }
      }
      mesh.instanceMatrix.needsUpdate = true;
      offsets.needsUpdate = true;

      // --- Post: RGB-shift vignette
      const composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));
      const shiftPass = new ShaderPass(RGB_SHIFT);
      composer.addPass(shiftPass);
      composer.addPass(new OutputPass());

      // --- Trail
      const bounds = GRID * spacing;
      const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(bounds, bounds),
        new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, visible: false }),
      );
      plane.rotation.x = -Math.PI / 2;
      plane.updateMatrixWorld(true);
      const raycaster = new THREE.Raycaster();
      const ndc = new THREE.Vector2();

      type Point = { x: number; z: number; age: number; strength: number };
      const trail: Point[] = [];
      let last: { x: number; z: number } | null = null;
      let idle = 0;
      let randomTimer = 0;
      let placingRandom = true;

      const push = (p: Point) => {
        if (trail.length >= MAX_TRAIL) trail.shift();
        trail.push(p);
      };
      const addRandom = () => {
        push({
          x: (Math.random() * 0.5 - 0.25) * bounds,
          z: (Math.random() * 0.5 - 0.25) * bounds,
          age: 0,
          strength: 0.8 + Math.random() * 0.2,
        });
      };

      let rect = el.getBoundingClientRect();
      const onMove = (e: PointerEvent) => {
        const px = e.clientX - rect.left;
        const py = e.clientY - rect.top;
        if (px < 0 || py < 0 || px > rect.width || py > rect.height) return;
        ndc.set((px / rect.width) * 2 - 1, -(py / rect.height) * 2 + 1);
        raycaster.setFromCamera(ndc, camera);
        const hit = raycaster.intersectObject(plane)[0];
        if (!hit) return;
        const { x, z } = hit.point;
        let strength = 0;
        if (last) {
          strength = Math.hypot(x - last.x, z - last.z);
          if (strength < WAVE.trailSpacing) return;
        }
        push({ x, z, age: 0, strength });
        last = { x, z };
        idle = 0;
        placingRandom = false;
        randomTimer = 0;
      };
      const onCameraMove = (e: PointerEvent) => {
        mouse.set(
          (e.clientX / window.innerWidth) * 2 - 1,
          -(e.clientY / window.innerHeight) * 2 + 1,
        );
      };

      const updateTrail = (dt: number) => {
        const expiry = WAVE.fadeTime * 4;
        for (let i = trail.length - 1; i >= 0; i--) {
          trail[i].age += dt;
          if (trail[i].age > expiry) trail.splice(i, 1);
        }
        idle += dt;
        if (idle >= 3 && !placingRandom) {
          placingRandom = true;
          randomTimer = 0;
        }
        if (placingRandom) {
          randomTimer += dt;
          if (randomTimer >= 1.5) {
            addRandom();
            randomTimer = 0;
          }
        }
        const n = Math.min(trail.length, MAX_TRAIL);
        if (n > 0 || shared.uTrailCount.value > 0) {
          for (let i = 0; i < n; i++) {
            const p = trail[i];
            trailData.set([p.x, p.z, p.age, p.strength], i * 4);
          }
          trailTexture.needsUpdate = true;
          shared.uTrailCount.value = n;
        }
      };

      // --- Sizing
      const resize = () => {
        rect = el.getBoundingClientRect();
        const w = Math.max(1, rect.width);
        const h = Math.max(1, rect.height);
        const dpr = Math.min(window.devicePixelRatio || 1, w < 768 ? 1.5 : 2);
        renderer.setPixelRatio(dpr);
        renderer.setSize(w, h, false);
        composer.setPixelRatio(dpr);
        composer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();

      // --- Loop
      let running = true;
      let lastT = 0;
      const frame = (now: number) => {
        const dt = lastT ? Math.min((now - lastT) / 1000, 0.05) : 0;
        lastT = now;
        lerped.x += (mouse.x - lerped.x) * 0.04;
        lerped.y += (mouse.y - lerped.y) * 0.04;
        placeCamera(lerped.x, lerped.y);
        updateTrail(dt);
        composer.render();
      };

      if (reduced) {
        // A single settled frame: no ripples, no drift.
        composer.render();
      } else {
        addRandom();
        renderer.setAnimationLoop(frame);
        window.addEventListener("pointermove", onMove, { passive: true });
        window.addEventListener("pointermove", onCameraMove, { passive: true });
      }

      const ro = new ResizeObserver(resize);
      ro.observe(el);
      const io = new IntersectionObserver(
        ([entry]) => {
          if (reduced) return;
          const visible = entry.isIntersecting;
          if (visible && !running) {
            lastT = 0;
            renderer.setAnimationLoop(frame);
          }
          if (!visible && running) renderer.setAnimationLoop(null);
          running = visible;
        },
        { threshold: 0 },
      );
      io.observe(el);

      cleanup = () => {
        renderer.setAnimationLoop(null);
        ro.disconnect();
        io.disconnect();
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointermove", onCameraMove);
        geometry.dispose();
        material.dispose();
        depthMaterial.dispose();
        plane.geometry.dispose();
        (plane.material as import("three").Material).dispose();
        trailTexture.dispose();
        composer.dispose();
        renderer.dispose();
      };
    })();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return (
    <div ref={wrap} className={className} aria-hidden>
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
