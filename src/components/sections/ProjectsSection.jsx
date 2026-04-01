import PROJECTS from '../../data/projects';
import { useSectionObserver } from '../../hooks/useSectionObserver';
import ScrollStack from '../ui/ScrollStack';

const projectItems = PROJECTS.map((p) => ({
  id: p.id,
  content: (
    <>
      <div>
        <div className="ss-card-number">{p.number}</div>
        <div className="ss-card-tech">{p.tech}</div>
        <h3 className="ss-card-title">{p.title}</h3>
        <p className="ss-card-description">{p.description}</p>
      </div>
      <a
        href={p.link}
        target={p.link !== '#' ? '_blank' : undefined}
        rel="noopener noreferrer"
        className="ss-card-link"
      >
        {p.linkLabel}
      </a>
    </>
  ),
}));

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
      <ScrollStack items={projectItems} cardHeight={360} />
    </section>
  );
}
