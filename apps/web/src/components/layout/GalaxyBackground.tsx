"use client";

import { useEffect, useRef, useState } from "react";
type Star = { x: number; y: number; r: number; a: number; speed: number; offset: number };
type Particle = { x: number; y: number; vx: number; vy: number; r: number; a: number };
type Orbiter = { angle: number; trailLen: number; trail: Array<{ x: number; y: number; a: number }>; size: number };
type Ring = { rx: number; ry: number; tiltX: number; tiltZ: number; speed: number; color: string; base: number; dots: number; phase: number; orbiters: Orbiter[] };
type Ripple = { id: number; x: number; y: number };
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
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [pointerVisible, setPointerVisible] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);

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

  useEffect(() => {
    let rippleId = 0;

    function handleMove(event: PointerEvent) {
      setPointerVisible(true);
      setPointer({ x: event.clientX, y: event.clientY });
    }

    function handleLeave() {
      setPointerVisible(false);
    }

    function handleDown(event: PointerEvent) {
      const id = rippleId++;
      setRipples((items) => [...items, { id, x: event.clientX, y: event.clientY }].slice(-5));
      window.setTimeout(() => {
        setRipples((items) => items.filter((item) => item.id !== id));
      }, 900);
    }

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerleave", handleLeave);
    window.addEventListener("pointerdown", handleDown);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerleave", handleLeave);
      window.removeEventListener("pointerdown", handleDown);
    };
  }, []);

  return (
    <>
      <canvas
        aria-hidden="true"
        className="fixed inset-0 size-full pointer-events-none"
        ref={canvasRef}
        style={{ zIndex: -1 }}
      />
      <div aria-hidden="true" className="bm-cosmic-layer" style={{ zIndex: -1 }}>
        <div className="bm-aurora bm-aurora-a" />
        <div className="bm-aurora bm-aurora-b" />
        <div className="bm-orbit bm-orbit-a" />
        <div className="bm-orbit bm-orbit-b" />
        <div className="bm-stars bm-stars-a" />
        <div className="bm-stars bm-stars-b" />
        <div className="bm-constellation bm-constellation-a" />
        <div className="bm-constellation bm-constellation-b" />
        <div className="bm-meteor bm-meteor-a" />
        <div className="bm-meteor bm-meteor-b" />
        <div className="bm-meteor bm-meteor-c" />
        <div className="bm-cosmic-veil" />
      </div>
      <div
        aria-hidden="true"
        className="bm-cursor-glow"
        style={{
          opacity: pointerVisible ? 1 : 0,
          transform: `translate3d(${pointer.x}px, ${pointer.y}px, 0)`,
          zIndex: -1,
        }}
      />
      {ripples.map((ripple) => (
        <span
          aria-hidden="true"
          className="bm-click-ripple"
          key={ripple.id}
          style={{ left: ripple.x, top: ripple.y, zIndex: -1 }}
        />
      ))}
      <style>{`
        .bm-cosmic-layer {
          position: fixed;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          background:
            radial-gradient(circle at 20% 10%, rgba(167, 139, 250, 0.06), transparent 28rem),
            radial-gradient(circle at 80% 20%, rgba(125, 211, 252, 0.035), transparent 30rem),
            radial-gradient(circle at 50% 85%, rgba(251, 191, 36, 0.03), transparent 32rem);
        }
        .bm-cosmic-veil {
          position: absolute;
          inset: 0;
          z-index: 5;
          background:
            radial-gradient(circle at 50% 35%, transparent 0 16rem, rgba(2, 6, 23, 0.30) 36rem),
            rgba(2, 6, 23, 0.26);
          backdrop-filter: saturate(0.72);
        }
        .bm-aurora {
          position: absolute;
          width: 80rem;
          height: 26rem;
          border-radius: 999px;
          filter: blur(44px);
          opacity: 0.10;
          mix-blend-mode: screen;
          transform-origin: center;
        }
        .bm-aurora-a {
          left: -18rem;
          top: 8rem;
          background: linear-gradient(90deg, rgba(124, 58, 237, 0), rgba(124, 58, 237, 0.26), rgba(244, 114, 182, 0.10), rgba(124, 58, 237, 0));
          animation: bmAuroraA 18s ease-in-out infinite alternate;
        }
        .bm-aurora-b {
          right: -22rem;
          bottom: 5rem;
          background: linear-gradient(90deg, rgba(125, 211, 252, 0), rgba(125, 211, 252, 0.12), rgba(251, 191, 36, 0.07), rgba(125, 211, 252, 0));
          animation: bmAuroraB 22s ease-in-out infinite alternate;
        }
        .bm-orbit {
          position: absolute;
          left: 50%;
          top: 45%;
          width: 62rem;
          height: 19rem;
          border: 1px solid rgba(167, 139, 250, 0.08);
          border-radius: 50%;
          box-shadow: 0 0 18px rgba(124, 58, 237, 0.07);
          transform-origin: center;
        }
        .bm-orbit-a { animation: bmOrbitA 34s linear infinite; }
        .bm-orbit-b {
          width: 44rem;
          height: 13rem;
          border-color: rgba(251, 191, 36, 0.08);
          animation: bmOrbitB 42s linear infinite reverse;
        }
        .bm-stars {
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(circle, rgba(255,255,255,0.90) 0 1px, transparent 1.5px),
            radial-gradient(circle, rgba(253,224,71,0.75) 0 1px, transparent 1.5px),
            radial-gradient(circle, rgba(125,211,252,0.70) 0 1px, transparent 1.5px);
          background-size: 120px 120px, 190px 190px, 260px 260px;
          background-position: 0 0, 40px 80px, 120px 20px;
          opacity: 0.12;
        }
        .bm-stars-a { animation: bmStarDrift 32s linear infinite; }
        .bm-stars-b {
          opacity: 0.06;
          filter: blur(1px);
          transform: scale(1.25);
          animation: bmStarDriftB 48s linear infinite;
        }
        .bm-constellation {
          position: absolute;
          width: 26rem;
          height: 18rem;
          opacity: 0.11;
          background:
            linear-gradient(28deg, transparent 18%, rgba(125, 211, 252, 0.22) 18.2%, transparent 18.6%),
            linear-gradient(138deg, transparent 43%, rgba(167, 139, 250, 0.20) 43.2%, transparent 43.8%),
            linear-gradient(8deg, transparent 64%, rgba(251, 191, 36, 0.15) 64.2%, transparent 64.6%);
        }
        .bm-constellation::before,
        .bm-constellation::after {
          content: "";
          position: absolute;
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 999px;
          background: #dbeafe;
          box-shadow:
            6rem 3rem 0 rgba(253, 224, 71, 0.58),
            14rem 5rem 0 rgba(167, 139, 250, 0.58),
            22rem 12rem 0 rgba(125, 211, 252, 0.58),
            9rem 15rem 0 rgba(255, 255, 255, 0.50);
        }
        .bm-constellation-a {
          left: 7vw;
          top: 17vh;
          animation: bmFloat 14s ease-in-out infinite alternate;
        }
        .bm-constellation-b {
          right: 8vw;
          bottom: 16vh;
          transform: rotate(18deg) scale(0.85);
          animation: bmFloat 18s ease-in-out infinite alternate-reverse;
        }
        .bm-meteor {
          position: absolute;
          width: 8rem;
          height: 1px;
          border-radius: 999px;
          background: linear-gradient(90deg, rgba(255,255,255,0), rgba(253,224,71,0.58), rgba(125,211,252,0.20));
          box-shadow: 0 0 10px rgba(253, 224, 71, 0.20);
          opacity: 0;
          transform: rotate(var(--meteor-rotate));
          transform-origin: right center;
        }
        .bm-meteor::after {
          content: "";
          position: absolute;
          right: 0;
          top: 50%;
          width: 0.28rem;
          height: 0.28rem;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.86);
          box-shadow: 0 0 12px rgba(253, 224, 71, 0.55);
          transform: translateY(-50%);
        }
        .bm-meteor-a {
          left: -12rem;
          top: 12vh;
          --meteor-rotate: 18deg;
          --meteor-x: 132vw;
          --meteor-y: 42vh;
          animation: bmMeteor 17s linear infinite 1.2s;
        }
        .bm-meteor-b {
          left: calc(100vw + 14rem);
          top: 26vh;
          width: 6.5rem;
          --meteor-rotate: 154deg;
          --meteor-x: -138vw;
          --meteor-y: 34vh;
          animation: bmMeteor 21s linear infinite 7s;
        }
        .bm-meteor-c {
          left: -14rem;
          top: 82vh;
          width: 7.5rem;
          --meteor-rotate: -16deg;
          --meteor-x: 128vw;
          --meteor-y: -30vh;
          animation: bmMeteor 25s linear infinite 12s;
        }
        .bm-cursor-glow {
          position: fixed;
          left: 0;
          top: 0;
          width: 18rem;
          height: 18rem;
          margin-left: -9rem;
          margin-top: -9rem;
          pointer-events: none;
          border-radius: 999px;
          background:
            radial-gradient(circle, rgba(253, 224, 71, 0.04), transparent 22%),
            radial-gradient(circle, rgba(167, 139, 250, 0.06), transparent 46%),
            radial-gradient(circle, rgba(125, 211, 252, 0.035), transparent 66%);
          filter: blur(34px);
          mix-blend-mode: screen;
          transition: opacity 180ms ease-out;
          will-change: transform, opacity;
        }
        .bm-click-ripple {
          position: fixed;
          width: 0.75rem;
          height: 0.75rem;
          margin-left: -0.375rem;
          margin-top: -0.375rem;
          pointer-events: none;
          border-radius: 999px;
          border: 1px solid rgba(253, 224, 71, 0.55);
          box-shadow:
            0 0 14px rgba(253, 224, 71, 0.48),
            0 0 32px rgba(167, 139, 250, 0.26);
          animation: bmClickRipple 900ms ease-out forwards;
        }
        .bm-click-ripple::before,
        .bm-click-ripple::after {
          content: "";
          position: absolute;
          left: 50%;
          top: 50%;
          width: 4px;
          height: 4px;
          border-radius: 999px;
          background: var(--bm-cyan);
          box-shadow:
            22px 0 0 rgba(253, 224, 71, 0.58),
            -20px 2px 0 rgba(167, 139, 250, 0.58),
            4px 20px 0 rgba(255, 255, 255, 0.50),
            -3px -22px 0 rgba(125, 211, 252, 0.58);
          transform: translate(-50%, -50%);
          animation: bmClickSpark 900ms ease-out forwards;
        }
        .bm-click-ripple::after {
          transform: translate(-50%, -50%) rotate(45deg);
        }
        @keyframes bmAuroraA {
          from { transform: translate3d(0, 0, 0) rotate(-12deg) scale(1); }
          to { transform: translate3d(12rem, 8rem, 0) rotate(8deg) scale(1.12); }
        }
        @keyframes bmAuroraB {
          from { transform: translate3d(0, 0, 0) rotate(16deg) scale(1); }
          to { transform: translate3d(-10rem, -7rem, 0) rotate(-10deg) scale(1.08); }
        }
        @keyframes bmOrbitA {
          from { transform: translate(-50%, -50%) rotate(18deg); }
          to { transform: translate(-50%, -50%) rotate(378deg); }
        }
        @keyframes bmOrbitB {
          from { transform: translate(-50%, -50%) rotate(-26deg); }
          to { transform: translate(-50%, -50%) rotate(334deg); }
        }
        @keyframes bmStarDrift {
          from { background-position: 0 0, 40px 80px, 120px 20px; }
          to { background-position: 120px 120px, 230px 270px, 380px 280px; }
        }
        @keyframes bmStarDriftB {
          from { background-position: 0 0, 40px 80px, 120px 20px; }
          to { background-position: -160px 180px, -80px 320px, 30px 420px; }
        }
        @keyframes bmFloat {
          from { translate: 0 0; opacity: 0.12; }
          to { translate: 2rem -1.5rem; opacity: 0.22; }
        }
        @keyframes bmMeteor {
          0%, 58% { opacity: 0; transform: translate3d(0, 0, 0) rotate(var(--meteor-rotate)); }
          64% { opacity: 0.62; }
          86% { opacity: 0.30; }
          100% { opacity: 0; transform: translate3d(var(--meteor-x), var(--meteor-y), 0) rotate(var(--meteor-rotate)); }
        }
        @keyframes bmClickRipple {
          0% { transform: scale(0.4); opacity: 0.95; }
          70% { opacity: 0.45; }
          100% { transform: scale(10); opacity: 0; }
        }
        @keyframes bmClickSpark {
          0% { opacity: 1; scale: 0.4; }
          100% { opacity: 0; scale: 2.2; }
        }
        @media (prefers-reduced-motion: reduce) {
          .bm-cosmic-layer *,
          .bm-cursor-glow,
          .bm-click-ripple {
            animation: none !important;
            display: none;
          }
        }
      `}</style>
    </>
  );
}
