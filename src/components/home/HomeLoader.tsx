"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";

export function HomeLoader({ onComplete }: { onComplete?: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let isDisposed = false;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load("/brand/logo-guillaume-zhu.svg", (logoTexture) => {
      if (isDisposed) return;

      const vertexShader = `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position.xy, 0.0, 1.0);
        }
      `;

      const fragmentShader = `
        uniform sampler2D uLogo;
        uniform float uProgress;
        varying vec2 vUv;

        void main() {
          vec4 logo = texture2D(uLogo, vUv);
          float alpha = step(1.0 - uProgress, vUv.y) * logo.a;
          gl_FragColor = vec4(0.12, 0.11, 0.11, alpha);
        }
      `;

      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uLogo: { value: logoTexture },
          uProgress: { value: 0 },
        },
        transparent: true,
      });

      const plane = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.5), material);
      scene.add(plane);

      const anim = gsap.to(material.uniforms.uProgress, {
        value: 1,
        duration: 1.5,
        ease: "power2.inOut",
        onUpdate: () => {
          if (!isDisposed) renderer.render(scene, camera);
        },
        onComplete: () => {
          gsap.to(container, {
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            onComplete: () => {
              setIsDone(true);
              onComplete?.();
            },
          });
        },
      });

      const handleResize = () => {
        if (!container || isDisposed) return;
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.render(scene, camera);
      };
      window.addEventListener("resize", handleResize);

      return () => {
        anim.kill();
        window.removeEventListener("resize", handleResize);
      };
    });

    return () => {
      isDisposed = true;
      renderer.dispose();
    };
  }, [onComplete]);

  if (isDone) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] bg-cream flex items-center justify-center pointer-events-none transition-opacity duration-500"
      role="status"
      aria-label="Loading portfolio"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
