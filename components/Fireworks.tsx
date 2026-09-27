"use client";

import { useEffect, useRef } from "react";

const COLORS = ["#c45c4a", "#e8c9a8", "#7eb8c9", "#f2d06b", "#7cc497", "#ffffff"];
const LAUNCH_WINDOW_MS = 3200;
const LAUNCH_EVERY_MS = 320;
const GRAVITY = 0.06;
const FRICTION = 0.985;

type Rocket = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetY: number;
  color: string;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
};

function randomBetween(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function pickColor(): string {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

export default function Fireworks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      canvas!.width = window.innerWidth * dpr;
      canvas!.height = window.innerHeight * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    const rockets: Rocket[] = [];
    const particles: Particle[] = [];
    const startedAt = performance.now();
    let lastLaunchAt = -Infinity;
    let launchCount = 0;
    let frameId = 0;

    function launch() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const fromLeft = launchCount % 2 === 0;
      launchCount++;
      rockets.push({
        x: fromLeft ? randomBetween(w * 0.04, w * 0.2) : randomBetween(w * 0.8, w * 0.96),
        y: h,
        vx: (fromLeft ? 1 : -1) * randomBetween(0.3, 1.4),
        vy: -randomBetween(9, 13),
        targetY: randomBetween(h * 0.12, h * 0.45),
        color: pickColor(),
      });
    }

    function explode(rocket: Rocket) {
      const count = Math.floor(randomBetween(45, 70));
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + randomBetween(-0.05, 0.05);
        const speed = randomBetween(1.5, 5);
        const maxLife = randomBetween(55, 85);
        particles.push({
          x: rocket.x,
          y: rocket.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: maxLife,
          maxLife,
          color: Math.random() < 0.8 ? rocket.color : pickColor(),
          size: randomBetween(1.4, 2.6),
        });
      }
    }

    function tick(now: number) {
      const elapsed = now - startedAt;
      if (elapsed < LAUNCH_WINDOW_MS && now - lastLaunchAt >= LAUNCH_EVERY_MS) {
        launch();
        lastLaunchAt = now;
      }

      ctx!.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx!.globalCompositeOperation = "lighter";

      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.x += r.vx;
        r.y += r.vy;
        r.vy += GRAVITY * 0.5;
        ctx!.globalAlpha = 1;
        ctx!.fillStyle = r.color;
        ctx!.beginPath();
        ctx!.arc(r.x, r.y, 2.2, 0, Math.PI * 2);
        ctx!.fill();
        if (r.y <= r.targetY || r.vy >= 0) {
          explode(r);
          rockets.splice(i, 1);
        }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.vx *= FRICTION;
        p.vy = p.vy * FRICTION + GRAVITY;
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        ctx!.globalAlpha = p.life / p.maxLife;
        ctx!.fillStyle = p.color;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fill();
      }

      const done = elapsed >= LAUNCH_WINDOW_MS && rockets.length === 0 && particles.length === 0;
      if (!done) frameId = requestAnimationFrame(tick);
    }

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fireworks" aria-hidden="true" />;
}
