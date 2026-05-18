"use client";

import { useEffect, useRef } from "react";
type Star = { x: number; y: number; r: number; a: number; speed: number; offset: number };
type Particle = { x: number; y: number; vx: number; vy: number; r: number; a: number };
type Orbiter = { angle: number; trailLen: number; trail: Array<{ x: number; y: number; a: number }>; size: number };
type Ring = { rx: number; ry: number; tiltX: number; tiltZ: number; speed: number; color: string; base: number; dots: number; phase: number; orbiters: Orbiter[] };
const STAR_COUNT = 180;
const PARTICLE_COUNT = 48;
const RING_CONFIG = [
  { rx: 160, ry: 46, tiltX: 70, tiltZ: 0, speed: 0.0022, color: "rgba(167,139,250,", base: 0.4, dots: 2 },
  { rx: 270, ry: 78, tiltX: 64, tiltZ: 28, speed: -0.0015, color: "rgba(99,120,255,", base: 0.26, dots: 3 },
  { rx: 390, ry: 114, tiltX: 76, tiltZ: -18, speed: 0.001, color: "rgba(139,92,246,", base: 0.2, dots: 2 },
  { rx: 520, ry: 152, tiltX: 60, tiltZ: 42, speed: -0.0008, color: "rgba(100,160,255,", base: 0.13, dots: 3 },
  { rx: 660, ry: 192, tiltX: 72, tiltZ: -32, speed: 0.0006, color: "rgba(180,160,255,", base: 0.08, dots: 2 },
] as const;

function randomRange(min: number, max: number) {
  return min + Math.random() * (max - min);
}
function hexToRgba(hex: string, alpha: number) {
  const normalized = hex.trim().replace("#", "");
  if (!/^[0-9a-fA-F]{6}$/.test(normalized)) {
    return `rgba(124,58,237,${alpha})`;
  }
  const r = Number.parseInt(normalized.slice(0, 2), 16);
  const g = Number.parseInt(normalized.slice(2, 4), 16);
  const b = Number.parseInt(normalized.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function createStars(): Star[] {
  return Array.from({ length: STAR_COUNT }, () => ({
    x: randomRange(-900, 900), y: randomRange(-600, 600), r: randomRange(0.2, 1.5),
    a: randomRange(0.1, 0.9), speed: randomRange(0.004, 0.018), offset: randomRange(0, Math.PI * 2),
  }));
}
function createParticles(): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, () => ({
    x: randomRange(-700, 700), y: randomRange(-450, 450), vx: randomRange(-0.11, 0.11),
    vy: randomRange(-0.11, 0.11), r: randomRange(0.3, 1.7), a: randomRange(0.15, 0.65),
  }));
}
function createRings(): Ring[] {
  return RING_CONFIG.map((ring) => ({
    ...ring,
    phase: randomRange(0, Math.PI * 2),
    orbiters: Array.from({ length: ring.dots }, (_, index) => ({
      angle: (index / ring.dots) * Math.PI * 2, trailLen: Math.floor(randomRange(30, 50)),
      trail: [], size: randomRange(2.4, 4),
    })),
  }));
}
export function GalaxyBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const canvasElement: HTMLCanvasElement = canvas;
    const context: CanvasRenderingContext2D = ctx;
    let width = 0;
    let height = 0;
    let centerX = 0;
    let centerY = 0;
    let frameId = 0;
    let resizeTimer: number | undefined;
    const stars = createStars();
    const particles = createParticles();
    const rings = createRings();
    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const styles = getComputedStyle(document.documentElement);
    const primary = styles.getPropertyValue("--bm-primary") || "#7c3aed";
    const blue = styles.getPropertyValue("--bm-blue") || "#3b82f6";
    const nebulaPrimary = hexToRgba(primary, 0.22);
    const nebulaBlue = hexToRgba(blue, 0.12);
    function resize() {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvasElement.width = Math.floor(width * dpr);
      canvasElement.height = Math.floor(height * dpr);
      canvasElement.style.width = `${width}px`;
      canvasElement.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      centerX = width / 2;
      centerY = height / 2;
    }
    function project(ring: Ring, theta: number) {
      const ex = ring.rx * Math.cos(theta);
      const ey = ring.ry * Math.sin(theta);
      const tx = (ring.tiltX * Math.PI) / 180;
      const tz = (ring.tiltZ * Math.PI) / 180;
      const y = ey * Math.cos(tx);
      const z = ey * Math.sin(tx);
      const x2 = ex * Math.cos(tz) - y * Math.sin(tz);
      const y2 = ex * Math.sin(tz) + y * Math.cos(tz);
      return { x: centerX + x2, y: centerY + y2, z };
    }

    function drawNebula() {
      const primaryGradient = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, 340);
      primaryGradient.addColorStop(0, nebulaPrimary);
      primaryGradient.addColorStop(1, "rgba(0,0,0,0)");
      context.fillStyle = primaryGradient;
      context.fillRect(0, 0, width, height);

      const blueGradient = context.createRadialGradient(centerX, centerY - 50, 0, centerX, centerY - 50, 220);
      blueGradient.addColorStop(0, nebulaBlue);
      blueGradient.addColorStop(1, "rgba(0,0,0,0)");
      context.fillStyle = blueGradient;
      context.fillRect(0, 0, width, height);
    }

    function drawStars(timestamp: number) {
      stars.forEach((star) => {
        const twinkle = 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(timestamp * star.speed + star.offset));
        context.beginPath();
        context.arc(centerX + star.x, centerY + star.y, star.r, 0, Math.PI * 2);
        context.fillStyle = `rgba(210,220,255,${star.a * twinkle})`;
        context.fill();
      });
    }

    function drawParticles(animate: boolean) {
      particles.forEach((particle) => {
        if (animate) {
          particle.x += particle.vx;
          particle.y += particle.vy;
          if (Math.abs(particle.x) > 780) particle.vx *= -1;
          if (Math.abs(particle.y) > 520) particle.vy *= -1;
        }
        context.beginPath();
        context.arc(centerX + particle.x, centerY + particle.y, particle.r, 0, Math.PI * 2);
        context.fillStyle = `rgba(160,140,255,${particle.a * 0.45})`;
        context.fill();
      });
    }

    function drawRing(ring: Ring) {
      context.beginPath();
      for (let index = 0; index <= 128; index += 1) {
        const point = project(ring, (index / 128) * Math.PI * 2);
        if (index === 0) context.moveTo(point.x, point.y);
        else context.lineTo(point.x, point.y);
      }
      context.closePath();
      context.strokeStyle = `${ring.color}${ring.base})`;
      context.lineWidth = 0.75;
      context.stroke();
    }

    function drawOrbiters(ring: Ring, animate: boolean) {
      if (animate) ring.phase += ring.speed;
      ring.orbiters.forEach((orbiter) => {
        if (animate) orbiter.angle += ring.speed;
        const point = project(ring, orbiter.angle + ring.phase);
        const depth = 0.4 + 0.6 * ((point.z / ring.rx) * 0.5 + 0.5);
        orbiter.trail.push({ x: point.x, y: point.y, a: depth });
        if (orbiter.trail.length > orbiter.trailLen) orbiter.trail.shift();

        orbiter.trail.forEach((trailPoint, index) => {
          if (index === 0) return;
          const previous = orbiter.trail[index - 1];
          const fade = index / orbiter.trail.length;
          context.beginPath();
          context.moveTo(previous.x, previous.y);
          context.lineTo(trailPoint.x, trailPoint.y);
          context.strokeStyle = `${ring.color}${trailPoint.a * fade * 0.65})`;
          context.lineWidth = orbiter.size * fade * 0.85;
          context.stroke();
        });

        const glow = context.createRadialGradient(point.x, point.y, 0, point.x, point.y, orbiter.size * 4);
        glow.addColorStop(0, `${ring.color}${depth})`);
        glow.addColorStop(0.3, `${ring.color}${depth * 0.6})`);
        glow.addColorStop(1, `${ring.color}0)`);
        context.fillStyle = glow;
        context.beginPath();
        context.arc(point.x, point.y, orbiter.size * 4, 0, Math.PI * 2);
        context.fill();
        context.fillStyle = `rgba(255,255,255,${depth})`;
        context.beginPath();
        context.arc(point.x, point.y, orbiter.size * 0.8, 0, Math.PI * 2);
        context.fill();
      });
    }

    function render(timestamp: number, animate: boolean) {
      context.clearRect(0, 0, width, height);
      drawNebula();
      drawStars(timestamp);
      drawParticles(animate);
      rings.forEach((ring) => {
        drawRing(ring);
        drawOrbiters(ring, animate);
      });
    }

    function loop(timestamp: number) {
      if (document.hidden || reduceMotionQuery.matches) return;
      render(timestamp, true);
      frameId = window.requestAnimationFrame(loop);
    }

    function start() {
      window.cancelAnimationFrame(frameId);
      render(performance.now(), false);
      if (!document.hidden && !reduceMotionQuery.matches) {
        frameId = window.requestAnimationFrame(loop);
      }
    }

    function handleResize() {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        resize();
        start();
      }, 50);
    }

    resize();
    start();
    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", start);
    reduceMotionQuery.addEventListener("change", start);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", start);
      reduceMotionQuery.removeEventListener("change", start);
    };
  }, []);

  return (
    <canvas
      aria-hidden="true"
      className="fixed inset-0 size-full pointer-events-none"
      ref={canvasRef}
      style={{ zIndex: -1 }}
    />
  );
}
