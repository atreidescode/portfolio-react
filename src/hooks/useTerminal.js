import { useState, useRef, useCallback } from 'react';
import TERMINAL_SEQUENCES from '../data/terminalSequences';

export function useTerminal() {
  const [text, setText]       = useState('');
  const [visible, setVisible] = useState(false);
  const timeoutRef            = useRef(null);
  const iTypingRef            = useRef(0);   // index courant
  const fullTextRef           = useRef('');  // texte complet à taper

  const showTerminal = useCallback((sectionKey) => {
    const seq = TERMINAL_SEQUENCES[sectionKey];
    if (!seq) return;

    // Annule le typage précédent
    clearTimeout(timeoutRef.current);

    const full = seq.prompt + seq.text;
    fullTextRef.current = full;
    iTypingRef.current  = 0;

    setText('');
    setVisible(true);

    const typeChar = () => {
      const i = iTypingRef.current;
      if (i < fullTextRef.current.length) {
        // Construit la string complète jusqu'à i+1 (pas d'accumulation via prev)
        const next = fullTextRef.current.slice(0, i + 1);
        setText(next);
        iTypingRef.current = i + 1;
        timeoutRef.current = setTimeout(typeChar, seq.delay);
      }
    };

    typeChar();
  }, []);

  const closeTerminal = useCallback(() => {
    clearTimeout(timeoutRef.current);
    setVisible(false);
    setText('');
  }, []);

  return { text, visible, showTerminal, closeTerminal };
}
