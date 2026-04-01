import { useEffect, useRef } from 'react';

/**
 * Composant canvas pour la pluie de bits diagonale.
 * Encapsule toute la logique impérative du canvas dans useEffect.
 * Reçoit rainEnabled (bool) depuis App via prop.
 * Utilise un ref pour le flag afin d'éviter les re-renders inutiles.
 */

// --- Classes de particules (portées depuis rain-particles.js) ---

class DiagDrop {
  constructor(canvasW, canvasH, fontSize) {
    this.x      = Math.random() * (canvasW * 1.5) - canvasW * 0.5;
    this.y      = -20;
    this.speed  = 200 + Math.random() * 150;
    this.text   = Math.random() > 0.5 ? '1' : '0';
    this.font   = `${fontSize}px 'Courier New'`;
  }
  update(dt) {
    this.x += this.speed * 0.4 * dt;
    this.y += this.speed * dt;
  }
  draw(ctx) {
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.font      = this.font;
    ctx.fillText(this.text, this.x, this.y);
  }
}

class Particle {
  constructor(x, y) {
    this.x    = x;
    this.y    = y;
    this.vx   = (Math.random() - 0.5) * 200;
    this.vy   = (Math.random() - 1)   * 200;
    this.life = 1.0;
    this.size = 2;
  }
  update(dt) {
    this.x    += this.vx * dt;
    this.y    += this.vy * dt;
    this.life -= 0.8 * dt;
  }
  draw(ctx) {
    ctx.fillStyle = `rgba(255,255,255,${this.life})`;
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }
}

function checkGlassCollision(drop, rect) {
  return (
    drop.x >= rect.left &&
    drop.x <= rect.right &&
    drop.y >= rect.top &&
    drop.y <= rect.top + 30
  );
}

function checkLetterCollision(drop, particlesArr) {
  for (const span of document.querySelectorAll('h1 span')) {
    const r = span.getBoundingClientRect();
    if (
      drop.x >= r.left && drop.x <= r.right &&
      drop.y >= r.top  && drop.y <= r.bottom
    ) {
      for (let k = 0; k < 5; k++)
        particlesArr.push(new Particle(drop.x, drop.y));
      return true;
    }
  }
  return false;
}

// --- Composant React ---

export default function RainCanvas({ rainEnabled }) {
  const canvasRef     = useRef(null);
  // Utilise un ref pour rainEnabled afin que la boucle
  // d'animation lise toujours la valeur à jour sans redémarrer
  const rainEnabledRef = useRef(rainEnabled);

  // Synchronise le ref avec la prop
  useEffect(() => {
    rainEnabledRef.current = rainEnabled;
  }, [rainEnabled]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    const SPAWN_RATE = 0.06;

    let animId;
    let lastTime      = Date.now();
    let fontSize      = window.innerWidth < 600 ? 12 : 16;
    let columns       = Math.floor(window.innerWidth / fontSize);
    let diagonalDrops = [];
    let particles     = [];

    function initCanvas() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      fontSize      = window.innerWidth < 600 ? 12 : 16;
      const newCols = Math.floor(canvas.width / fontSize);
      if (Math.abs(newCols - columns) > 2) columns = newCols;
    }

    function getDeltaTime() {
      const now = Date.now();
      const dt  = Math.min((now - lastTime) / 1000, 0.05);
      lastTime  = now;
      return dt;
    }

    function animate() {
      const dt      = getDeltaTime();
      const glassEl = document.getElementById('glass-box');

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (rainEnabledRef.current && glassEl) {
        const glassRect = glassEl.getBoundingClientRect();

        if (Math.random() < SPAWN_RATE)
          diagonalDrops.push(new DiagDrop(canvas.width, canvas.height, fontSize));

        for (let i = diagonalDrops.length - 1; i >= 0; i--) {
          const d = diagonalDrops[i];
          d.update(dt);
          d.draw(ctx);
          if (checkLetterCollision(d, particles)) {
            diagonalDrops.splice(i, 1);
            continue;
          }
          if (d.y > canvas.height) {
            for (let k = 0; k < 5; k++)
              particles.push(new Particle(d.x, canvas.height));
            diagonalDrops.splice(i, 1);
            continue;
          }
          if (checkGlassCollision(d, glassRect)) {
            for (let k = 0; k < 5; k++)
              particles.push(new Particle(d.x, d.y));
            diagonalDrops.splice(i, 1);
          }
        }

        for (let i = particles.length - 1; i >= 0; i--) {
          particles[i].update(dt);
          particles[i].draw(ctx);
          if (particles[i].life <= 0) particles.splice(i, 1);
        }
      }

      animId = requestAnimationFrame(animate);
    }

    initCanvas();
    window.addEventListener('resize', initCanvas);
    animate();

    // Cleanup : arrête la boucle et retire le listener au démontage
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', initCanvas);
    };
  }, []); // Démarre une seule fois au montage

  return (
    <canvas
      ref={canvasRef}
      id="canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
