import { useEffect, useRef } from 'react';

/**
 * Observe quand la section entre dans le viewport.
 * Déclenche onVisible(sectionKey) une seule fois + anime la section.
 * Accepte un sectionKey optionnel pour identifier la section.
 */
export function useSectionObserver(onVisible, sectionKey) {
  const ref     = useRef(null);
  const hasFired = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasFired.current) {
          hasFired.current = true;
          // Anime la section
          el.style.opacity   = '1';
          el.style.transform = 'translateY(0)';
          // Déclenche le terminal avec la clé de section
          if (onVisible && sectionKey) onVisible(sectionKey);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [onVisible, sectionKey]);

  return ref;
}
