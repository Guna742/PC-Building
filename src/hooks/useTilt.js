import { useRef, useCallback } from 'react';

export default function useTilt(maxTilt = 12) {
  const ref = useRef(null);

  const handleMouseMove = useCallback(
    (e) => {
      const card = ref.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(8px)`;
    },
    [maxTilt]
  );

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform =
      'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0)';
  }, []);

  return { ref, handleMouseMove, handleMouseLeave };
}
