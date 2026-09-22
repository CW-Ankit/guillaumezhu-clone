"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function HeroThree() {
  const containerRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const frame = frameRef.current;
    const container = containerRef.current;
    if (!canvas || !frame || !container) return;

    let isDisposed = false;
    let animationFrameId: number;

    const width = frame.clientWidth || window.innerWidth;
    const height = frame.clientHeight || window.innerHeight;
    const pixelRatio = Math.min(window.devicePixelRatio, 2);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.5);
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
    renderer.toneMappingExposure = 1.05;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // Ambient and Directional Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xf5e7df, 0.6);
    fillLight.position.set(-4, -2, -3);
    scene.add(fillLight);

    // Environment Lighting
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      "/home/hero/textures/desktop/scene-gradient.webp",
      (envTexture) => {
        if (isDisposed) return;
        envTexture.mapping = THREE.EquirectangularReflectionMapping;
        envTexture.colorSpace = THREE.SRGBColorSpace;
        const pmremGenerator = new THREE.PMREMGenerator(renderer);
        const envMap = pmremGenerator.fromEquirectangular(envTexture).texture;
        scene.environment = envMap;
        pmremGenerator.dispose();
      },
      undefined,
      () => {
        // Fallback gracefully if texture is not ready
      }
    );

    // 3D Logo Group
    const logoGroup = new THREE.Group();
    scene.add(logoGroup);

    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      "/home/hero/logo.glb",
      (gltf) => {
        if (isDisposed) return;
        const model = gltf.scene;

        const metallicMaterial = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          metalness: 0.95,
          roughness: 0.28,
          envMapIntensity: 1.4,
        });

        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            (child as THREE.Mesh).material = metallicMaterial;
          }
        });

        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        model.position.sub(center);

        logoGroup.add(model);

        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2.0 / (maxDim || 1);
        logoGroup.scale.setScalar(scale);
      },
      undefined,
      (err) => {
        console.warn("GLB load fallback", err);
        const geom = new THREE.TorusKnotGeometry(0.75, 0.24, 128, 32);
        const mat = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          metalness: 0.92,
          roughness: 0.3,
        });
        const mesh = new THREE.Mesh(geom, mat);
        logoGroup.add(mesh);
      }
    );

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
      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      logoGroup.rotation.y += delta * 0.25;
      logoGroup.rotation.x = mouse.y * 0.2;
      logoGroup.position.x = mouse.x * 0.18;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);

    // Resize Handler
    const handleResize = () => {
      if (!frame || isDisposed) return;
      const w = frame.clientWidth || window.innerWidth;
      const h = frame.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener("resize", handleResize);

    // ScrollTrigger Camera Orbit & Choreography
    const st = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "+=1200",
      pin: true,
      scrub: 0.8,
      onUpdate: (self) => {
        const progress = self.progress;
        const angle = -progress * Math.PI * 0.45;
        camera.position.x = Math.sin(angle) * 5.5;
        camera.position.z = Math.cos(angle) * 5.5;
        camera.position.y = progress * 1.5;
        camera.lookAt(0, 0, 0);

        if (frame) {
          const frameScale = 1 - progress * 0.05;
          frame.style.transform = `scale(${frameScale})`;
        }

        const identity = container.querySelector(".hero-content__identity") as HTMLElement | null;
        if (identity) {
          identity.style.opacity = `${Math.max(0, 1 - progress * 2.5)}`;
          identity.style.transform = `translateY(${progress * 30}px)`;
        }
      },
    });

    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      st.kill();
      renderer.dispose();
    };
  }, []);

  return (
    <section ref={containerRef} className="hero-three" id="hero">
      <div ref={frameRef} className="hero-three__frame">
        <canvas ref={canvasRef} className="webgl" aria-hidden="true" />
      </div>

      <div className="hero-content">
        <div className="hero-content__identity">
          <h1 className="hero-content__title">Guillaume Zhu</h1>
          <div className="hero-content__role">
            <span>Front Creative Developer</span>
            <span>Art Director</span>
          </div>
        </div>
      </div>
    </section>
  );
}
