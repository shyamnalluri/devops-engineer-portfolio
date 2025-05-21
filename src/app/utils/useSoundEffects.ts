'use client';

import useSound from 'use-sound';

export const useSoundEffects = () => {
  const [playHover] = useSound('/sounds/hover.mp3', { volume: 0.5 });
  const [playClick] = useSound('/sounds/click.mp3', { volume: 0.5 });
  const [playScroll] = useSound('/sounds/scroll.mp3', { volume: 0.3 });

  return {
    playHover,
    playClick,
    playScroll,
  };
};

export default useSoundEffects;