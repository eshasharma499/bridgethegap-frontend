"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function GlobeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const current = mountRef.current;
    if (!current) return;

    const scene = new THREE.Scene();

    // 🌌 Fog (depth)
    scene.fog = new THREE.Fog(0x000000, 3, 10);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    camera.position.z = 3.5;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    current.appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(4.5, 96, 96);

    // 🌫️ Base sphere
    const baseMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.02,
    });

    const base = new THREE.Mesh(geometry, baseMaterial);
    scene.add(base);

    // 🧵 Wireframe
    const wireMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 1,
    });

    const wire = new THREE.Mesh(geometry, wireMaterial);
    scene.add(wire);

    // ✨ Dots
    const dotsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.030,
    });

    const dots = new THREE.Points(geometry, dotsMaterial);
    scene.add(dots);

    // 🌍 Atmosphere layer
    const atmosphereMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.02,
    });

    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(5, 64, 64),
      atmosphereMaterial
    );

    scene.add(atmosphere);

    // 💡 Light
    const light = new THREE.PointLight(0xffffff, 1.2);
    light.position.set(2, 2, 2);
    scene.add(light);

    scene.add(new THREE.AmbientLight(0xffffff, 0.3));

    // 🧠 Mouse interaction
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 🔄 Animation
    const animate = () => {
      requestAnimationFrame(animate);

      base.rotation.y += 0.001 + mouseX * 0.002;
      wire.rotation.y += 0.001 + mouseX * 0.002;
      dots.rotation.y += 0.001 + mouseX * 0.002;
      atmosphere.rotation.y += 0.001;

      base.rotation.x += mouseY * 0.001;
      wire.rotation.x += mouseY * 0.001;

      renderer.render(scene, camera);
    };

    animate();

    // 🧹 Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      className="absolute inset-0 z-0 opacity-80"
      ref={mountRef}
    />
  );
}