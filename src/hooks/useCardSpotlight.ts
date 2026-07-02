import { useCallback, useRef } from 'react';

export function useCardSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--sl-x', `${e.clientX - r.left}px`);
    el.style.setProperty('--sl-y', `${e.clientY - r.top}px`);
    el.classList.add('spotlight-active');
  }, []);

  const onMouseLeave = useCallback(() => {
    ref.current?.classList.remove('spotlight-active');
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}
