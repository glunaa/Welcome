import { FC, useEffect, useRef } from 'react';

interface Node {
  x: number; y: number;
  vx: number; vy: number;
  label: string;
}

interface Packet {
  from: number; to: number;
  t: number; speed: number;
  color: string;
}

const LABELS  = ['R1', 'SW', 'PC', 'SRV', 'FW', 'AP', 'DB', 'RTR'];
const COLORS  = ['#4fc3f7', '#81d4fa', '#29b6f6', '#b3e5fc'];
const EDGE_D  = 210;

const NetworkCanvas: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const count = Math.max(6, Math.min(10, Math.floor(canvas.width / 130)));
    const nodes: Node[] = Array.from({ length: count }, (_, i) => ({
      x:  50 + Math.random() * (canvas.width  - 100),
      y:  50 + Math.random() * (canvas.height - 100),
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      label: LABELS[i % LABELS.length],
    }));

    const packets: Packet[] = [];

    const spawnPacket = () => {
      if (nodes.length < 2) return;
      const from = Math.floor(Math.random() * nodes.length);
      let to = Math.floor(Math.random() * (nodes.length - 1));
      if (to >= from) to++;
      packets.push({
        from, to,
        t: 0,
        speed: 0.003 + Math.random() * 0.004,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      });
    };

    for (let i = 0; i < 4; i++) spawnPacket();
    const spawnTimer = setInterval(spawnPacket, 700);

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 20 || n.x > canvas.width  - 20) n.vx *= -1;
        if (n.y < 20 || n.y > canvas.height - 20) n.vy *= -1;
      }

      // Edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (d < EDGE_D) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(79,195,247,${0.13 * (1 - d / EDGE_D)})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      // Packets
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i];
        p.t += p.speed;
        if (p.t >= 1) { packets.splice(i, 1); continue; }
        const fn = nodes[p.from];
        const tn = nodes[p.to];
        const px = fn.x + (tn.x - fn.x) * p.t;
        const py = fn.y + (tn.y - fn.y) * p.t;

        ctx.shadowColor = p.color;
        ctx.shadowBlur  = 10;
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Nodes
      for (const n of nodes) {
        ctx.shadowColor = 'rgba(79,195,247,0.45)';
        ctx.shadowBlur  = 12;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 7, 0, Math.PI * 2);
        ctx.fillStyle   = 'rgba(79,195,247,0.12)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(79,195,247,0.55)';
        ctx.lineWidth   = 1.3;
        ctx.stroke();
        ctx.shadowBlur  = 0;

        ctx.fillStyle   = 'rgba(79,195,247,0.75)';
        ctx.font        = 'bold 8px monospace';
        ctx.textAlign   = 'center';
        ctx.fillText(n.label, n.x, n.y + 19);
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(spawnTimer);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-particles" aria-hidden="true" />;
};

export default NetworkCanvas;
