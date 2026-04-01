import { useEffect, useRef, useState } from 'react';

/**
 * Reproduit l'animation "Text Type" de React Bits.
 * Props :
 *   text          - string à taper
 *   typingSpeed   - ms entre chaque lettre (défaut 110)
 *   cursorChar    - caractère curseur (défaut "|")
 *   cursorBlink   - bool, fait clignoter le curseur (défaut true)
 *   className     - classe CSS supplémentaire
 */
export default function TextType({
  text = '',
  typingSpeed = 110,
  cursorChar = '|',
  cursorBlink = true,
  className = '',
}) {
  const [displayed, setDisplayed] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const indexRef   = useRef(0);
  const typerRef   = useRef(null);
  const blinkRef   = useRef(null);

  // Typage
  useEffect(() => {
    indexRef.current = 0;
    setDisplayed('');

    const type = () => {
      if (indexRef.current < text.length) {
        setDisplayed(text.slice(0, indexRef.current + 1));
        indexRef.current += 1;
        typerRef.current = setTimeout(type, typingSpeed);
      }
    };

    typerRef.current = setTimeout(type, typingSpeed);
    return () => clearTimeout(typerRef.current);
  }, [text, typingSpeed]);

  // Clignotement curseur
  useEffect(() => {
    if (!cursorBlink) return;
    blinkRef.current = setInterval(() => {
      setShowCursor((v) => !v);
    }, 530);
    return () => clearInterval(blinkRef.current);
  }, [cursorBlink]);

  return (
    <span className={className}>
      {displayed}
      <span style={{ opacity: showCursor ? 1 : 0, transition: 'opacity 0.1s' }}>
        {cursorChar}
      </span>
    </span>
  );
}
