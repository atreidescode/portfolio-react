import { useEffect } from 'react';
import TextType from '../ui/TextType';

export default function HeroSection() {

  useEffect(() => {
    // Active le background au chargement
    const timer = setTimeout(() => {
      const bg = document.getElementById('bg-img');
      if (bg) bg.classList.add('visible');
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="main-content" className="content">
      <h1 id="title-text">
        <TextType
          text="Ilias Cherrat"
          typingSpeed={110}
          cursorChar="|"
          cursorBlink={true}
        />
      </h1>
      <p id="glass-box">
        Développeur | Python Specialist | Automation Engineer
      </p>
    </div>
  );
}
