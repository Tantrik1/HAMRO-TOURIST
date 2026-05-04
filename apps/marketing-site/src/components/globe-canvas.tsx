'use client';

import { useRef, useEffect } from 'react';

const GLOBE_RADIUS = 140;
const DOT_COUNT = 420;
const ROTATION_SPEED = 0.0015;

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Flight {
  start: Point3D;
  end: Point3D;
  progress: number;
  speed: number;
  delay: number;
  active: boolean;
}

function fibonacciSphere(n: number, radius: number): Point3D[] {
  const points: Point3D[] = [];
  const goldenRatio = (1 + Math.sqrt(5)) / 2;
  for (let i = 0; i < n; i++) {
    const theta = 2 * Math.PI * (i / goldenRatio);
    const phi = Math.acos(1 - 2 * ((i + 0.5) / n));
    const x = Math.cos(theta) * Math.sin(phi) * radius;
    const y = Math.sin(theta) * Math.sin(phi) * radius;
    const z = Math.cos(phi) * radius;
    points.push({ x, y, z });
  }
  return points;
}

function latLonToVec3(lat: number, lon: number, radius: number): Point3D {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return {
    x: -(radius * Math.sin(phi) * Math.cos(theta)),
    z: radius * Math.sin(phi) * Math.sin(theta),
    y: radius * Math.cos(phi),
  };
}

function rotateY(p: Point3D, angle: number): Point3D {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    x: p.x * cos - p.z * sin,
    y: p.y,
    z: p.x * sin + p.z * cos,
  };
}

function rotateX(p: Point3D, angle: number): Point3D {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    x: p.x,
    y: p.y * cos - p.z * sin,
    z: p.y * sin + p.z * cos,
  };
}

function project(p: Point3D, width: number, height: number, fov = 500) {
  const scale = fov / (fov + p.z);
  return {
    x: p.x * scale + width / 2,
    y: p.y * scale + height / 2,
    scale,
    z: p.z,
  };
}

function getCurvePoint(p1: Point3D, p2: Point3D, t: number, radius: number): Point3D {
  const lx = p1.x + (p2.x - p1.x) * t;
  const ly = p1.y + (p2.y - p1.y) * t;
  const lz = p1.z + (p2.z - p1.z) * t;
  const dist = Math.sqrt(lx * lx + ly * ly + lz * lz);
  const elevation = radius * 0.32 * Math.sin(t * Math.PI);
  const factor = dist === 0 ? 1 : (dist + elevation) / dist;
  return { x: lx * factor, y: ly * factor, z: lz * factor };
}

const CITIES = [
  { lat: 40.7128, lon: -74.006, name: 'New York' },
  { lat: 51.5074, lon: -0.1278, name: 'London' },
  { lat: 35.6762, lon: 139.6503, name: 'Tokyo' },
  { lat: -33.8688, lon: 151.2093, name: 'Sydney' },
  { lat: 25.2048, lon: 55.2708, name: 'Dubai' },
  { lat: 48.8566, lon: 2.3522, name: 'Paris' },
  { lat: 1.3521, lon: 103.8198, name: 'Singapore' },
  { lat: 52.52, lon: 13.405, name: 'Berlin' },
  { lat: 34.0522, lon: -118.2437, name: 'Los Angeles' },
  { lat: -22.9068, lon: -43.1729, name: 'Rio' },
  { lat: 55.7558, lon: 37.6173, name: 'Moscow' },
  { lat: 19.4326, lon: -99.1332, name: 'Mexico City' },
];

const NEPAL = { lat: 27.7172, lon: 85.324 };

export default function GlobeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetMouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let rotation = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
    };

    resize();

    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    const basePoints = fibonacciSphere(DOT_COUNT, GLOBE_RADIUS);
    const nepalPoint = latLonToVec3(NEPAL.lat, NEPAL.lon, GLOBE_RADIUS * 1.02);
    const cityPoints = CITIES.map((c) => ({
      ...c,
      point: latLonToVec3(c.lat, c.lon, GLOBE_RADIUS * 1.02),
    }));

    const flights: Flight[] = cityPoints.map((c, i) => ({
      start: c.point,
      end: nepalPoint,
      progress: 0,
      speed: 0.0025 + Math.random() * 0.0015,
      delay: i * 90 + Math.random() * 60,
      active: false,
    }));

    const draw = () => {
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);

      rotation += ROTATION_SPEED;

      // Smooth mouse interpolation
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.05;

      const mx = (mouseRef.current.x - width / 2) * 0.00015;
      const my = (mouseRef.current.y - height / 2) * 0.00015;

      const centerX = width / 2;
      const centerY = height / 2;

      // Atmosphere glow (subtle)
      const glow = ctx.createRadialGradient(
        centerX, centerY, GLOBE_RADIUS * 0.7,
        centerX, centerY, GLOBE_RADIUS * 1.8
      );
      glow.addColorStop(0, 'rgba(124, 58, 237, 0.04)');
      glow.addColorStop(0.5, 'rgba(124, 58, 237, 0.02)');
      glow.addColorStop(1, 'rgba(124, 58, 237, 0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, GLOBE_RADIUS * 1.8, 0, Math.PI * 2);
      ctx.fill();

      // Project and draw globe dots
      const projectedDots = basePoints.map((p) => {
        const r1 = rotateY(p, rotation);
        const r2 = rotateX(r1, my);
        const r3 = rotateY(r2, mx);
        return project(r3, width, height);
      });

      projectedDots.sort((a, b) => a.z - b.z);

      for (const dot of projectedDots) {
        if (dot.z < -GLOBE_RADIUS * 0.35) continue;

        const depth = (dot.z + GLOBE_RADIUS) / (2 * GLOBE_RADIUS);
        const opacity = 0.08 + depth * 0.38;
        const size = 0.8 + depth * 1.4;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 56, 179, ${opacity})`;
        ctx.fill();
      }

      // Draw flight paths
      for (const flight of flights) {
        if (!flight.active) {
          flight.delay--;
          if (flight.delay <= 0) flight.active = true;
          continue;
        }

        flight.progress += flight.speed;
        if (flight.progress >= 1) {
          flight.progress = 0;
          flight.delay = 80 + Math.random() * 160;
          flight.active = false;
          continue;
        }

        const trailLength = 0.18;
        const startT = Math.max(0, flight.progress - trailLength);

        // Build path points
        const pathPoints: { x: number; y: number }[] = [];
        for (let t = startT; t <= flight.progress; t += 0.008) {
          const cp = getCurvePoint(flight.start, flight.end, t, GLOBE_RADIUS);
          const r1 = rotateY(cp, rotation);
          const r2 = rotateX(r1, my);
          const r3 = rotateY(r2, mx);
          const proj = project(r3, width, height);
          if (proj.z > -GLOBE_RADIUS * 0.2) {
            pathPoints.push({ x: proj.x, y: proj.y });
          }
        }

        if (pathPoints.length > 1) {
          ctx.beginPath();
          ctx.moveTo(pathPoints[0].x, pathPoints[0].y);
          for (let i = 1; i < pathPoints.length; i++) {
            ctx.lineTo(pathPoints[i].x, pathPoints[i].y);
          }

          const alpha = 0.5 * (1 - flight.progress * 0.6);
          ctx.strokeStyle = `rgba(249, 115, 22, ${alpha})`;
          ctx.lineWidth = 1.5;
          ctx.lineCap = 'round';
          ctx.stroke();

          // Glow line
          ctx.beginPath();
          ctx.moveTo(pathPoints[0].x, pathPoints[0].y);
          for (let i = 1; i < pathPoints.length; i++) {
            ctx.lineTo(pathPoints[i].x, pathPoints[i].y);
          }
          ctx.strokeStyle = `rgba(249, 115, 22, ${alpha * 0.25})`;
          ctx.lineWidth = 4;
          ctx.stroke();
        }

        // Head dot
        const head = getCurvePoint(flight.start, flight.end, flight.progress, GLOBE_RADIUS);
        const rHead = rotateY(head, rotation);
        const rHead2 = rotateX(rHead, my);
        const rHead3 = rotateY(rHead2, mx);
        const projHead = project(rHead3, width, height);

        if (projHead.z > -GLOBE_RADIUS * 0.2) {
          const headAlpha = 0.9 * (1 - flight.progress * 0.4);

          // Glow
          const hg = ctx.createRadialGradient(projHead.x, projHead.y, 0, projHead.x, projHead.y, 14);
          hg.addColorStop(0, `rgba(249, 115, 22, ${0.25 * headAlpha})`);
          hg.addColorStop(1, 'rgba(249, 115, 22, 0)');
          ctx.fillStyle = hg;
          ctx.beginPath();
          ctx.arc(projHead.x, projHead.y, 14, 0, Math.PI * 2);
          ctx.fill();

          ctx.beginPath();
          ctx.arc(projHead.x, projHead.y, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${headAlpha})`;
          ctx.fill();
        }
      }

      // Nepal marker
      const rNepal = rotateY(nepalPoint, rotation);
      const rNepal2 = rotateX(rNepal, my);
      const rNepal3 = rotateY(rNepal2, mx);
      const projNepal = project(rNepal3, width, height);

      if (projNepal.z > -GLOBE_RADIUS * 0.25) {
        const pulse = Math.sin(Date.now() * 0.003) * 0.5 + 0.5;

        // Outer ring pulse
        ctx.beginPath();
        ctx.arc(projNepal.x, projNepal.y, 14 + pulse * 10, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(249, 115, 22, ${0.08 * pulse})`;
        ctx.fill();

        // Middle ring
        ctx.beginPath();
        ctx.arc(projNepal.x, projNepal.y, 8, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(249, 115, 22, ${0.4 + pulse * 0.3})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Core
        ctx.beginPath();
        ctx.arc(projNepal.x, projNepal.y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = '#F97316';
        ctx.fill();

        // Core glow
        const ng = ctx.createRadialGradient(projNepal.x, projNepal.y, 0, projNepal.x, projNepal.y, 12);
        ng.addColorStop(0, `rgba(249, 115, 22, ${0.3 * pulse})`);
        ng.addColorStop(1, 'rgba(249, 115, 22, 0)');
        ctx.fillStyle = ng;
        ctx.beginPath();
        ctx.arc(projNepal.x, projNepal.y, 12, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseRef.current.x = e.clientX - rect.left;
      targetMouseRef.current.y = e.clientY - rect.top;
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'auto',
      }}
    />
  );
}
