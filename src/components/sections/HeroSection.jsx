import { useEffect, useRef } from 'react';

export default function HeroSection() {
  const titleRef = useRef(null);

  useEffect(() => {
    // Découpe le titre en spans pour l'animation canvas
    const el = titleRef.current;
    if (!el) return;
    const text = el.textContent;
    el.innerHTML = '';
    text.split('').forEach((letter) => {
      const span     = document.createElement('span');
      span.innerHTML = letter === ' ' ? '&nbsp;' : letter;
      el.appendChild(span);
    });

    // Active le background après un léger délai
    const timer = setTimeout(() => {
      const bg = document.getElementById('bg-img');
      if (bg) bg.classList.add('visible');
    }, 300);

    return () => clearTimeout(timer);
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
