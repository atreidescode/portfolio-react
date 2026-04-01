import { useSectionObserver } from '../../hooks/useSectionObserver';

const INTERESTS = [
  { id: '01', category: 'PROFESSIONAL FOCUS', title: 'Développement',  description: 'Concevoir des architectures propres et scalables.' },
  { id: '02', category: 'PROFESSIONAL FOCUS', title: 'Trading',          description: 'Analyse de marché et automatisation de stratégies financières.' },
  { id: '03', category: 'PERSONAL UNIVERSE',  title: 'Jeux Vidéo',       description: 'Immersion dans les jeux de stratégie et expériences narratives.' },
  { id: '04', category: 'PERSONAL UNIVERSE',  title: 'Mangas',            description: 'Culture visuelle japonaise, source d’inspiration pour mes projets.' },
];

export default function InterestsSection({ onVisible }) {
  const ref = useSectionObserver(onVisible);

  return (
    <section
      ref={ref}
      className="section"
      id="interests"
      style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.8s ease-in-out' }}
    >
      <h2 className="section-title">Centres d’Intérêt</h2>
      <div className="interests-grid">
        {INTERESTS.map((item) => (
          <div key={item.id} className="interest-card">
            <div className="interest-category">{item.id} / {item.category}</div>
            <h3 className="interest-title">{item.title}</h3>
            <p className="interest-description">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
