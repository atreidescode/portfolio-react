import { useRef } from 'react';
import PROJECTS from '../../data/projects';
import { useSlider } from '../../hooks/useSlider';
import { useSectionObserver } from '../../hooks/useSectionObserver';

export default function ProjectsSection({ onVisible }) {
  const sectionRef             = useSectionObserver(onVisible);
  const { current, goTo, prev, next } = useSlider(PROJECTS.length);

  // Swipe tactile et souris
  const startX     = useRef(0);
  const isDragging = useRef(false);

  const handleTouchStart = (e) => { startX.current = e.touches[0].clientX; isDragging.current = true; };
  const handleTouchEnd   = (e) => {
    if (!isDragging.current) return;
    const diff = startX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
    isDragging.current = false;
  };
  const handleMouseDown  = (e) => { startX.current = e.clientX; isDragging.current = true; };
  const handleMouseUp    = (e) => {
    if (!isDragging.current) return;
    const diff = startX.current - e.clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
    isDragging.current = false;
  };

  return (
    <section
      ref={sectionRef}
      className="section"
      id="projects"
      style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.8s ease-in-out' }}
    >
      <h2 className="section-title">Projets</h2>

      <div className="slider-outer">
        <button className="slider-btn prev" onClick={prev} aria-label="Projet précédent">&#8249;</button>

        <div className="slider-wrapper">
          <div
            className="projects-slider"
            style={{ transform: `translateX(-${current * 100}%)` }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => { isDragging.current = false; }}
          >
            {PROJECTS.map((project) => (
              <div key={project.id} className="project-card">
                <div className="project-number">{project.number}</div>
                <div className="project-tech">{project.tech}</div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <a
                  href={project.link}
                  target={project.link !== '#' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  {project.linkLabel}
                </a>
              </div>
            ))}
          </div>
        </div>

        <button className="slider-btn next" onClick={next} aria-label="Projet suivant">&#8250;</button>
      </div>

      <div className="slider-dots">
        {PROJECTS.map((_, i) => (
          <button
            key={i}
            className={`slider-dot${i === current ? ' active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Projet ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
