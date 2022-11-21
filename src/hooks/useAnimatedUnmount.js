import { useEffect, useRef, useState } from 'react';

export function useAnimatedUnmount(visible) {
  const [shouldRender, setShouldRender] = useState(visible);

  const animatedElementRef = useRef(null);

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
    }

    function handleAnimationEnd() {
      setShouldRender(false);
    }
    const elementRefElement = animatedElementRef.current;
    if (!visible && elementRefElement) {
      elementRefElement.addEventListener('animationend', handleAnimationEnd);
    }

    return () => {
      if (elementRefElement) {
        elementRefElement.removeEventListener('animationend', handleAnimationEnd);
      }
    };
  }, [visible]);

  return {
    shouldRender,
    animatedElementRef,
  };
}
