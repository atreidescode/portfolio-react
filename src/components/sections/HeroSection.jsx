import { useEffect, useRef } from 'react';

/**
 * Section Hero : titre animé (lettres en spans) + sous-titre.
 * Reproduit hero-title-effect.js en React pur.
 * useEffect découpe le texte en <span> une seule fois au montage.
 */
export default function HeroSection() {
  const titleRef = useRef(null);

  useEffect(() => {
    const el   = titleRef.current;
    if (!el) return;
    const text = el.textContent;
    el.innerHTML = '';
    text.split('').forEach((letter) => {
      const span       = document.createElement('span');
      span.innerHTML   = letter === ' ' ? '&nbsp;' : letter;
      el.appendChild(span);
    });
  }, []);

  return (
    <div id="main-content" className="content">
      <h1 id="title-text" ref={titleRef}>
        Ilias Cherrat
      </h1>
      <p id="glass-box">
        Développeur | Python Specialist | Automation Engineer
      </p>
    </div>
  );
}
