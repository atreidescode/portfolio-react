import { useEffect, useRef } from 'react';
import '../../styles/scroll-stack.css';

/**
 * ScrollStack — reproduction de l'effet React Bits.
 * Chaque carte reste sticky en haut et se fait empiler par la suivante.
 * Props :
 *   items     — array d'objets { id, content: ReactNode }
 *   cardHeight — hauteur de chaque carte en px (défaut 420)
 */
export default function ScrollStack({ items = [], cardHeight = 420 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const cards = containerRef.current?.querySelectorAll('.ss-card');
    if (!cards) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('ss-card--visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [items]);

  return (
    <div ref={containerRef} className="ss-container">
      {items.map((item, index) => (
        <div
          key={item.id}
          className="ss-sticky-wrapper"
          style={{ top: `${index * 24}px` }}
        >
          <div
            className="ss-card"
            style={{
              height: cardHeight,
              zIndex: index + 1,
              transformOrigin: 'top center',
            }}
          >
            {item.content}
          </div>
        </div>
      ))}
    </div>
  );
}
