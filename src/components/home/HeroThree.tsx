"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function HeroThree() {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const frame = frameRef.current;
    const container = containerRef.current;
    if (!canvas || !frame || !container) return;

    let isDisposed = false;
    let animationFrameId: number;

    const width = frame.clientWidth;
    const height = frame.clientHeight;
    const pixelRatio = Math.min(window.devicePixelRatio, 2);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.set(0, 0, 6);
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(pixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // Ambient & Directional Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(3, 4, 5);
    scene.add(dirLight);

    // Environment Lighting
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load("/home/hero/textures/desktop/scene-gradient.webp", (envTexture) => {
      if (isDisposed) return;
      envTexture.mapping = THREE.EquirectangularReflectionMapping;
      envTexture.colorSpace = THREE.SRGBColorSpace;
      const pmremGenerator = new THREE.PMREMGenerator(renderer);
      const envMap = pmremGenerator.fromEquirectangular(envTexture).texture;
      scene.environment = envMap;
      pmremGenerator.dispose();
    });

    // 3D Logo Group
    const logoGroup = new THREE.Group();
    scene.add(logoGroup);

    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      "/home/hero/logo.glb",
      (gltf) => {
        if (isDisposed) return;
        const model = gltf.scene;

        // Metallic Material
        const baseMaterial = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          metalness: 0.95,
          roughness: 0.3,
          envMapIntensity: 1.2,
        });

        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            (child as THREE.Mesh).material = baseMaterial;
          }
        });

        // Compute Bounding Box and Center
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        model.position.sub(center);

        logoGroup.add(model);

        // Adaptive scaling based on viewport FOV
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2.2 / maxDim;
        logoGroup.scale.setScalar(scale);
      },
      undefined,
      (err) => {
        console.warn("GLB load failed, fallback to geometric emblem", err);
        const geom = new THREE.TorusKnotGeometry(0.8, 0.28, 128, 32);
        const mat = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          metalness: 0.9,
          roughness: 0.35,
        });
        const mesh = new THREE.Mesh(geom, mat);
        logoGroup.add(mesh);
      }
    );

    // Text Planes in 3D Space
    const createTextPlane = (
      texturePath: string,
      w: number,
      h: number,
      pos: [number, number, number],
      rot: [number, number, number] = [0, 0, 0]
    ) => {
      textureLoader.load(texturePath, (tex) => {
        if (isDisposed) return;
        tex.colorSpace = THREE.SRGBColorSpace;
        const planeGeo = new THREE.PlaneGeometry(w, h);
        const planeMat = new THREE.MeshBasicMaterial({
          map: tex,
          transparent: true,
          opacity: 0.95,
          depthWrite: false,
        });
        const mesh = new THREE.Mesh(planeGeo, planeMat);
        mesh.position.set(...pos);
        mesh.rotation.set(...rot);
        scene.add(mesh);
      });
    };

    createTextPlane("/home/hero/textures/desktop/texts/text-name.webp", 8, 2, [0, 0, -2]);

    // Mouse Interaction
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Render loop
    let lastTime = performance.now();
    const animate = (time: number) => {
      if (isDisposed) return;
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      // Mouse smoothing
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Subtle logo float & rotation
      logoGroup.rotation.y += delta * 0.4;
      logoGroup.rotation.x = mouse.y * 0.25;
      logoGroup.position.x = mouse.x * 0.2;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);

    // Resize Handler
    const handleResize = () => {
      if (!frame || isDisposed) return;
      const w = frame.clientWidth;
      const h = frame.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener("resize", handleResize);

    // GSAP ScrollTrigger for 3D Camera Orbit & Frame Transition
    const scrollTrigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "+=2800",
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        // Orbit camera around 3D logo
        const angle = -progress * Math.PI * 0.5;
        camera.position.x = Math.sin(angle) * 6;
        camera.position.z = Math.cos(angle) * 6;
        camera.position.y = progress * 3;
        camera.lookAt(0, progress * 3, 0);

        // Frame scale & border radius transition
        if (progress > 0.7) {
          const exitProg = (progress - 0.7) / 0.3;
          gsap.set(frame, {
            scaleX: 1 - exitProg * 0.12,
            scaleY: 1 - exitProg * 0.1,
            borderRadius: `${exitProg * 32}px`,
          });
        } else {
          gsap.set(frame, { scaleX: 1, scaleY: 1, borderRadius: "18px" });
        }
      },
    });

    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      scrollTrigger.kill();
      renderer.dispose();
    };
  }, []);

  return (
    <section ref={containerRef} className="hero-three relative w-full h-screen overflow-hidden bg-cream" id="hero">
      <div
        ref={frameRef}
        className="hero-three__frame absolute inset-0 w-full h-full overflow-hidden rounded-[18px]"
        style={{ clipPath: "inset(clamp(8px, calc(2.5vw - 8px), 16px) round 18px)" }}
      >
        <canvas ref={canvasRef} className="webgl w-full h-full block" aria-hidden="true" />
      </div>

      <div className="hero-content relative z-10 w-full h-full pointer-events-none">
        <div className="hero-content__identity absolute bottom-8 right-8 text-right text-dark">
          <h1 className="hero-content__title font-cabinet text-4xl md:text-6xl font-bold tracking-tight">
            Guillaume Zhu
          </h1>
          <div className="hero-content__role mt-3 flex flex-col gap-1 font-satoshi text-base md:text-lg font-medium opacity-80">
            <span>Front Creative Developer</span>
            <span>Art Director</span>
          </div>
        </div>
      </div>
    </section>
  );
}
