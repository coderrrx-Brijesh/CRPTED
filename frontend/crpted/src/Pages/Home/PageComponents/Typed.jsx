import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';

export const TypedComponent = () => {
  const typedRef = useRef(null); // ref for the element to apply Typed.js

  useEffect(() => {
    const typeData = new Typed(typedRef.current, {
      strings: [
        "Easiest",
        "Safest",
        "Fastest",
      ],
      loop: true,
      typeSpeed: 100,
      backSpeed: 80,
      backDelay: 1000,
      cursorChar: "", // Remove cursor by setting it to an empty string
    });

    // Cleanup Typed instance on component unmount
    return () => {
      typeData.destroy();
    };
  }, []);

  return (
    <span className="features text-3xl font-bold" ref={typedRef}></span>
  );
};
