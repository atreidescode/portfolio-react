import PROJECTS from '../../data/projects';
import { useSectionObserver } from '../../hooks/useSectionObserver';

export default function ProjectsSection({ onVisible }) {
  const ref = useSectionObserver(onVisible, 'projects');

  return (
    <section
      ref={ref}
      className="section"
      id="projects"
      style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.8s ease-in-out' }}
    >
      <h2 className="section-title">Projets</h2>
      <div className="projects-list">
        {PROJECTS.map((p) => (
          <div key={p.id} className="project-card">
            <div>
              <div className="project-number">{p.number}</div>
              <div className="project-tech">{p.tech}</div>
              <h3 className="project-title">{p.title}</h3>
              <p className="project-description">{p.description}</p>
            </div>
            <a
              href={p.link}
              target={p.link !== '#' ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="project-link"
            >
              {p.linkLabel}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
