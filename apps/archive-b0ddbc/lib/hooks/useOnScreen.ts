import { useEffect, useState } from "react";

function useOnScreen(ref: React.RefObject<HTMLDivElement>) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    });
    ref.current && observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref]);

  return isIntersecting;
}

export default useOnScreen;
