import STACK from '../../data/stack';
import { useSectionObserver } from '../../hooks/useSectionObserver';

export default function StackSection({ onVisible }) {
  const ref = useSectionObserver(onVisible, 'stack');

  return (
    <section
      ref={ref}
      className="section"
      id="stack"
      style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.8s ease-in-out' }}
    >
      <h2 className="section-title">Stack</h2>
      <div className="stack-container">
        {STACK.map((tech) => (
          <div key={tech} className="tech-tag">{tech}</div>
        ))}
      </div>
      <p className="stack-description">
        <strong>Core Intelligence:</strong> Python Scripting<br />
        <strong>Connectivity:</strong> Web &amp; Financial APIs
      </p>
    </section>
  );
}
