import RainCanvas           from './components/canvas/RainCanvas';
import HeroSection          from './components/sections/HeroSection';
import StackSection         from './components/sections/StackSection';
import ProjectsSection      from './components/sections/ProjectsSection';
import InterestsSection     from './components/sections/InterestsSection';
import ContactSection       from './components/sections/ContactSection';
import Terminal             from './components/widgets/Terminal';
import EyeButton            from './components/widgets/EyeButton';
import ScrollArrow          from './components/widgets/ScrollArrow';
import { useRain }          from './hooks/useRain';
import { useTerminal }      from './hooks/useTerminal';

/**
 * Composant racine.
 * - Gère l'état global rainEnabled (passé au canvas et au bouton oeil)
 * - Gère l'état du terminal (passé au widget Terminal)
 * - Passe onVisible aux sections pour déclencher le terminal au scroll
 */
export default function App() {
  const { rainEnabled, toggleRain }             = useRain();
  const { text, visible, showTerminal, closeTerminal } = useTerminal();

  return (
    <>
      {/* Fond + canvas rain */}
      <div id="bg-img" className="background-image" />
      <RainCanvas rainEnabled={rainEnabled} />

      {/* Widgets flottants */}
      <EyeButton rainEnabled={rainEnabled} onToggle={toggleRain} />
      <Terminal  text={text} visible={visible} onClose={closeTerminal} />
      <ScrollArrow />

      {/* Contenu principal */}
      <main>
        <HeroSection />
        <StackSection      onVisible={showTerminal} />
        <ProjectsSection   onVisible={showTerminal} />
        <InterestsSection  onVisible={showTerminal} />
        <ContactSection    onVisible={showTerminal} />
      </main>
    </>
  );
}
