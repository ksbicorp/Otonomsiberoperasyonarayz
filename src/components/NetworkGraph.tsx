import { useEffect, useRef, useState } from 'react';

export function NetworkGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrame: number;
    let time = 0;

    const centerX = 490;
    const centerY = 360;
    const orbitRadius = 240;

    // Categories around center (like AI Runtime Security)
    const categories = [
      { id: 'mcp', label: 'MCP SERVICES', sublabel: '42', angle: -90, color: '#ec4899', nodeCount: 4 },
      { id: 'tools', label: 'SECURITY TOOLS', sublabel: '170+', angle: -30, color: '#3b82f6', nodeCount: 5 },
      { id: 'models', label: 'AI MODELS', sublabel: '12', angle: 30, color: '#06b6d4', nodeCount: 4 },
      { id: 'data', label: 'DATASOURCES', sublabel: 'COMING SOON', angle: 90, color: '#10b981', nodeCount: 3 },
      { id: 'vulns', label: 'VULNERABILITIES', sublabel: '321', angle: 150, color: '#ef4444', nodeCount: 5 },
      { id: 'agents', label: 'AGENTS', sublabel: '8', angle: 210, color: '#a855f7', nodeCount: 4 },
    ];

    const draw = () => {
      ctx.clearRect(0, 0, 980, 720);
      time += 0.015;

      // Draw horizontal lines background pattern (like AI Runtime Security)
      ctx.strokeStyle = 'rgba(55, 65, 81, 0.15)';
      ctx.lineWidth = 1;
      for (let y = 0; y < 720; y += 8) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(980, y);
        ctx.stroke();
      }

      // Draw connections with curves
      categories.forEach((cat, catIdx) => {
        const angleRad = (cat.angle * Math.PI) / 180;
        const catX = centerX + Math.cos(angleRad) * orbitRadius;
        const catY = centerY + Math.sin(angleRad) * orbitRadius;

        // Draw curved connection from category to center
        for (let i = 0; i < cat.nodeCount; i++) {
          const spread = 60;
          const nodeAngle = angleRad + (i - cat.nodeCount / 2) * 0.3;
          const nodeRadius = orbitRadius + (i % 2 === 0 ? 20 : -20);
          const nodeX = centerX + Math.cos(nodeAngle) * nodeRadius;
          const nodeY = centerY + Math.sin(nodeAngle) * nodeRadius;

          // Curved line to center
          ctx.beginPath();
          ctx.moveTo(nodeX, nodeY);
          
          const cpX = (nodeX + centerX) / 2;
          const cpY = (nodeY + centerY) / 2;
          ctx.quadraticCurveTo(cpX, cpY, centerX, centerY);

          const gradient = ctx.createLinearGradient(nodeX, nodeY, centerX, centerY);
          gradient.addColorStop(0, cat.color + '80');
          gradient.addColorStop(1, cat.color + '20');
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Draw node with glow
          const nodeSize = 8 + Math.sin(time * 2 + i) * 2;
          
          // Outer glow
          const glowGradient = ctx.createRadialGradient(nodeX, nodeY, 0, nodeX, nodeY, nodeSize * 3);
          glowGradient.addColorStop(0, cat.color + 'AA');
          glowGradient.addColorStop(0.4, cat.color + '40');
          glowGradient.addColorStop(1, cat.color + '00');
          ctx.fillStyle = glowGradient;
          ctx.beginPath();
          ctx.arc(nodeX, nodeY, nodeSize * 3, 0, Math.PI * 2);
          ctx.fill();

          // Inner node
          ctx.fillStyle = cat.color;
          ctx.beginPath();
          ctx.arc(nodeX, nodeY, nodeSize, 0, Math.PI * 2);
          ctx.fill();

          // Ring around some nodes
          if (i % 2 === 0) {
            ctx.strokeStyle = cat.color + '60';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(nodeX, nodeY, nodeSize + 6, 0, Math.PI * 2);
            ctx.stroke();
          }
        }

        // Draw main category node (bigger)
        const mainNodeSize = 18 + Math.sin(time * 1.5 + catIdx) * 3;
        
        // Outer glow for main node
        const mainGlow = ctx.createRadialGradient(catX, catY, 0, catX, catY, mainNodeSize * 3);
        mainGlow.addColorStop(0, cat.color);
        mainGlow.addColorStop(0.3, cat.color + '80');
        mainGlow.addColorStop(1, cat.color + '00');
        ctx.fillStyle = mainGlow;
        ctx.beginPath();
        ctx.arc(catX, catY, mainNodeSize * 3, 0, Math.PI * 2);
        ctx.fill();

        // Main node circle
        ctx.fillStyle = cat.color;
        ctx.beginPath();
        ctx.arc(catX, catY, mainNodeSize, 0, Math.PI * 2);
        ctx.fill();

        // Inner highlight
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.beginPath();
        ctx.arc(catX - 3, catY - 3, mainNodeSize * 0.4, 0, Math.PI * 2);
        ctx.fill();

        // Outer ring
        ctx.strokeStyle = cat.color;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(catX, catY, mainNodeSize + 8, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Draw center node (like "111 APPLICATIONS")
      const centerRadius = 90;

      // Pulsing outer rings
      for (let i = 0; i < 3; i++) {
        const ringRadius = centerRadius + 30 + i * 20 + Math.sin(time + i) * 8;
        ctx.strokeStyle = `rgba(212, 175, 55, ${0.2 - i * 0.05})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, ringRadius, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Center circle background
      const centerGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, centerRadius);
      centerGradient.addColorStop(0, '#1f2937');
      centerGradient.addColorStop(1, '#111827');
      ctx.fillStyle = centerGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, centerRadius, 0, Math.PI * 2);
      ctx.fill();

      // Center border
      ctx.strokeStyle = '#374151';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Center text
      ctx.fillStyle = '#d4af37';
      ctx.font = 'bold 42px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('344', centerX, centerY - 12);

      ctx.fillStyle = '#9ca3af';
      ctx.font = '11px sans-serif';
      ctx.fillText('SERVICES', centerX, centerY + 18);

      // Draw category labels
      categories.forEach(cat => {
        const angleRad = (cat.angle * Math.PI) / 180;
        const labelX = centerX + Math.cos(angleRad) * (orbitRadius + 70);
        const labelY = centerY + Math.sin(angleRad) * (orbitRadius + 70);

        ctx.fillStyle = '#6b7280';
        ctx.font = 'bold 10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(cat.label, labelX, labelY);

        const sublabelColor = cat.sublabel === 'COMING SOON' ? '#10b981' : cat.color;
        ctx.fillStyle = sublabelColor;
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText(cat.sublabel, labelX, labelY + 14);
      });

      animationFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      {/* Subtle Midas Pro watermark in background */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{ opacity: 0.03 }}
      >
        <span 
          className="text-[160px] text-[#d4af37]"
          style={{ 
            fontFamily: 'Playfair Display, Georgia, serif',
            fontWeight: 'bold',
            letterSpacing: '0.1em'
          }}
        >
          Midas Pro
        </span>
      </div>
      
      <canvas 
        ref={canvasRef} 
        width={980} 
        height={720}
        className="w-full h-full"
      />
    </div>
  );
}
