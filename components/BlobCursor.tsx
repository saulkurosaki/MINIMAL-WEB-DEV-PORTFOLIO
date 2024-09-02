// @ts-nocheck
import { useTrail, animated } from "@react-spring/web";
import { useRef, useEffect, useCallback, useState } from "react";

import "@/data/BlobCursor.css";

const fast = { tension: 1200, friction: 40 };
const slow = { mass: 10, tension: 200, friction: 50 };
const trans = (x, y) => `translate3d(${x}px,${y}px,0) translate3d(-50%,-50%,0)`;

export default function BlobCursor({
  blobType = "square",
  fillColor = "#6600ff",
}) {
  const [trail, api] = useTrail(3, (i) => ({
    xy: [0, 0],
    config: i === 0 ? fast : slow,
  }));

  const ref = useRef();
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  const updatePosition = useCallback(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      return { left: rect.left, top: rect.top };
    }
    return { left: 0, top: 0 };
  }, []);

  const handleMove = (e) => {
    if (!isLargeScreen) return; // No hacer nada si no es pantalla grande
    const { left, top } = updatePosition();
    const x = e.clientX || (e.touches && e.touches[0].clientX);
    const y = e.clientY || (e.touches && e.touches[0].clientY);
    api.start({ xy: [x - left, y - top] });
  };

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 768); // Cambia 768 por el tamaño que consideres "mediano"
      updatePosition();
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Llama a la función al cargar
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [updatePosition]);

  if (!isLargeScreen) return null; // No renderizar si no es pantalla grande

  return (
    <div className="container">
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <filter id="blob">
          <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="30" />
          <feColorMatrix
            in="blur"
            values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 35 -10"
          />
        </filter>
      </svg>
      <div
        ref={ref}
        className="main"
        onMouseMove={handleMove}
        onTouchMove={handleMove}
      >
        {trail.map((props, index) => (
          <animated.div
            key={index}
            style={{
              transform: props.xy.to(trans),
              borderRadius: blobType === "circle" ? "50%" : "0%",
              backgroundColor: fillColor,
            }}
          />
        ))}
      </div>
    </div>
  );
}
