import { useSectionObserver } from '../../hooks/useSectionObserver';

export default function ContactSection({ onVisible }) {
  const ref = useSectionObserver(onVisible, 'contact');

  return (
    <section
      ref={ref}
      className="section contact-section"
      id="contact"
      style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.8s ease-in-out' }}
    >
      <h2 className="section-title">Entrer en Contact</h2>
      <p className="contact-intro">Intéressé par une collaboration ? Parlons de vos projets.</p>
      <div className="contact-links">
        <a href="mailto:ilias.cherrat14@gmail.com" className="contact-link">📧 Email</a>
        <a href="https://linkedin.com/in/ilias-cherrat" target="_blank" rel="noopener noreferrer" className="contact-link">💼 LinkedIn</a>
        <a href="https://github.com/atreidescode" target="_blank" rel="noopener noreferrer" className="contact-link">🐙 GitHub</a>
      </div>
      <p className="footer-copy">© 2026 — Ilias Cherrat — ALL RIGHTS RESERVED</p>
    </section>
  );
}
