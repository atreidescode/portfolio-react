import RainCanvas      from './components/canvas/RainCanvas';
import HeroSection     from './components/sections/HeroSection';
import StackSection    from './components/sections/StackSection';
import ProjectsSection from './components/sections/ProjectsSection';
import InterestsSection from './components/sections/InterestsSection';
import ContactSection  from './components/sections/ContactSection';
import Terminal        from './components/widgets/Terminal';
import EyeButton       from './components/widgets/EyeButton';
import ScrollArrow     from './components/widgets/ScrollArrow';
import Dither          from './components/backgrounds/Dither';
import { useRain }     from './hooks/useRain';
import { useTerminal } from './hooks/useTerminal';

export default function App() {
  const { rainEnabled, toggleRain }                    = useRain();
  const { text, visible, showTerminal, closeTerminal } = useTerminal();

  return (
    <>
      {/* Background Dither (fixed, plein écran, derrière tout) */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
      }}>
        <Dither
          waveColor={[0.5, 0.5, 0.5]}
          disableAnimation={false}
          enableMouseInteraction={false}
          mouseRadius={0.1}
          colorNum={32}
          waveAmplitude={0.21}
          waveFrequency={6.7}
          waveSpeed={0.01}
        />
      </div>

      {/* Canvas pluie de bits */}
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
